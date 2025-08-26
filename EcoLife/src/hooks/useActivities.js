import { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./useAuth";

export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch user activities
  const fetchActivities = useCallback(async () => {
    if (!user) {
      setActivities([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const activitiesRef = collection(db, "activities");
      const q = query(
        activitiesRef,
        where("userId", "==", user.uid),
        orderBy("date", "desc")
      );

      const querySnapshot = await getDocs(q);
      const activitiesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(), // Convert Firestore Timestamp to JS Date
      }));

      setActivities(activitiesList);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching activities:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Add a new activity
  const addActivity = async (activityData) => {
    if (!user) return;

    try {
      setError(null);
      const activitiesRef = collection(db, "activities");

      // Prepare data with Firestore timestamp
      const data = {
        ...activityData,
        userId: user.uid,
        date: Timestamp.fromDate(new Date(activityData.date)),
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(activitiesRef, data);

      // Update local state
      setActivities((prev) => [
        {
          id: docRef.id,
          ...data,
          date: new Date(activityData.date), // Convert back to JS Date for local state
        },
        ...prev,
      ]);

      return docRef.id;
    } catch (err) {
      setError(err.message);
      console.error("Error adding activity:", err);
      throw err;
    }
  };

  // Update an activity
  const updateActivity = async (id, activityData) => {
    if (!user) return;

    try {
      setError(null);
      const activityRef = doc(db, "activities", id);

      // Prepare data with Firestore timestamp
      const data = {
        ...activityData,
        date: Timestamp.fromDate(new Date(activityData.date)),
        updatedAt: Timestamp.now(),
      };

      await updateDoc(activityRef, data);

      // Update local state
      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === id
            ? {
                ...activity,
                ...data,
                date: new Date(activityData.date), // Convert back to JS Date for local state
              }
            : activity
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Error updating activity:", err);
      throw err;
    }
  };

  // Delete an activity
  const deleteActivity = async (id) => {
    if (!user) return;

    try {
      setError(null);
      const activityRef = doc(db, "activities", id);
      await deleteDoc(activityRef);

      // Update local state
      setActivities((prev) => prev.filter((activity) => activity.id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Error deleting activity:", err);
      throw err;
    }
  };

  // Fetch activities when user changes
  useEffect(() => {
    fetchActivities();
  }, [user, fetchActivities]);

  return {
    activities,
    loading,
    error,
    fetchActivities,
    addActivity,
    updateActivity,
    deleteActivity,
  };
};
