import { getAuthSession } from '@/lib/next-auth';
import { prisma } from '@/lib/PrismaClient';
import { quizCreationSchema } from '@/schemas/form/quiz';
import { GameType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {
  InternalServerError,
  UnauthorizedError,
} from '@/services/models';
import { cookies } from 'next/headers';

export async function PostHandler(req: NextRequest) {
  try {
    const session = await getAuthSession();
    const body = await req.json();
    const { amount, topic, type } =
      quizCreationSchema.parse(body);
    const game = await prisma.game.create({
      data: {
        gameType:
          type === 'mcq'
            ? GameType.MCQ
            : GameType.OPEN_ENDED,
        topic,
        userId: session?.user.id!,
        timeStarted: new Date(),
      },
    });
    const c = await cookies();
    const allCookies = c
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');
    const generatedAIResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/questions/ai-generate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: allCookies,
        },
        body: JSON.stringify({
          amount,
          topic,
          type,
        }),
      }
    );
    if (generatedAIResponse.status === 401) {
      throw new UnauthorizedError('Unauthorized');
    } else if (generatedAIResponse.status === 500) {
      throw new InternalServerError(
        'Internal Server Error'
      );
    }
    const { questions } = await generatedAIResponse.json();
    const questionsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/questions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: allCookies,
        },
        body: JSON.stringify({
          questions,
          type,
          gameId: game.id,
        }),
      }
    );
    if (questionsResponse.status === 401) {
      throw new UnauthorizedError('Unauthorized');
    } else if (questionsResponse.status === 500) {
      throw new InternalServerError(
        'Internal Server Error'
      );
    }
    return NextResponse.json(
      {
        gameId: game.id,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw error;
  }
}
