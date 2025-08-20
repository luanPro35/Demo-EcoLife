import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  getIdTokenResult,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get user role from custom claims
        const token = await getIdTokenResult(user, true);
        const role = token.claims.role || "user";

        // Get additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.exists() ? userDoc.data() : {};

          // Update user object with role and additional data
          setUser({
            ...user,
            role: role,
            ...userData,
          });
        } catch (err) {
          console.error("Error fetching user data:", err);
          // Still set user with just auth data and role
          setUser({
            ...user,
            role: role,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with display name
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      // Create user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        displayName: displayName || "",
        role: "user",
        createdAt: new Date(),
        lastLogin: new Date(),
      });

      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get user role from custom claims
      const token = await getIdTokenResult(userCredential.user, true);
      const role = token.claims.role || "user";

      // Update last login time
      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          lastLogin: new Date(),
        },
        { merge: true }
      );

      // Get additional user data from Firestore
      try {
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        // Update user object with role and additional data
        setUser({
          ...userCredential.user,
          role: role,
          ...userData,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        // Still set user with just auth data and role
        setUser({
          ...userCredential.user,
          role: role,
        });
      }

      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setError(null);

      if (!user) {
        throw new Error("No user is currently signed in");
      }

      // Reauthenticate user before changing password
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    resetPassword,
    changePassword,
  };
};
