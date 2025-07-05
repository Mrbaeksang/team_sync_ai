import { getProjectByIdServerAction } from "@/app/projects/actions";
import { ProjectDetailsClient } from "./project-details-client";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
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
