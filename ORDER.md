git add . && git commit -m "feat: 프로젝트 생성 AI 챗봇 연동"

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

다음 요구사항에 따라 `app/projects/page.tsx` 파일의 전체 코드를 **수정**해주세요.

1.  **클라이언트 컴포넌트 전환**: 파일 최상단에 `'use client';` 지시어를 추가합니다.
2.  **필요한 모듈 및 훅 import**:
    *   `react`에서 `useState`를 import 합니다.
    *   `@/components/chat`에서 `Chat` 컴포넌트를 import 합니다.
    *   `@/lib/ai/prompts`에서 `getProjectCreationPrompt` 함수를 import 합니다.
    *   `@/lib/db/queries`에서 `db` 객체와 `createGuestUser` 함수를 import 합니다.
    *   `@/lib/db/schema`에서 `projects` 테이블을 import 합니다.
    *   `next/cache`에서 `revalidatePath`를 import 합니다.
    *   `next/navigation`에서 `redirect`를 import 합니다.
    *   `drizzle-orm`에서 `desc`를 import 합니다.
    *   `nanoid`를 import 합니다.
    *   `@/components/ui/card`, `@/components/ui/button`, `@/components/ui/input`, `@/components/ui/textarea` 등 필요한 UI 컴포넌트를 import 합니다.

3.  **`getProjects` 함수 수정**: `getProjects` 함수는 그대로 유지합니다.

4.  **`createProject` 서버 액션 수정**: `createProject` 서버 액션은 그대로 유지합니다. (이전 단계에서 디버깅을 위해 수정한 `createGuestUser` 강제 호출 로직은 그대로 둡니다.)

5.  **`ProjectsPage` 컴포넌트 수정**:
    *   `async` 함수로 정의된 `ProjectsPage` 컴포넌트를 `'use client';` 지시어를 가진 클라이언트 컴포넌트로 변경합니다. (데이터 패칭은 `useEffect` 또는 별도의 서버 컴포넌트에서 처리하도록 변경)
    *   `useState`를 사용하여 `chatId` 상태를 관리합니다. 초기값은 `undefined`로 설정합니다.
    *   `useEffect` 훅을 사용하여 컴포넌트가 마운트될 때 `getProjects`를 호출하여 프로젝트 목록을 가져오고 상태에 저장합니다. (이전에는 서버 컴포넌트에서 직접 `await` 했음)
    *   `Chat` 컴포넌트를 렌더링하고, `chatId` prop에 `chatId` 상태를 전달합니다.
    *   `Chat` 컴포넌트의 `initialMessages` prop에 `getProjectCreationPrompt()`를 호출하여 초기 메시지를 설정합니다.
    *   `Chat` 컴포넌트의 `onChatCreated` prop에 `setChatId` 함수를 전달하여 새로운 채팅이 생성될 때 `chatId`를 업데이트하도록 합니다.
    *   기존의 프로젝트 목록 표시 및 새 프로젝트 생성 폼은 그대로 유지합니다. (AI 챗봇과 함께 표시)

---
## 코드 삽입을 위한 플레이스홀더

### ※ 중요: 아래 `[START OF CODE]`와 `[END OF CODE]` 사이에 생성된 **`app/projects/page.tsx` 파일의 전체 코드**를 그대로 붙여넣어 주세요.

```tsx
[START OF CODE]
// 여기에 코드 붙여넣기
[END OF CODE]
```