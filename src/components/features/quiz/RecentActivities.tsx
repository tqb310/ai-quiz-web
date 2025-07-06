'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import SimpleCard from '@/components/ui/simple-card';
type Props = {};

const RecentActivities = (props: Props) => {
  const router = useRouter();
  return (
    <SimpleCard
      title="Recent Activities"
      description="You have played a total of 7 games"
      content="Recent quiz attempts"
      onClick={() => router.push('/recent-activities')}
      className="lg:col-span-3"
    />
  );
};

export default RecentActivities;
