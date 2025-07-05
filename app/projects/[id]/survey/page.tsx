'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { saveSurveyResponse } from './actions';

interface SurveyPageProps {
  params: { id: string };
}

export default function SurveyPage({ params }: SurveyPageProps) {
  const { id: projectId } = params;
  const router = useRouter();
  const [teamMemberName, setTeamMemberName] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await saveSurveyResponse({ projectId, teamMemberName, responseContent });
    if (result.success) {
      toast("설문 응답이 성공적으로 저장되었습니다.");
      router.push(`/projects/${projectId}`);
    } else {
      toast.error(`설문 응답 저장에 실패했습니다. ${result.error}`);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>팀원 설문 참여</CardTitle>
          <CardDescription>프로젝트 팀 빌딩을 위한 설문에 참여해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="teamMemberName">팀원 이름</Label>
              <Input
                id="teamMemberName"
                type="text"
                placeholder="이름을 입력해주세요"
                value={teamMemberName}
                onChange={(e) => setTeamMemberName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="responseContent">설문 응답</Label>
              <Textarea
                id="responseContent"
                placeholder="기술 스택, 협업 스타일, 경험 등을 자유롭게 작성해주세요."
                value={responseContent}
                onChange={(e) => setResponseContent(e.target.value)}
                rows={8}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? '제출 중...' : '설문 제출'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">프로젝트 ID: {projectId}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
