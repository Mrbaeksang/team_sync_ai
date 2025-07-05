git add . && git commit -m """feat: projects 테이블 스키마 정의

- `drizzle-orm`을 사용하여 `projects` 테이블 스키마를 `lib/db/schema.ts`에 추가합니다.
- 테이블에는 id, userId, name, description, createdAt 필드를 포함합니다.
- `users` 테이블과의 관계를 설정합니다.
"""

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

다음 요구사항에 따라 `lib/db/schema.ts` 파일에 `projects` 테이블 스키마를 추가하는 코드를 작성해주세요. 기존 코드는 유지하고 그 아래에 새로운 코드를 추가해야 합니다.

1.  **필요한 모듈 import**: `pg-core`에서 `text`, `timestamp`를 추가로 import 합니다.
2.  **`projects` 테이블 정의**: `pgTable`을 사용하여 `projects`라는 이름의 새 테이블을 정의합니다.
3.  **테이블 필드 정의**:
    *   `id`: `text` 타입, `primaryKey()`
    *   `userId`: `text` 타입, `notNull()`, `users` 테이블의 `id`를 참조하는 `references` 설정
    *   `name`: `text` 타입, `notNull()`
    *   `description`: `text` 타입
    *   `createdAt`: `timestamp` 타입, `defaultNow()`, `notNull()`
4.  **기존 코드 유지**: 파일에 이미 존재하는 `users`, `chats`, `messages` 테이블 및 관련 관계 설정(`relations`) 코드는 절대 수정하거나 삭제하지 마세요. 새로운 `projects` 테이블 정의 코드만 기존 코드의 마지막 부분에 추가해주세요.

---
## 코드 삽입을 위한 플레이스홀더

### ※ 중요: 아래 `[START OF CODE]`와 `[END OF CODE]` 사이에 **추가할 코드 부분만** 그대로 붙여넣어 주세요. (파일 전체 코드가 아님)

```ts
[START OF CODE]
import { text, timestamp } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
[END OF CODE]

```