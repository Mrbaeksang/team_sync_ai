"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProjectsPage() {
  const [showForm, setShowForm] = React.useState(false);
  const [projectName, setProjectName] = React.useState("");
  // 실제 프로젝트 목록은 추후 server action에서 관리 예정
  const [projects] = React.useState<string[]>([]);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    // 추후 server action으로 대체
    console.log("프로젝트 생성:", projectName);
    setProjectName("");
    setShowForm(false);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background px-4 py-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-foreground">내 프로젝트</h1>
        <Card className="w-full border shadow-sm mb-8">
          <CardContent className="py-8 px-6 flex flex-col items-center">
            {projects.length === 0 ? (
              <p className="text-muted-foreground text-center mb-4">
                아직 생성된 프로젝트가 없습니다.
              </p>
            ) : (
              <ul className="w-full mb-4">
                {projects.map((proj) => (
                  <li key={proj} className="border-b last:border-b-0 py-2 px-1 text-foreground">
                    {proj}
                  </li>
                ))}
              </ul>
            )}
            {showForm ? (
              <form onSubmit={handleCreateProject} className="w-full flex gap-2 mt-4">
                <Input
                  placeholder="프로젝트 이름을 입력하세요"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  autoFocus
                  className="flex-1"
                />
                <Button type="submit" disabled={!projectName.trim()}>
                  생성
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowForm(false);
                    setProjectName("");
                  }}
                >
                  취소
                </Button>
              </form>
            ) : (
              <Button
                onClick={() => setShowForm(true)}
                className="w-full mt-2"
                size="lg"
              >
                새 프로젝트 생성
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
