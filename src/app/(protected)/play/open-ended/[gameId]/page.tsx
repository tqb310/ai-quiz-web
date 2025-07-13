import React from 'react';
import { PrismaClient } from '@prisma/client';

type Props = {
  params: {
    gameId: string;
  };
};

function OpenEndedPage({ params: { gameId } }: Props) {
  return <div>page {gameId}</div>;
}

export default OpenEndedPage;
