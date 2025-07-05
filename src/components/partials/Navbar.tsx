import { getAuthSession } from '@/lib/next-auth';
import Link from 'next/link';
import SignInButton from '../pages/auth/SignInButton';
import UserAccount from '../pages/auth/UserAccount';

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto">
        <Link href="/">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            AIQuiz
          </p>
        </Link>
        {session?.user ? (
          <div className="flex items-center gap-2">
            <p className="text-sm text-zinc-500">
              {session.user.name}
            </p>
            <UserAccount user={session.user} />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
};

export default Navbar;
