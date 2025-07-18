import QuizMeCard from '@/components/features/quiz/QuizMeCard';
import React from 'react';
import { CircleQuestionMark } from 'lucide-react';
import HistoryCard from '@/components/features/quiz/HistoryCard';
import HotTopicsCard from '@/components/features/quiz/HotTopicsCard';
import RecentActivities from '@/components/features/quiz/RecentActivities';
type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="px-container py-6">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="bg-gray-950 px-4 py-2 rounded-md flex-center gap-2">
          <p className="text-sm text-white">What is this</p>
          <CircleQuestionMark className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mt-4">
        <HotTopicsCard />
        <RecentActivities />
      </div>
    </div>
  );
};

export default Dashboard;
