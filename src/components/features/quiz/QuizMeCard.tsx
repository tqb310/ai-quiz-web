'use client';

import React from 'react';
import { BrainCircuit } from 'lucide-react';
import SimpleCard from '@/components/ui/simple-card';
import { useRouter } from 'next/navigation';
type Props = {};

const QuizMeCard = (props: Props) => {
  const router = useRouter();
  return (
    <SimpleCard
      title="Quiz Me!"
      icon={<BrainCircuit size={28} strokeWidth={2.5} />}
      description="Quiz Me! is a quiz game that allows you to test your knowledge on a topic."
      onClick={() => router.push('/quiz')}
    />
  );
};

export default QuizMeCard;
