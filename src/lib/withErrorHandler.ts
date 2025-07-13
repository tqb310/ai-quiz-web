import {
  NotFoundError,
  UnauthorizedError,
} from '@/services/models';
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
      console.log('error', error);
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: error.issues },
          { status: 400 }
        );
      }
      if (error instanceof NotFoundError) {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        );
      }
      if (error instanceof UnauthorizedError) {
        return NextResponse.json(
          { error: error.message },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  };
}
