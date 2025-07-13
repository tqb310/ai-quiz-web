import MCQ from '@/components/features/quiz/MCQ';
import { prisma } from '@/lib/PrismaClient';
import React from 'react';
import { redirect } from 'next/navigation';
type Props = {
  params: Promise<{ gameId: string }>;
};

async function MCQPage({ params }: Props) {
  const { gameId } = await params;
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
          answer: true,
        },
      },
    },
  });

  if (!game || game.gameType !== 'MCQ') {
    return redirect('/quiz');
  }

  return <MCQ game={game} />;
}

export default MCQPage;
