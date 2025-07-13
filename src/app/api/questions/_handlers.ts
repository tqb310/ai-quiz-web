import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/PrismaClient';
import { GameType } from '@prisma/client';

type MCQQuestion = {
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
};

type OpenEndedQuestion = {
  question: string;
  answer: string;
};

export async function PostHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { questions, type, gameId } = body;
    if (body.type === 'mcq') {
      let arrayQuestions: MCQQuestion[] = [];
      if (Array.isArray(questions)) {
        arrayQuestions = questions;
      } else {
        arrayQuestions = [questions];
      }
      const mappedQuestions = arrayQuestions.map(
        (question: MCQQuestion) => {
          const options = [
            question.option1,
            question.option2,
            question.option3,
            question.option4,
          ];
          return {
            question: question.question,
            answer: question.answer,
            options: JSON.stringify(options),
            questionType:
              type === 'mcq'
                ? GameType.MCQ
                : GameType.OPEN_ENDED,
            gameId: gameId,
          };
        }
      );
      await prisma.question.createMany({
        data: mappedQuestions,
      });
    } else if (body.type === 'open_ended') {
      let arrayQuestions: OpenEndedQuestion[] = [];
      if (Array.isArray(questions)) {
        arrayQuestions = questions;
      } else {
        arrayQuestions = [questions];
      }
      const mappedQuestions = arrayQuestions.map(
        (question: OpenEndedQuestion) => {
          return {
            question: question.question,
            answer: question.answer,
            questionType:
              type === 'mcq'
                ? GameType.MCQ
                : GameType.OPEN_ENDED,
            gameId: gameId,
          };
        }
      );
      await prisma.question.createMany({
        data: mappedQuestions,
      });
    }
    return NextResponse.json(
      {
        message: 'Questions created successfully',
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw error;
  }
}
