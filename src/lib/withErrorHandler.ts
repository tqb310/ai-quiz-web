import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

type Handler = (
  req: NextRequest
) => Promise<NextResponse | undefined>;

export function withErrorHandler(
  handler: Handler
): Handler {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: error.issues },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  };
}
