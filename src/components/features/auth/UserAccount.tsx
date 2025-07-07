'use client';

import { User } from 'next-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

type Props = {
  user: Pick<User, 'name' | 'image' | 'email'>;
};

const UserAccount = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {user.image ? (
            <div className="relative w-full h-full rounded-full">
              <Image
                src={user?.image!}
                alt={user?.name!}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <AvatarFallback>
              {user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>{user?.name}</DropdownMenuItem>
          <DropdownMenuItem>{user?.email}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-500 group"
          onClick={() => signOut()}
        >
          <span>Sign out</span>
          <LogOut className="text-red-500 size-4 self-end-safe group-hover:text-muted-foreground" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccount;
