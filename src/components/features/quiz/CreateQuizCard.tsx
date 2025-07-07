'use client';
import React from 'react';
import SimpleCard from '@/components/ui/simple-card';
import CreateQuizForm from './CreateQuizForm';

type Props = {};

const CreateQuizCard = (props: Props) => {
  return (
    <div className="absolute inset-0 flex-center">
      <SimpleCard
        title="Quiz Creation"
        description="Choose a topic"
        content={<CreateQuizForm />}
        className="w-full max-w-sm hover:cursor-default hover:opacity-100"
      />
    </div>
  );
};

export default CreateQuizCard;
