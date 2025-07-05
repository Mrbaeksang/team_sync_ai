"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// 하드코딩된 설문 질문 예시
const QUESTIONS = [
  "당신의 주요 개발 언어는 무엇인가요?",
  "협업 시 가장 중요하게 생각하는 가치는 무엇인가요?",
];

export default function SurveyPage() {
  // 임시 프로젝트 이름
  const projectName = "[프로젝트 이름]";

  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [answer, setAnswer] = React.useState("");
  const [answers, setAnswers] = React.useState<string[]>([]);
  const isLast = currentIdx === QUESTIONS.length - 1;

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 데이터 처리 로직은 Server Action에서 구현 예정
    console.log(`Q${currentIdx + 1}:`, QUESTIONS[currentIdx]);
    console.log(`A${currentIdx + 1}:`, answer);

    setAnswers((prev) => [...prev, answer]);
    setAnswer("");
    if (!isLast) {
      setCurrentIdx((idx) => idx + 1);
    } else {
      alert("설문이 완료되었습니다!");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background px-4 py-12">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-8 text-foreground">팀원 설문</h1>
        <Card className="w-full border shadow-sm">
          <CardContent className="py-8 px-6 flex flex-col gap-8">
            <div className="text-base text-foreground font-medium">
              프로젝트: <span className="text-primary font-semibold">{projectName}</span>
            </div>
            <form onSubmit={handleSubmitAnswer} className="flex flex-col gap-6">
              <div className="text-base font-semibold text-foreground">
                {QUESTIONS[currentIdx]}
              </div>
              <Textarea
                className="resize-none min-h-[80px] bg-background"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="답변을 입력하세요"
                autoFocus
                required
              />
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={!answer.trim()}
              >
                {isLast ? "설문 완료" : "다음 질문"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
