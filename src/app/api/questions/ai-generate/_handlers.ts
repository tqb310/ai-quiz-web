import { NextRequest, NextResponse } from 'next/server';
import { strict_output } from '@/lib/gpt';
import { quizCreationSchema } from '@/schemas/form/quiz';

export async function PostHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, amount, type } =
      quizCreationSchema.parse(body);
    let questions: any;
    if (type === 'open_ended') {
      questions = await strict_output(
        'You are a helpful AI that is able to generate a pair of questions and answers, the length of the answer should not exceed 15 words, store all the pairs of questions and answers in a JSON array',
        Array.from(
          { length: amount },
          () =>
            `You are to generate a random hard open-ended question about ${topic}`
        ),
        {
          question: 'question',
          answer: 'answer with max length of 15 words',
        }
      );
    } else if (type === 'mcq') {
      questions = await strict_output(
        'You are a helpful AI that is able to generate mcq questions and answers, the length of the answer should not exceed 15 words, store all the pairs of questions and answers in a JSON array',
        Array.from(
          { length: amount },
          () =>
            `You are to generate a random hard mcq question about ${topic}`
        ),
        {
          question: 'question',
          answer: 'answer with max length of 15 words',
          option1: '1st option with max length of 15 words',
          option2: '2nd option with max length of 15 words',
          option3: '3rd option with max length of 15 words',
        }
      );
    }

    return NextResponse.json(
      {
        questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw error;
  }
}
