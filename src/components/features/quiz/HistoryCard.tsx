'use client';
import React from 'react';
import { History } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SimpleCard from '@/components/ui/simple-card';
type Props = {};

const HistoryCard = (props: Props) => {
  const router = useRouter();
  return (
    <SimpleCard
      title="History"
      icon={<History size={24} strokeWidth={2.5} />}
      content="View past quiz attempts"
      onClick={() => router.push('/history')}
    />
  );
};

export default HistoryCard;
