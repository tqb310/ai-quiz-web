import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/PrismaClient';
import { checkAnswerSchema } from '@/schemas/form/quiz';
import { NotFoundError } from '@/services/models';

export async function PostHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { questionId, userAnswer } =
      checkAnswerSchema.parse(body);
    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });
    if (!question) {
      throw new NotFoundError(
        `Question with id ${questionId} not found`
      );
    }
    const isCorrect =
      question.answer
        .toLowerCase()
        .normalize('NFD')
        .trim() ===
      userAnswer.toLowerCase().normalize('NFD').trim();
    prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        userAnswer,
        isCorrect,
      },
    });
    return NextResponse.json(
      { isCorrect },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw error;
  }
}
