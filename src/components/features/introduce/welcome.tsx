import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SignInButton from '../auth/SignInButton';

function Welcome() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcome to AIQuiz</CardTitle>
        <CardDescription>
          AIQuiz is a quiz app that allows you to create and
          share quizzles with your friends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInButton>Sign In with Google</SignInButton>
      </CardContent>
    </Card>
  );
}

export default Welcome;
