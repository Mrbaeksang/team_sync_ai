'use server';

import { db, createGuestUser } from "@/lib/db/queries";
import { projects, type Project } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

// 프로젝트 목록 조회 Server Action
export async function getProjectsServerAction(): Promise<Project[]> {
  return await db.select().from(projects).orderBy(desc(projects.createdAt));
}

// 프로젝트 생성 Server Action
export async function createProjectServerAction(formData: FormData) {
  const guestUser = await createGuestUser();
  const userId = guestUser[0].id;

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const id = nanoid();
  await db.insert(projects).values({
    id,
    name,
    description,
    userId, // user_id 컬럼에 저장
  });

  revalidatePath('/projects');
  redirect(`/projects/${id}`);
}

// 프로젝트 ID로 조회 Server Action
export async function getProjectByIdServerAction(id: string): Promise<Project | undefined> {
  const [project] = await db.select().from(projects).where(eq(projects.id, id));
  return project;
}