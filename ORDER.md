git add . && git commit -m "Fix: 설문 페이지에 saveSurveyResponse Server Action 임포트 추가"

## 코드 생성 컨텍스트 및 디자인 지침

-   **기반 템플릿**: [Vercel ai-chatbot 템플릿](https://github.com/vercel/ai-chatbot)
-   **디자인 언어**: 기존 `ai-chatbot` 프로젝트의 디자인 언어와 일관성을 유지해야 합니다.
-   **컴포넌트 라이브러리**: `shadcn/ui` 컴포넌트를 적극적으로 활용해주세요. (예: `Card`, `Button`, `Input`, `Textarea` 등)
-   **스타일링**: Tailwind CSS를 사용하며, 기존 `ai-chatbot` 템플릿에서 사용되는 Tailwind CSS 클래스 컨벤션(예: `bg-background`, `text-foreground`, `border`, `shadow-sm`, `rounded-md`, `px-4`, `py-2` 등)을 최대한 따릅니다.
-   **파일 구조**: `app` 라우터 기반의 Next.js 프로젝트이며, `components`, `lib` 등의 기존 폴더 구조를 따릅니다.
-   **Server Actions**: 데이터 처리 로직은 가능한 경우 Next.js Server Actions를 활용하는 방식으로 구현합니다.
-   **`use client`**: 클라이언트 측 상호작용이 필요한 컴포넌트에만 `use client` 지시어를 사용합니다.

## 외부 AI를 위한 구체적인 프롬프트

`app/projects/[id]/survey/page.tsx` 파일에 `saveSurveyResponse` Server Action을 임포트하는 구문을 추가해주세요.

**수정 전 코드:**

```typescript
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';
```

**수정 후 코드:**

```typescript
// --- 플레이스홀더 시작 ---
// 여기에 수정된 코드를 삽입하세요.
// --- 플레이스홀더 끝 ---
```

## 코드 삽입을 위한 플레이스홀더

위 `수정 후 코드` 섹션의 `// --- 플레이스홀더 시작 ---`과 `// --- 플레이스홀더 끝 ---` 주석 사이에 생성된 코드를 삽입해주세요.