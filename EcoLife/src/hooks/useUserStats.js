import { useState, useEffect } from 'react';
import { useActivities } from './useActivities';

export const useUserStats = () => {
  const { activities, loading: activitiesLoading } = useActivities();
  const [stats, setStats] = useState({
    totalScore: 0,
    carbonFootprint: 0,
    badgeCount: 0,
    dailyAverage: 0,
    weeklyTrend: [],
    categoryBreakdown: {}
  });
  const [loading, setLoading] = useState(true);

  // Calculate carbon footprint based on activity type
  const calculateCarbonFootprint = (activity) => {
    const { type, value } = activity;
    
    // These are simplified calculations for demonstration
    switch (type) {
      case 'transportation':
        // Different modes have different carbon impacts
        if (value === 'car') return 10;
        if (value === 'public_transport') return 5;
        if (value === 'bicycle' || value === 'walking') return 0;
        return 7; // default
      
      case 'energy':
        // Energy usage in kWh
        return value * 0.5;
      
      case 'diet':
        if (value === 'meat_heavy') return 15;
        if (value === 'vegetarian') return 7;
        if (value === 'vegan') return 4;
        return 10; // default
      
      case 'waste':
        return value * 0.8;
      
      default:
        return 0;
    }
  };

  // Calculate eco score based on activity type
  const calculateEcoScore = (activity) => {
    const { type, value } = activity;
    
    // These are simplified calculations for demonstration
    switch (type) {
      case 'transportation':
        if (value === 'car') return 5;
        if (value === 'public_transport') return 15;
        if (value === 'bicycle' || value === 'walking') return 30;
        return 10; // default
      
      case 'energy':
        // Lower energy usage gets higher score
        return Math.max(0, 30 - value * 0.5);
      
      case 'diet':
        if (value === 'meat_heavy') return 5;
        if (value === 'vegetarian') return 20;
        if (value === 'vegan') return 30;
        return 10; // default
      
      case 'waste':
        // Lower waste gets higher score
        return Math.max(0, 30 - value * 0.8);
      
      default:
        return 0;
    }
  };

  // Calculate badges based on activities and scores
  const calculateBadges = (activities, totalScore) => {
    const badges = [];
    
    // Activity count badges
    if (activities.length >= 5) badges.push('starter');
    if (activities.length >= 20) badges.push('consistent');
    if (activities.length >= 50) badges.push('dedicated');
    
    // Score badges
    if (totalScore >= 100) badges.push('eco_novice');
    if (totalScore >= 500) badges.push('eco_enthusiast');
    if (totalScore >= 1000) badges.push('eco_warrior');
    
    // Special badges for specific activities
    const hasWalking = activities.some(a => a.type === 'transportation' && a.value === 'walking');
    const hasCycling = activities.some(a => a.type === 'transportation' && a.value === 'bicycle');
    const hasVegan = activities.some(a => a.type === 'diet' && a.value === 'vegan');
    
    if (hasWalking) badges.push('walker');
    if (hasCycling) badges.push('cyclist');
    if (hasVegan) badges.push('plant_powered');
    
    return badges;
  };

  // Calculate weekly trend
  const calculateWeeklyTrend = (activities) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Filter activities from the last week
    const weekActivities = activities.filter(activity => 
      activity.date >= oneWeekAgo && activity.date <= now
    );
    
    // Group by day and calculate daily scores
    const dailyScores = {};
    
    weekActivities.forEach(activity => {
      const day = activity.date.toISOString().split('T')[0];
      if (!dailyScores[day]) dailyScores[day] = 0;
      dailyScores[day] += calculateEcoScore(activity);
    });
    
    // Fill in missing days
    const trend = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const day = date.toISOString().split('T')[0];
      trend.push({
        day: day,
        score: dailyScores[day] || 0
      });
    }
    
    return trend;
  };

  // Calculate category breakdown
  const calculateCategoryBreakdown = (activities) => {
    const categories = {
      transportation: 0,
      energy: 0,
      diet: 0,
      waste: 0
    };
    
    activities.forEach(activity => {
      if (categories[activity.type] !== undefined) {
        categories[activity.type] += calculateEcoScore(activity);
      }
    });
    
    return categories;
  };

  // Update stats when activities change
  useEffect(() => {
    if (activitiesLoading) {
      setLoading(true);
      return;
    }
    
    // Calculate total score
    let totalScore = 0;
    let totalCarbon = 0;
    
    activities.forEach(activity => {
      totalScore += calculateEcoScore(activity);
      totalCarbon += calculateCarbonFootprint(activity);
    });
    
    // Calculate badges
    const badges = calculateBadges(activities, totalScore);
    
    // Calculate weekly trend
    const weeklyTrend = calculateWeeklyTrend(activities);
    
    // Calculate category breakdown
    const categoryBreakdown = calculateCategoryBreakdown(activities);
    
    // Calculate daily average (if there are activities)
    const dailyAverage = activities.length > 0 
      ? totalScore / Math.max(1, Math.ceil((Date.now() - new Date(activities[activities.length - 1].date).getTime()) / (24 * 60 * 60 * 1000)))
      : 0;
    
    setStats({
      totalScore,
      carbonFootprint: totalCarbon,
      badgeCount: badges.length,
      badges,
      dailyAverage,
      weeklyTrend,
      categoryBreakdown
    });
    
    setLoading(false);
  }, [activities, activitiesLoading]);

  return { stats, loading };
};