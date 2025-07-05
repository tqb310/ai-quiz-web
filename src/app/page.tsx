import Welcome from '@/components/features/introduce/welcome';
import { getAuthSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect('/dashboard');
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Welcome />
    </div>
  );
}
