import { getAuthSession } from '@/lib/next-auth';
import { prisma } from '@/lib/PrismaClient';
import { quizCreationSchema } from '@/schemas/form/quiz';
import { GameType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PostHandler(req: NextRequest) {
  try {
    const session = await getAuthSession();
    const body = await req.json();
    const { amount, topic, type } =
      quizCreationSchema.parse(body);
    const game = await prisma.game.create({
      data: {
        gameType: type as GameType,
        topic,
        userId: session?.user.id!,
        timeStarted: new Date(),
      },
    });
    const generatedAIResponse = await fetch(
      `${process.env.API_URL}/questions/ai-generate`,
      {
        method: 'POST',
        body: JSON.stringify({
          amount,
          topic,
          type,
        }),
      }
    );
    const { questions } = await generatedAIResponse.json();
    await fetch(`${process.env.API_URL}/questions`, {
      method: 'POST',
      body: JSON.stringify({
        questions,
        type,
        gameId: game.id,
      }),
    });

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
