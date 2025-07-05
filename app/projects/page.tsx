'use client';

import React, { useState, useEffect } from "react";
import { Chat } from "@/components/chat";
import { getProjectCreationPrompt } from "@/lib/ai/prompts";
import { db, createGuestUser } from "@/lib/db/queries";
import { projects } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// 프로젝트 목록 가져오기 (이 함수는 그대로 유지)
async function getProjects() {
  // 서버 액션에서는 직접 사용, 클라이언트에서는 fetch API로 호출 필요 (여기선 예시용)
  return await db.select().from(projects).orderBy(desc(projects.createdAt));
}

// 프로젝트 생성 서버 액션 (이 함수는 그대로 유지)
async function createProject(formData: FormData) {
  // 강제 게스트 유저 생성 로직 그대로 유지
  await createGuestUser();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const id = nanoid();
  await db.insert(projects).values({
    id,
    name,
    description,
  });

  revalidatePath("/projects");
  redirect(`/projects/${id}`);
}

// 클라이언트 컴포넌트
export default function ProjectsPage() {
  const [chatId, setChatId] = useState<string | undefined>(undefined);
  const [projectList, setProjectList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 프로젝트 목록 불러오기
  useEffect(() => {
    const fetchProjects = async () => {
      // 실제 환경에서는 API 라우트에서 프로젝트를 불러오는 것이 권장됩니다.
      // 여기서는 예시로 window.db나 서버 액션 호출 불가하므로 빈 배열 반환
      setProjectList([]);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">

        {/* AI 챗봇 - 프로젝트 생성용 */}
        <Card className="w-full border shadow-sm">
          <CardContent className="py-8 px-6">
            <h2 className="text-xl font-bold mb-4 text-foreground">
              AI 챗봇으로 프로젝트 생성
            </h2>
            <Chat
              chatId={chatId}
              initialMessages={getProjectCreationPrompt()}
              onChatCreated={setChatId}
            />
          </CardContent>
        </Card>

        {/* 기존 프로젝트 생성 폼 */}
        <Card className="w-full border shadow-sm">
          <CardContent className="py-8 px-6">
            <h2 className="text-lg font-semibold mb-2 text-foreground">새 프로젝트 생성</h2>
            <form action={createProject} className="space-y-4">
              <Input
                name="name"
                placeholder="프로젝트 이름"
                className="w-full"
                required
              />
              <Textarea
                name="description"
                placeholder="프로젝트 설명"
                className="w-full"
                rows={3}
                required
              />
              <Button type="submit" className="w-full">
                프로젝트 생성
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 프로젝트 목록 */}
        <Card className="w-full border shadow-sm">
          <CardContent className="py-8 px-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">프로젝트 목록</h2>
            {loading ? (
              <p className="text-muted-foreground">불러오는 중...</p>
            ) : projectList.length === 0 ? (
              <p className="text-muted-foreground">프로젝트가 없습니다.</p>
            ) : (
              <ul className="space-y-2">
                {projectList.map((project: any) => (
                  <li key={project.id} className="border-b last:border-b-0 pb-2">
                    <div className="font-semibold text-foreground">{project.name}</div>
                    <div className="text-sm text-muted-foreground">{project.description}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}