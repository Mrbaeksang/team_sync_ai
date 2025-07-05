import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

async function getProjects() {
  return await db.select().from(projects).orderBy(desc(projects.createdAt));
}

async function createProject(formData: FormData) {
  'use server';
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const id = nanoid();
  // 임시 userId: '1' (실제 인증 연동 시 수정 필요)
  await db.insert(projects).values({
    id,
    userId: '1',
    name,
    description,
  });
  revalidatePath('/projects');
  redirect(`/projects/${id}`);
}

export default async function ProjectsPage() {
  const projectList = await getProjects();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-foreground">프로젝트 목록</h1>
      <div className="space-y-4 mb-10">
        {projectList.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-muted-foreground">
              아직 생성된 프로젝트가 없습니다.
            </CardContent>
          </Card>
        ) : (
          projectList.map((project) => (
            <Card key={project.id} className="bg-background border shadow-sm rounded-md">
              <CardHeader className="pb-2 text-lg font-semibold">{project.name}</CardHeader>
              <CardContent className="pt-0 text-muted-foreground">
                {project.description || <span className="text-xs">설명이 없습니다.</span>}
              </CardContent>
              <CardFooter className="pt-2 text-xs text-gray-400">
                생성일: {project.createdAt?.toLocaleString?.() ?? ''}
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <form action={createProject} className="bg-background border rounded-md p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold mb-2 text-foreground">새 프로젝트 생성</h2>
        <div>
          <label htmlFor="name" className="block text-sm mb-1 text-foreground">프로젝트 이름</label>
          <Input name="name" id="name" required placeholder="프로젝트 이름" className="w-full" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm mb-1 text-foreground">설명</label>
          <Textarea name="description" id="description" placeholder="간단한 설명 (선택)" className="w-full min-h-[60px]" />
        </div>
        <Button type="submit" className="w-full px-4 py-2 rounded-md font-semibold">프로젝트 생성</Button>
      </form>
    </div>
  );
}