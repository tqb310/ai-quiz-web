'use client';
import React, { useState, useMemo } from 'react';
import { Game, Question } from '@prisma/client';
import { ChevronRight, Loader2, Timer } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MCQCounter from './MCQCounter';
import { useMutation } from '@tanstack/react-query';
import { questionAPI } from '@/services/question.api';
import { toast } from 'sonner';
type Props = {
  game: {
    questions: Pick<
      Question,
      'question' | 'options' | 'id'
    >[];
  } & Game;
};

function MCQ({ game }: Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<
    string | null
  >(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const currentOptions = useMemo(() => {
    if (!currentQuestion || !currentQuestion.options)
      return [];
    if (typeof currentQuestion.options === 'string') {
      return JSON.parse(
        currentQuestion.options
      ) as string[];
    }
    return [];
  }, [currentQuestion]);

  const { mutate: checkAnswer, isPending } = useMutation({
    mutationFn: questionAPI.checkAnswer,
    onSuccess: (data) => {
      if (data.isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
        toast.success('Correct answer!', {
          
          className:
            'flex flex-row items-center gap-2 px-4 py-2 rounded-md shadow-lg bg-green-500 text-white',
          description: 'You are a genius!',
          position: 'top-center',
          duration: 60000,
          unstyled: true,
          classNames: {
            title: 'font-bold',
          },
        });
      } else {
        setWrongAnswers(wrongAnswers + 1);
        toast.error('Wrong answer!', {
          className:
            'flex flex-row items-center gap-2 px-4 py-2 rounded-md shadow-lg bg-red-500 text-white',
          description: 'Do not give up! You can do it!',
          position: 'top-center',
          duration: 30000,
          unstyled: true,
          classNames: {
            title: 'font-bold',
          },
        });
      }
      if (game.questions.length > questionIndex + 1) {
        setQuestionIndex(questionIndex + 1);
        setSelectedChoice(null);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw]">
      <div className="flex flex-row justify-between items-center">
        <p>
          <span className="text-slate-400">Topic</span>
          <span className="bg-slate-800 text-white px-2 py-1 rounded-lg ml-1">
            {game.topic}
          </span>
        </p>
        <div className="flex items-center gap-2 text-slate-400">
          <Timer />
          <span>00:00</span>
        </div>
        <MCQCounter
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
        />
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div className="text-base">
              {questionIndex + 1}
            </div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="grow text-lg">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4 gap-4">
        {currentOptions.map((option, index) => (
          <Button
            key={index}
            className="w-full cursor-pointer py-8"
            onClick={() => setSelectedChoice(option)}
            variant={
              selectedChoice === option
                ? 'default'
                : 'secondary'
            }
          >
            <div className="flex items-center justify-start w-full">
              <div className="p-2 px-3 mr-5 border rounded-md">
                {index + 1}
              </div>
              <div className="text-start">{option}</div>
            </div>
          </Button>
        ))}
        <Button
          className="mt-4"
          disabled={isPending}
          onClick={() => {
            checkAnswer({
              questionId: currentQuestion?.id || '',
              userAnswer: selectedChoice || '',
            });
          }}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              {game.questions.length === questionIndex + 1
                ? 'Finish'
                : 'Next'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default MCQ;
