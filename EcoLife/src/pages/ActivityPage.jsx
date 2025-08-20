import React, { useEffect, useRef } from 'react';
import ActivityForm from '../components/activity/ActivityForm';

const ActivityPage = () => {
  const titleRef = useRef(null);
  
  useEffect(() => {
    // Simple entrance animation for the title
    if (titleRef.current) {
      titleRef.current.classList.add('animate-float');
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
      <div className="text-center mb-16">
        <h1 
          ref={titleRef} 
          className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
        >
          Theo Dõi Hoạt Động
        </h1>
        <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Ghi lại các hoạt động hàng ngày của bạn để theo dõi dấu chân carbon và tác động môi trường của bạn
        </p>
      </div>
      <div className="animated-bg rounded-3xl p-12 mb-12 shadow-2xl">
        <ActivityForm />
      </div>
    </div>
  );
};

export default ActivityPage;