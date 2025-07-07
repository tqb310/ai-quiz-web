import CreateQuizCard from '@/components/features/quiz/CreateQuizCard';
import React from 'react';

type Props = {};

const QuizPage = (props: Props) => {
  return (
    <div className="h-full w-full">
      <CreateQuizCard />
    </div>
  );
};

export default QuizPage;
