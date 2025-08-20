import React from 'react';
import Leaderboard from '../components/leaderboard/Leaderboard';

const LeaderboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Bảng xếp hạng</h1>
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;