git add . && git commit -m """feat: 프로젝트 상세 페이지에 팀원 초대 UI 추가

- `app/projects/[id]/page.tsx`에 '팀원 초대' 버튼과 초대 링크를 표시하는 UI를 추가합니다.
- 클라이언트 컴포넌트로 전환하여 `useState`와 `useClipboard` 훅을 사용할 수 있도록 준비합니다.
- 초대 링크 복사 기능을 위한 버튼과 상태를 구현합니다.
  """

---

## 코드 생성 컨텍스트 및 디자인 지침 (Gemini CLI 에이전트가 ORDER.md에 포함할 내용)

코드를 생성할 때 다음 지침을 **반드시** 준수해주세요.

- **기반 템플릿**: [Vercel ai-chatbot 템플릿](https://github.com/vercel/ai-chatbot)
- **디자인 언어**: 기존 `ai-chatbot` 프로젝트의 디자인 언어와 일관성을 유지해야 합니다.
- **컴포넌트 라이브러리**: `shadcn/ui` 컴포넌트를 적극적으로 활용해주세요. (예: `Card`, `Button`, `Input`, `Textarea` 등)
- **스타일링**: Tailwind CSS를 사용하며, 기존 `ai-chatbot` 템플릿에서 사용되는 Tailwind CSS 클래스 컨벤션(예: `bg-background`, `text-foreground`, `border`, `shadow-sm`, `rounded-md`, `px-4`, `py-2` 등)을 최대한 따릅니다.
- **파일 구조**: `app` 라우터 기반의 Next.js 프로젝트이며, `components`, `lib` 등의 기존 폴더 구조를 따릅니다.
- **Server Actions**: 데이터 처리 로직은 가능한 경우 Next.js Server Actions를 활용하는 방식으로 구현합니다.
- **`use client`**: 클라이언트 측 상호작용이 필요한 컴포넌트에만 `use client` 지시어를 사용합니다.

---

## 외부 AI를 위한 구체적인 프롬프트

다음 요구사항에 따라 `app/projects/[id]/page.tsx` 파일의 전체 코드를 **수정**해주세요.

1.  **클라이언트 컴포넌트 전환**: 파일 최상단에 `'use client';` 지시어를 추가합니다.
2.  **필요한 모듈 및 훅 import**:
    - `react`에서 `useState`와 `useEffect`를 import 합니다.
    - `@/components/ui/input`을 import 합니다.
    - `@/components/ui/button`을 import 합니다.
3.  **컴포넌트 구조 변경**:
    - 기존 `ProjectPage`를 `ProjectDetails`라는 새로운 컴포넌트로 분리하고, `project` 객체를 prop으로 받도록 수정합니다. (`ProjectDetails`는 클라이언트 사이드 로직을 가집니다.)
    - 최상위 `ProjectPage`는 그대로 `async` 함수로 유지하며, `getProject`를 호출하여 `project` 데이터를 가져온 후, 이 데이터를 `ProjectDetails` 컴포넌트에 prop으로 전달하는 구조로 변경합니다.
4.  **`ProjectDetails` 컴포넌트 구현**:
    - `useState`를 사용하여 `inviteLink`와 `isCopied` 상태를 관리합니다.
    - `useEffect`를 사용하여 컴포넌트가 마운트될 때 현재 URL을 기반으로 초대 링크(`inviteLink`)를 생성합니다. (`${window.location.origin}/projects/${project.id}/survey`)
    - `handleCopy` 함수를 정의하여 `navigator.clipboard.writeText`를 사용해 초대 링크를 복사하고, `isCopied` 상태를 `true`로 변경했다가 2초 후에 다시 `false`로 되돌리는 로직을 구현합니다.
5.  **UI 추가**:
    - 기존 프로젝트 정보 (`Card`) 아래에 새로운 `Card`를 추가하여 '팀원 초대' 섹션을 만듭니다.
    - 이 `Card` 안에는 `Input`과 `Button`을 사용하여 생성된 `inviteLink`를 표시하고, `handleCopy` 함수를 실행하는 '복사' 버튼을 배치합니다.

---

## 코드 삽입을 위한 플레이스홀더

### ※ 중요: 아래 `[START OF CODE]`와 `[END OF CODE]` 사이에 생성된 **`app/projects/[id]/page.tsx` 파일의 전체 코드**를 그대로 붙여넣어 주세요.

```tsx
[START OF CODE]
// app/projects/[id]/page.tsx

'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 예시 getProject 함수 (실제로는 서버 액션/DB 연동)
async function getProject(id: string) {
  // 여기에 실제 데이터 패칭 로직 구현 필요
  return {
    id,
    name: "예시 프로젝트",
    description: "이 프로젝트는 ai-chatbot 템플릿과 shadcn/ui 스타일을 따릅니다.",
  };
}

// 최상위 async 페이지 컴포넌트
export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  return <ProjectDetails project={project} />;
}

// 클라이언트 컴포넌트
function ProjectDetails({ project }: { project: { id: string; name: string; description: string } }) {
  const [inviteLink, setInviteLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 실행되도록 체크
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
    <div className="flex flex-col items-center justify-start min-h-screen bg-background px-4 py-12">
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
    </div>
  );
}
[END OF CODE]
```
