export type CreateGameParams = {
  topic: string;
  amount: number;
  type: string;
};

export const gameAPI = {
  createGame: async (
    params: CreateGameParams
  ): Promise<{ gameId: string }> => {
    try {
      const game = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/game`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        }
      );
      return await game.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
