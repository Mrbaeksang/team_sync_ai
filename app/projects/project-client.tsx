'use client';

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Chat } from "@/components/chat";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DataStreamProvider } from "@/components/data-stream-provider";
import { getProjectCreationPrompt } from "@/lib/ai/prompts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProjectServerAction } from "./actions";
import { Project } from "@/lib/db/schema"; // Project 타입 import

export function ProjectClient({ initialProjects }: { initialProjects: Project[] }) {
  const { data: session, status } = useSession();
  const [chatId, setChatId] = useState<string | undefined>(undefined);
  const [projectList, setProjectList] = useState<Project[]>(initialProjects);

  // 새 프로젝트 생성 후 목록을 업데이트하기 위한 로직 (개선 필요)
  // 현재는 action이 redirect하므로 이 코드는 실행되지 않을 수 있음
  const handleCreateProject = async (formData: FormData) => {
    await createProjectServerAction(formData);
    // 이상적으로는 여기서 projectList를 다시 fetch해야 함
  };

  if (status === "loading") {
    return <p>세션 로딩 중...</p>;
  }

  if (!session) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <SidebarProvider>
      <div className="w-full max-w-2xl space-y-8">
        {/* AI 챗봇 - 프로젝트 생성용 */}
        <Card className="w-full border shadow-sm">
          <CardContent className="py-8 px-6">
            <h2 className="text-xl font-bold mb-4 text-foreground">
              AI 챗봇으로 프로젝트 생성
            </h2>
            <DataStreamProvider>
              <Chat
                chatId={chatId}
                initialMessages={getProjectCreationPrompt()}
                onChatCreated={setChatId}
                session={session}
              />
            </DataStreamProvider>
          </CardContent>
        </Card>

        {/* 기존 프로젝트 생성 폼 */}
        <Card className="w-full border shadow-sm">
          <CardContent className="py-8 px-6">
            <h2 className="text-lg font-semibold mb-2 text-foreground">새 프로젝트 생성</h2>
            <form action={createProjectServerAction} className="space-y-4">
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
            {projectList.length === 0 ? (
              <p className="text-muted-foreground">프로젝트가 없습니다.</p>
            ) : (
              <ul className="space-y-2">
                {projectList.map((project) => (
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
    </SidebarProvider>
  );
}
