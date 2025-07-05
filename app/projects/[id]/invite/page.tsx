"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InvitePage() {
  // 추후 실제 프로젝트명 props/server-side fetch로 대체
  const projectName = "[프로젝트 이름]";

  // 실제 초대 링크 로직으로 대체 필요
  const inviteLink = typeof window !== "undefined"
    ? `${window.location.origin}/join/project-id`
    : "https://your-domain.com/join/project-id";

  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
      alert("클립보드 복사에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background px-4 py-12">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-8 text-foreground">팀원 초대</h1>
        <Card className="w-full border shadow-sm">
          <CardContent className="py-8 px-6 flex flex-col gap-6">
            <div className="text-lg font-medium text-foreground">
              프로젝트: <span className="text-primary font-semibold">{projectName}</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted-foreground mb-1" htmlFor="invite-link">
                아래 링크를 팀원에게 공유하세요.
              </label>
              <div className="flex gap-2">
                <Input
                  id="invite-link"
                  value={inviteLink}
                  readOnly
                  className="flex-1"
                  onFocus={(e) => e.target.select()}
                />
                <Button
                  type="button"
                  onClick={handleCopy}
                  className="whitespace-nowrap"
                  variant={copied ? "secondary" : "default"}
                >
                  {copied ? "복사됨!" : "링크 복사"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
