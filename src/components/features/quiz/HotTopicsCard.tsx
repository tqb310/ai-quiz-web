'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import SimpleCard from '@/components/ui/simple-card';
import CustomWordCloud from './CustomWordCloud';
type Props = {};

const HotTopicsCard = (props: Props) => {
  const router = useRouter();
  return (
    <SimpleCard
      title="Hot Topics"
      description="Click to start a quiz on it!"
      content={<CustomWordCloud />}
      onClick={() => router.push('/history')}
      className="lg:col-span-4"
    />
  );
};

export default HotTopicsCard;
