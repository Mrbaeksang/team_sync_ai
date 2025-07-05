import { SurveyFormClient } from './survey-form-client';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 서버 컴포넌트
export default async function SurveyPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const { id: projectId } = resolvedParams;

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <SurveyFormClient projectId={projectId} />
    </div>
  );
}