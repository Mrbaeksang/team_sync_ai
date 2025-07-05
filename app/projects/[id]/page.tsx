// app/projects/[id]/page.tsx

'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 예시 getProject 함수 (실제로는 서버 액션/DB 연동)
async function getProject(id: string) {
  // 여기에 실제 데이터 패칭 로직 구현 필요
  return {
    id,
    name: "예시 프로젝트",
    description: "이 프로젝트는 ai-chatbot 템플릿과 shadcn/ui 스타일을 따릅니다.",
  };
}

// 최상위 async 페이지 컴포넌트
export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  return <ProjectDetails project={project} />;
}

// 클라이언트 컴포넌트
function ProjectDetails({ project }: { project: { id: string; name: string; description: string } }) {
  const [inviteLink, setInviteLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 실행되도록 체크
    if (typeof window !== "undefined" && project?.id) {
      setInviteLink(`${window.location.origin}/projects/${project.id}/survey`);
    }
  }, [project?.id]);

  const handleCopy = async () => {
    if (inviteLink) {
      await navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* 프로젝트 정보 카드 */}
        <Card className="w-full border shadow-sm mb-8">
          <CardContent className="py-8 px-6">
            <h1 className="text-3xl font-bold mb-2 text-foreground">{project.name}</h1>
            <p className="text-muted-foreground">{project.description}</p>
          </CardContent>
        </Card>
        {/* 팀원 초대 카드 */}
        <Card className="w-full border shadow-sm">
          <CardContent className="py-8 px-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-foreground">팀원 초대</h2>
            <div className="w-full flex gap-2 items-center">
              <Input
                value={inviteLink}
                readOnly
                className="flex-1"
                aria-label="초대 링크"
              />
              <Button
                type="button"
                onClick={handleCopy}
                disabled={!inviteLink}
                variant={isCopied ? "secondary" : "default"}
                className="whitespace-nowrap"
              >
                {isCopied ? "복사됨!" : "복사"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              위 초대 링크를 팀원에게 공유하세요.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}