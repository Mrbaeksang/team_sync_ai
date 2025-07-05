git add . && git commit -m "fix: `app/projects/page.tsx`에서 React key 경고 수정

- 리스트 렌더링 시 `key` prop에 배열 인덱스 대신 고유한 `proj` 값을 사용하도록 수정"

# AI 팀 빌딩 매니저 프로젝트 개발 지시사항

## 외부 AI를 위한 프로젝트 컨텍스트 및 디자인 지침

이 프로젝트는 Vercel의 `ai-chatbot` 템플릿을 기반으로 커스터마이징됩니다. 코드를 생성할 때 다음 지침을 **반드시** 준수해주세요.

-   **기반 템플릿**: [Vercel ai-chatbot 템플릿](https://github.com/vercel/ai-chatbot)
-   **디자인 언어**: 기존 `ai-chatbot` 프로젝트의 디자인 언어와 일관성을 유지해야 합니다.
-   **컴포넌트 라이브러리**: `shadcn/ui` 컴포넌트를 적극적으로 활용해주세요. (예: `Card`, `Button`, `Input`, `Textarea` 등)
-   **스타일링**: Tailwind CSS를 사용하며, 기존 `ai-chatbot` 템플릿에서 사용되는 Tailwind CSS 클래스 컨벤션(예: `bg-background`, `text-foreground`, `border`, `shadow-sm`, `rounded-md`, `px-4`, `py-2` 등)을 최대한 따릅니다.
-   **파일 구조**: `app` 라우터 기반의 Next.js 프로젝트이며, `components`, `lib` 등의 기존 폴더 구조를 따릅니다.
-   **Server Actions**: 데이터 처리 로직은 가능한 경우 Next.js Server Actions를 활용하는 방식으로 구현합니다.
-   **`use client`**: 클라이언트 측 상호작용이 필요한 컴포넌트에만 `use client` 지시어를 사용합니다.

---

## 1. `app/projects/[id]/survey/page.tsx` 페이지 생성

**목표:** 팀원들이 AI 설문에 응답할 수 있는 페이지를 구현합니다. 설문 질문을 표시하고 응답을 입력받는 기능을 포함합니다.

**지시사항:**
아래 요구사항에 맞춰 `app/projects/[id]/survey/page.tsx` 파일을 생성할 코드를 다른 AI 도구를 사용하여 작성해주세요.

**요구사항:**
- Next.js App Router의 페이지 컴포넌트입니다.
- `use client` 지시어를 포함합니다.
- `shadcn/ui`의 `Card`, `Button`, `Textarea` 컴포넌트를 활용하여 UI를 구성합니다.
- 페이지 상단에 "팀원 설문"이라는 제목과 현재 프로젝트 이름을 표시합니다. (프로젝트 이름은 임시로 "[프로젝트 이름]"으로 표시)
- AI 설문 질문을 표시하는 영역과 사용자가 응답을 입력할 `Textarea` 필드를 포함합니다.
- "다음 질문" 또는 "설문 완료" 버튼을 포함합니다. 이 버튼 클릭 시 `handleSubmitAnswer` 함수를 호출합니다. (이 함수는 현재는 콘솔 로그만 찍도록 구현하고, 실제 로직은 다음 단계에서 Server Action으로 구현할 예정입니다.)
- 설문 질문은 임시로 하드코딩된 배열을 사용합니다. (예: `['당신의 주요 개발 언어는 무엇인가요?', '협업 시 가장 중요하게 생각하는 가치는 무엇인가요?']`)

**생성된 코드 (여기에 붙여넣어 주세요):**
```tsx
// 여기에 `app/projects/[id]/survey/page.tsx` 파일의 코드를 붙여넣어 주세요.
```"use client";

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
