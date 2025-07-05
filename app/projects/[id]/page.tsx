import { getProjectByIdServerAction } from "@/app/projects/actions";
import { ProjectDetailsClient } from "./project-details-client";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const { id } = resolvedParams;
  const project = await getProjectByIdServerAction(id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen bg-background px-4 py-12">
        <p>프로젝트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background px-4 py-12">
      <ProjectDetailsClient project={project} />
    </div>
  );
}
