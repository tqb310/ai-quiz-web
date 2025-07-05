'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

type Props = {
  children?: React.ReactNode;
};

const SignInButton = ({ children = 'Sign In' }: Props) => {
  const handleSignIn = async () => {
    try {
      await signIn('google');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      size="sm"
      className="rounded-md"
      onClick={handleSignIn}
    >
      {children}
    </Button>
  );
};

export default SignInButton;
