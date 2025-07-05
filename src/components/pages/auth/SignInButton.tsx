'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

const SignInButton = () => {
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
      Sign In
    </Button>
  );
};

export default SignInButton;
