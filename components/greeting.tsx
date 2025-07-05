"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type GreetingProps = {
  onStartProject: () => void;
};

export default function Greeting({ onStartProject }: GreetingProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border shadow-sm">
        <CardContent className="flex flex-col items-center justify-center gap-6 py-10 px-6">
          <h2 className="text-2xl font-semibold text-foreground text-center">
            안녕하세요!<br />
            <span className="text-primary font-bold">AI 팀 빌딩 매니저</span>
            입니다.
            <br />
            새로운 프로젝트를 시작해볼까요?
          </h2>
          <Button
            onClick={onStartProject}
            className="w-full mt-4"
            size="lg"
          >
            새 프로젝트 시작
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}