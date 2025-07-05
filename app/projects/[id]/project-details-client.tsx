'use client';

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/db/schema";

export function ProjectDetailsClient({ project }: { project: Project }) {
  const [inviteLink, setInviteLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
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
  );
}
