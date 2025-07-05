// app/projects/[id]/survey/page.tsx

'use client';

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { db } from "@/lib/db/queries"; // Corrected import path
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// 임시 설문 응답 테이블 스키마 (실제는 lib/db/schema.ts로 이동)
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"; // Corrected import
import { relations } from "drizzle-orm";

export const surveyResponses = pgTable("survey_responses", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id),
  teamMemberName: text("team_member_name").notNull(),
  responseContent: text("response_content"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});
export const surveyResponsesRelations = relations(surveyResponses, ({ one }) => ({
  project: one(projects, {
    fields: [surveyResponses.projectId],
    references: [projects.id],
  }),
}));

// 프로젝트 정보 조회 함수
async function getProject(projectId: string) {
  const result = await db.select().from(projects).where(eq(projects.id, projectId));
  return result[0];
}

// 설문 응답 저장 서버 액션
async function saveSurveyResponse(formData: FormData) {
  "use server";
  const projectId = formData.get("projectId") as string;
  const teamMemberName = formData.get("teamMemberName") as string;
  const responseContent = formData.get("responseContent") as string;
  const id = nanoid();

  await db.insert(surveyResponses).values({
    id,
    projectId,
    teamMemberName,
    responseContent,
  });

  // 캐시 갱신 (Next.js App Router)
  // @ts-ignore
  if (typeof revalidatePath !== "undefined") {
    // @ts-ignore
    revalidatePath(`/projects/${projectId}/survey`);
  }
}

export default async function SurveyPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  // SSR이므로 useState는 클라이언트로 분리 필요 (폼 상태 관리는 클라이언트에서)
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-12">
        <Card className="w-full max-w-md border shadow-sm">
          <CardContent className="py-8 px-6 text-center">
            <h2 className="text-xl font-bold mb-2 text-foreground">프로젝트를 찾을 수 없습니다.</h2>
            <p className="text-muted-foreground">잘못된 링크거나, 삭제된 프로젝트일 수 있습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 클라이언트 컴포넌트에서 폼 상태 관리
  return <SurveyForm project={project} />;
}

// 클라이언트 컴포넌트: 폼 UI 및 상태 관리
function SurveyForm({ project }: { project: { id: string; name: string } }) {
  const [teamMemberName, setTeamMemberName] = useState("");
  const [responseContent, setResponseContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append("projectId", project.id);
    formData.append("teamMemberName", teamMemberName);
    formData.append("responseContent", responseContent);

    // 서버 액션 호출
    await saveSurveyResponse(formData);

    setTeamMemberName("");
    setResponseContent("");
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    // 캐시/상태 갱신, 필요시 router.refresh() 등 활용
    // router.refresh();
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background px-4 py-12">
      <div className="w-full max-w-xl">
        <Card className="w-full border shadow-sm mb-8">
          <CardContent className="py-8 px-6">
            <h1 className="text-2xl font-bold mb-2 text-foreground">
              {project.name} - 팀원 설문
            </h1>
            <p className="text-muted-foreground mb-6">
              아래 질문에 자유롭게 답변해 주세요.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                name="teamMemberName"
                placeholder="당신의 이름 또는 닉네임"
                value={teamMemberName}
                onChange={(e) => setTeamMemberName(e.target.value)}
                required
                className="bg-background"
                autoFocus
              />
              <Textarea
                name="responseContent"
                placeholder="답변을 입력해 주세요"
                rows={5}
                value={responseContent}
                onChange={(e) => setResponseContent(e.target.value)}
                required
                className="bg-background"
              />
              <Button
                type="submit"
                disabled={submitting || !teamMemberName.trim() || !responseContent.trim()}
                className="w-full mt-2"
                size="lg"
              >
                {submitting ? "제출 중..." : "제출"}
              </Button>
              {submitted && (
                <div className="text-green-600 text-center mt-2">응답이 저장되었습니다!</div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}