import React, { useState, useEffect } from 'react';

const ActivityForm = () => {
  const [formData, setFormData] = useState({
    transportation: '',
    energyUsage: '',
    dietHabits: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Reset success message after 3 seconds
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // TODO: Submit data to Firebase and calculate carbon footprint
      console.log('Activity data submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto glass-effect rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 py-12 px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
        <h2 className="text-4xl font-bold text-white mb-4 relative z-10">Track Your Daily Activities</h2>
        <p className="text-white text-opacity-90 text-md relative z-10">Record your eco-friendly habits and measure your impact</p>
      </div>
      <div className="p-10 bg-white bg-opacity-90">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <label htmlFor="transportation" className="block text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Transportation
            </label>
            <div className="relative">
              <select
                id="transportation"
                name="transportation"
                value={formData.transportation}
                onChange={handleChange}
                className="input-field pl-14 pr-12 py-4 appearance-none bg-white group transition-all duration-300 border-2 hover:border-primary-400 text-lg"
                required
              >
                <option value="">Select transportation method</option>
                <option value="walking">Walking</option>
                <option value="bicycle">Bicycle</option>
                <option value="public_transport">Public Transport</option>
                <option value="electric_vehicle">Electric Vehicle</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="airplane">Airplane</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="energyUsage" className="block text-lg font-semibold text-gray-700 mb-3">
              Energy Usage (kWh)
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <input
                type="number"
                id="energyUsage"
                name="energyUsage"
                value={formData.energyUsage}
                onChange={handleChange}
                placeholder="Enter your energy consumption"
                className="input-field pl-14 text-lg"
                min="0"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Enter the amount of electricity used in kilowatt-hours</p>
          </div>

          <div>
            <label htmlFor="dietHabits" className="block text-lg font-semibold text-gray-700 mb-3">
              Diet Habits
            </label>
            <div className="relative">
              <select
                id="dietHabits"
                name="dietHabits"
                value={formData.dietHabits}
                onChange={handleChange}
                className="input-field pl-6 pr-12 py-4 appearance-none bg-white text-lg"
                required
              >
                <option value="">Select diet type</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="flexitarian">Flexitarian</option>
                <option value="meat_eater">Regular Meat Eater</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">Your diet significantly impacts your carbon footprint</p>
          </div>

          <div>
            <label htmlFor="date" className="block text-lg font-semibold text-gray-700 mb-3">
              Date
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field pl-14 text-lg"
                required
              />
            </div>
          </div>

          <div className="pt-8">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`btn-primary w-full flex items-center justify-center group text-xl ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Submit Activity</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 ml-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
        
        {submitSuccess && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center animate-float text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p>Activity submitted successfully!</p>
          </div>
        )}
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your data helps us calculate your environmental impact</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityForm;