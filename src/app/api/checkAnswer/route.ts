import { withErrorHandler } from '@/lib/withErrorHandler';
import { PostHandler } from './_handlers';

export const POST = withErrorHandler(PostHandler);
