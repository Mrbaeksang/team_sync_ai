'use client';

import { useRouter } from 'next/navigation';
import { Greeting } from '@/components/greeting';

export default function ChatPage() {
  const router = useRouter();

  function handleStartProject() {
    router.push('/projects');
  }

  return (
    <Greeting onStartProject={handleStartProject} />
  );
}