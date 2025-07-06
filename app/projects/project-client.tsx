'use client';

import React from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/db/schema";

export function ProjectClient({ initialProjects }: { initialProjects: Project[] }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>세션 로딩 중...</p>;
  }

  if (!session) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <div className="w-full max-w-2xl space-y-8">
      <Card className="w-full border shadow-sm">
        <CardContent className="py-8 px-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">내 프로젝트 목록</h2>
          {initialProjects.length === 0 ? (
            <p className="text-muted-foreground">아직 등록된 프로젝트가 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {initialProjects.map((project) => (
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
  );
}
