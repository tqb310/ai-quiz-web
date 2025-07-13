export type CreateQuestionParams = {
  topic: string;
  amount: number;
  type: string;
};

export const questionAPI = {
  checkAnswer: async ({
    questionId,
    userAnswer,
  }: {
    questionId: string;
    userAnswer: string;
  }): Promise<{ isCorrect: boolean }> => {
    const response = await fetch('/api/checkAnswer', {
      method: 'POST',
      body: JSON.stringify({ questionId, userAnswer }),
    });
    return await response.json();
  },
};
