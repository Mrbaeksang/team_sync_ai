import { getProjectsServerAction } from "./actions";
import { ProjectClient } from "./project-client";

export default async function ProjectsPage() {
  const projects = await getProjectsServerAction();
  return (
    <div className="flex flex-col items-center min-h-screen bg-background px-4 py-12">
      <ProjectClient initialProjects={projects} />
    </div>
  );
}
