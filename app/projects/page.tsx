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
import { getProjectsServerAction, createProjectServerAction } from "./actions";

// 클라이언트 컴포넌트
export default function ProjectsPage() {
  const { data: session, status } = useSession();
  const [chatId, setChatId] = useState<string | undefined>(undefined);
  const [projectList, setProjectList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 프로젝트 목록 불러오기
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjectsServerAction();
        setProjectList(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-12">
        <p>세션 로딩 중...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-12">
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex flex-col items-center min-h-screen bg-background px-4 py-12">
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
                  session={session} // Pass session to Chat component
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
    </SidebarProvider>
  );
}