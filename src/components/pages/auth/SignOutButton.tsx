'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      size="sm"
      className="rounded-md"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
