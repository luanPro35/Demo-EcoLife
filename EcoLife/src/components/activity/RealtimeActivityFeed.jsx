import React, { useState, useEffect } from 'react';
import { useSocketContext } from '../../contexts/SocketContext';
import { useAuthContext } from '../../contexts/AuthContext';

const RealtimeActivityFeed = () => {
  const { user } = useAuthContext();
  const { isConnected, subscribe } = useSocketContext();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities/recent`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        
        const data = await response.json();
        setActivities(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Không thể tải hoạt động. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };
    
    fetchActivities();
  }, []);

  // Subscribe to new activities
  useEffect(() => {
    if (isConnected) {
      const unsubscribe = subscribe('new_activity', (newActivity) => {
        setActivities(prev => [newActivity, ...prev].slice(0, 20)); // Keep only the 20 most recent activities
      });
      
      return () => {
        unsubscribe();
      };
    }
  }, [isConnected, subscribe]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - activityTime) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Vừa xong';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'eco_action':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'badge_earned':
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'level_up':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
      
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Chưa có hoạt động nào.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              {getActivityIcon(activity.type)}
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">{activity.userName}</p>
                  <span className="text-sm text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                </div>
                <p className="text-gray-600">{activity.description}</p>
                
                {activity.points && (
                  <p className="text-sm text-green-600 mt-1">+{activity.points} điểm</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RealtimeActivityFeed;