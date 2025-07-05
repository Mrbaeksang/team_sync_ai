// app/projects/[id]/dashboard/page.tsx

import { db } from "@/lib/db/queries";
import { projects, surveyResponses, SurveyResponse } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 프로젝트 정보 조회
async function getProject(projectId: string) {
  const result = await db.select().from(projects).where(eq(projects.id, projectId));
  return result[0];
}

// 설문 응답 목록 조회
async function getSurveyResponses(projectId: string) {
  return await db
    .select()
    .from(surveyResponses)
    .where(eq(surveyResponses.projectId, projectId));
}

// 대시보드 페이지
export default async function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  const responses = await getSurveyResponses(id);

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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* 프로젝트 정보 카드 */}
        <Card className="w-full border shadow-sm mb-8">
          <CardContent className="py-8 px-6">
            <h1 className="text-2xl font-bold mb-2 text-foreground">
              {project.name} - 역할 추천 대시보드
            </h1>
            <p className="text-muted-foreground">
              이 페이지에서 팀원들의 설문 응답과 AI 역할 추천 결과를 한눈에 볼 수 있습니다.
            </p>
          </CardContent>
        </Card>
        {/* 설문 응답 목록 */}
        <Card className="w-full border shadow-sm mb-8">
          <CardContent className="py-8 px-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">팀원 설문 응답</h2>
            {responses.length === 0 ? (
              <p className="text-muted-foreground text-center">
                아직 설문 응답이 없습니다.
              </p>
            ) : (
              <ul className="space-y-4">
                {responses.map((resp: SurveyResponse) => (
                  <li key={resp.id} className="border-b last:border-b-0 pb-3">
                    <div className="font-semibold text-foreground mb-1">{resp.teamMemberName}</div>
                    <div className="text-sm text-muted-foreground whitespace-pre-line">{resp.responseContent}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        {/* AI 역할 추천 섹션 (플레이스홀더) */}
        <Card className="w-full border shadow-sm">
          <CardContent className="py-8 px-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">AI 역할 추천 결과 (미구현)</h2>
            <p className="text-muted-foreground">
              이 영역에는 팀원 설문 응답을 바탕으로 한 AI 역할 추천 결과가 표시될 예정입니다.
            </p>
            <Button className="mt-4" disabled>
              역할 추천 실행 (추후 구현)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
