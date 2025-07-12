import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/PrismaClient';
import { GameType } from '@prisma/client';

type MCQQuestion = {
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
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
      const mappedQuestions = questions.map(
        (question: MCQQuestion) => {
          const options = [
            question.option1,
            question.option2,
            question.option3,
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
      const mappedQuestions = questions.map(
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
