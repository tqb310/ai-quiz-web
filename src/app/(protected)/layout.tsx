import { getAuthSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  return <div>{children}</div>;
}
