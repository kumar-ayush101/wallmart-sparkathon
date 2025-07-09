import dynamic from 'next/dynamic';
const SpinWheel = dynamic(() => import('@/components/SpinWheel'), { ssr: false });

export default function SpinPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">🎡 Daily Spin & Win</h1>
      <SpinWheel />
    </main>
  );
}
