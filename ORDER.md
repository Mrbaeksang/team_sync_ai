git add . && git commit -m "feat: 역할 추천 대시보드 페이지 구현"

---
## 코드 생성 컨텍스트 및 디자인 지침 (Gemini CLI 에이전트가 ORDER.md에 포함할 내용)

코드를 생성할 때 다음 지침을 **반드시** 준수해주세요.

-   **기반 템플릿**: [Vercel ai-chatbot 템플릿](https://github.com/vercel/ai-chatbot)
-   **디자인 언어**: 기존 `ai-chatbot` 프로젝트의 디자인 언어와 일관성을 유지해야 합니다.
-   **컴포넌트 라이브러리**: `shadcn/ui` 컴포넌트를 적극적으로 활용해주세요. (예: `Card`, `Button`, `Input`, `Textarea` 등)
-   **스타일링**: Tailwind CSS를 사용하며, 기존 `ai-chatbot` 템플릿에서 사용되는 Tailwind CSS 클래스 컨벤션(예: `bg-background`, `text-foreground`, `border`, `shadow-sm`, `rounded-md`, `px-4`, `py-2` 등)을 최대한 따릅니다.
-   **파일 구조**: `app` 라우터 기반의 Next.js 프로젝트이며, `components`, `lib` 등의 기존 폴더 구조를 따릅니다.
-   **Server Actions**: 데이터 처리 로직은 가능한 경우 Next.js Server Actions를 활용하는 방식으로 구현합니다.
-   **`use client`**: 클라이언트 측 상호작용이 필요한 컴포넌트에만 `use client` 지시어를 사용합니다.

---
## 외부 AI를 위한 구체적인 프롬프트

다음 요구사항에 따라 `app/projects/[id]/dashboard/page.tsx` 파일의 전체 코드를 생성해주세요.

1.  **필요한 모듈 import**:
    *   `@/lib/db/queries`에서 `db` 객체를 import 합니다.
    *   `@/lib/db/schema`에서 `projects` 테이블과 `surveyResponses` 테이블을 import 합니다.
    *   `drizzle-orm`에서 `eq`를 import 합니다.
    *   `@/components/ui/card`, `@/components/ui/button` 등 필요한 UI 컴포넌트를 import 합니다.

2.  **데이터 조회 함수 `getProject` 정의**:
    *   `async function getProject(projectId: string)`를 정의합니다.
    *   내부에서 `db.select().from(projects).where(eq(projects.id, projectId))`를 사용하여 특정 ID의 프로젝트 정보를 조회하고, 첫 번째 결과를 반환합니다.

3.  **데이터 조회 함수 `getSurveyResponses` 정의**:
    *   `async function getSurveyResponses(projectId: string)`를 정의합니다.
    *   내부에서 `db.select().from(surveyResponses).where(eq(surveyResponses.projectId, projectId))`를 사용하여 특정 프로젝트의 모든 설문 응답을 조회하여 반환합니다.

4.  **`DashboardPage` 컴포넌트 구현**:
    *   `async` 함수로 정의하고, `params: { id: string }`를 props로 받습니다.
    *   `await getProject(params.id)`를 호출하여 프로젝트 정보를 가져옵니다.
    *   `await getSurveyResponses(params.id)`를 호출하여 설문 응답 목록을 가져옵니다.
    *   프로젝트 정보가 없을 경우, "프로젝트를 찾을 수 없습니다." 라는 메시지를 표시하고 `return` 합니다.
    *   `Card` 컴포넌트를 사용하여 프로젝트 이름과 설문 응답 목록을 표시합니다.
    *   각 설문 응답은 팀원 이름과 응답 내용을 보여줍니다.
    *   설문 응답이 없을 경우, "아직 설문 응답이 없습니다." 라는 메시지를 표시합니다.
    *   AI 역할 추천을 위한 플레이스홀더 섹션을 추가합니다. (예: "AI 역할 추천 결과 (미구현)")

---
## 코드 삽입을 위한 플레이스홀더

### ※ 중요: 아래 `[START OF CODE]`와 `[END OF CODE]` 사이에 생성된 **`app/projects/[id]/dashboard/page.tsx` 파일의 전체 코드**를 그대로 붙여넣어 주세요.

```tsx
[START OF CODE]
// 여기에 코드 붙여넣기
[END OF CODE]
```