# AI 팀 빌딩 매니저 프로젝트 PLAN

## 1. 프로젝트 목표

- 소규모 개발팀(특히 부트캠프 등)의 **역할 분배/팀 빌딩**을 AI가 자동화, 최적화해주는 웹앱
- 각 팀원의 역량·경험·협업스타일 등을 AI가 대화형 설문으로 분석 → 최적의 역할 배분
- **AI 챗봇** 기반 대화 흐름, 팀원 초대, 자동 채팅방, 직관적인 시각화 대시보드까지 제공

---

## 2. 전체 사용자 흐름

1.  **첫 방문**
    - AI 비서가 인사하며 등장(자동 메시지)
    - [프로젝트 생성] 버튼 표시

2.  **프로젝트 생성 플로우**
    - 프로젝트명/목표 등 기본 정보 입력 (AI와 대화)
    - [팀원 초대] 버튼 제공 (카카오톡/링크 등으로 공유)

3.  **팀원 초대/참여**
    - 초대된 팀원은 설문 링크로 입장 → 간단한 프로필/이메일 입력

4.  **팀원별 AI 설문**
    - AI가 각 팀원에게 맞춤 질문
      (기술스택 경험, 협업 선호도, 실제 사례 등)
    - 모든 설문 응답은 DB에 저장

5.  **AI 역할 추천/배분**
    - 모든 설문 완료시, AI가 각 팀원의 "비교우위/적��역할"을 분석
    - 대시보드에 역할 추천 결과 시각화, 수동 조정 가능

6.  **팀 채팅방 자동 생성**
    - 역할 분배가 끝나면, 해당 프로젝트 팀 채팅방 생성
    - 모든 팀원이 실시간 소통 가능

---

### 3.0. 기술 스택 및 핵심 인프라

이 프로젝트는 Vercel의 `ai-chatbot` 템플릿을 기반으로 커스터마이징됩니다.

#### 3.0.1. 핵심 데이터베이스 스키마 개요

본 프로젝트는 Drizzle ORM을 사용하여 PostgreSQL 데이터베이스와 상호작용합니다. 다음은 현재 정의된 주요 테이블 스키마의 개요입니다. 외부 AI는 이 스키마를 기반으로 데이터베이스 작업을 수행해야 합니다. 상세 스키마 정의는 `lib/db/schema.ts` 파일을 참조하세요.

-   **`User` 테이블**: 사용자 정보를 저장합니다. (id, email, password 등)
-   **`Chat` 테이블**: 채팅 세션 정보를 저장합니다. (id, userId, title, visibility 등)
-   **`Message` 테이블**: 채팅 메시지 내용을 저장합니다. (id, chatId, role, parts, attachments 등)
-   **`projects` 테이블**: 팀 빌딩 프로젝트 정보를 저장합니다. (id, userId, name, description, createdAt)
-   **`surveyResponses` 테이블**: 팀원들의 설문 응답을 저장합니다. (id, projectId, teamMemberName, responseContent, createdAt)

---


-   **기반 템플릿**: [Vercel ai-chatbot 템플릿](https://github.com/vercel/ai-chatbot)
-   **프레임워크**: Next.js (App Router 기반)
-   **UI/UX**:
    -   **디자인 언어**: 기존 `ai-chatbot` 프로젝트의 디자인 언어와 일관성을 유지합니다.
    -   **컴포넌트 라이브러리**: `shadcn/ui` 컴포넌트를 적극적으로 활용합니다. (예: `Card`, `Button`, `Input`, `Textarea` 등)
    -   **스타일링**: Tailwind CSS를 사용하며, 기존 `ai-chatbot` 템플릿에서 사용되는 Tailwind CSS 클래스 컨벤션(예: `bg-background`, `text-foreground`, `border`, `shadow-sm`, `rounded-md`, `px-4`, `py-2` 등)을 최대한 따릅니다.
-   **데이터 처리**:
    -   **백엔드 로직**: Next.js Server Actions를 활용하여 데이터 처리 로직을 구현합니다.
    -   **데이터베이스**: Neon (PostgreSQL)을 사용하며, `POSTGRES_URL` 환경 변수를 통해 연결됩니다. **Drizzle ORM**을 사용하여 `lib/db/schema.ts`에 스키마를 정의하고 `lib/db/queries.ts`를 통해 데이터베이스 작업을 수행합니다. `.env.local` 대신 `.env` 파일을 로드하도록 `lib/db/queries.ts`, `lib/db/migrate.ts`, `drizzle.config.ts`를 수정했습니다.**
-   **캐싱/실시간 데이터**: Upstash (Redis/Kafka)를 활용할 수 있습니다. (`KV_REST_API_*`, `KV_URL`, `REDIS_URL` 환경 변수 사용)
-   **인증**: **NextAuth.js**를 사용하여 인증을 처리하며, **Google 및 Kakao OAuth**를 주요 인증 제공자로 사용합니다. `AUTH_SECRET` 환경 변수가 사용됩니다.
-   **AI**: **Google Gemini API**를 활용하며, `GEMINI_API_KEY` 환경 변수를 통해 연동됩니다. AI는 팀원 설문 분석 및 역할 추천에 사용됩니다.
-   **기타 인프라 (향후 활용 가능성)**:
    -   `BLOB_READ_WRITE_TOKEN`: Vercel Blob Storage (파일 업로드 등)
    -   `KV_REST_API_*`, `KV_URL`, `REDIS_URL`: Vercel KV 또는 Redis (캐싱, 실시간 데이터 등)
    -   `NEXT_PUBLIC_STACK_*`, `STACK_SECRET_SERVER_KEY`, `VERCEL_OIDC_TOKEN`: Vercel AI Chatbot 템플릿의 특정 기능 또는 Vercel 플랫폼 연동에 사용될 수 있습니다. 프로젝트 진행에 따라 필요 여부를 판단합니다.
-   **파일 구조**: `app` 라우터 기반의 Next.js 프로젝트이며, `components`, `lib` 등의 기존 폴더 구조를 따릅니다. `use client` 지시어는 클라이언트 측 상호작용이 필요한 컴포넌트에만 사용합니다.
-   **참고**: 본 프로젝트는 `vercel/ai-chatbot` 템플릿을 커스터마이징하므로, 현재 프로젝트 목표와 관련 없는 파일들이 포함되어 있을 수 있습니다.
-   **환경 변수 설정**: 성공적인 빌드 및 배포를 위해 `DATABASE_URL`, `AUTH_SECRET`, `GEMINI_API_KEY` 등 필요한 환경 변수들이 Vercel 프로젝트 설정에 올바르게 설정되어 있어야 합니다. `.env.example` 파일을 참조하여 필요한 환경 변수를 확인하고 설정해주세요.

---

## 3. 프로젝트 구현 상세 및 진행 상황

이 섹션에서는 각 기능의 구현 상세, 현재 진행 상황, 그리고 관련 파일 및 역할에 대해 설명합니다.

### 3.1. AI가 최초 인사 및 안내

-   **진행 상황**: 완료 [x]
-   **역할 및 연결 지점**:
    -   `app/(chat)/page.tsx`는 이제 로그인 후 첫 화면에서 `components/greeting.tsx` 컴포넌트를 렌더링합니다.
    -   `Greeting` 컴포넌트의 "새 프로젝트 생성" 버튼을 클릭하면 `app/(chat)/page.tsx`에 구현된 핸들러 함수를 통해 `/projects` 페이지로 이동합니다.
-   **관련 파일/디렉토리**:
    -   `app/layout.tsx`: 전역 레이아웃 (Greeting 컴포넌트 직접 렌더링하지 않음)
    -   `app/(chat)/page.tsx`: 메인 챗 페이지 (Greeting 컴포넌트 직접 렌더링하지 않음)
    -   `components/greeting.tsx`: 초기 인사말 및 버튼 UI (현재 메인 흐름에 미통합)
    -   `app/projects/page.tsx`: "새 프로젝트 시작" 버튼 클릭 시 이동할 대상 페이지 (존재 ���인)
    -   `lib/ai/prompts.ts`: AI 초기 프롬프트 정의 (Google Gemini API를 활용하여 정의 필요)

### 3.2. 프로젝트 생성/정보입력/AI 챗 대화 흐름

-   **진행 상황**: 완료 [x] (`app/projects/actions.ts` 및 `app/projects/[id]/page.tsx` 수정 완료, `user_id` 누락 및 타입 오류 수정)
-   **역할 및 연결 지점**:
    -   `app/projects/page.tsx`에서 Server Action을 통해 프로젝트를 생성하고 데이터베이스에 저장합니다.
    -   생성된 프로젝트 목록을 데이터베이스에서 조회하여 화면에 표시합니다.
    -   프로젝트 생성 후에는 해당 프로젝트의 상세 페이지(`app/projects/[id]/page.tsx`)로 리다이렉트됩니다.
    -   개별 프로젝트 페이지에서는 데이터베이스에서 해당 프로젝트의 정보를 조회하여 보여줍니다.
-   **관련 파일/디렉토리**:
    -   `app/projects/page.tsx`: 프로젝트 목록 및 생성 UI (존재 확인, 핵심 로직 미구현)
    -   `app/projects/[id]/page.tsx`: 개별 프로젝트 상세 페이지 (클라이언트 컴포넌트로 변경 및 데이터 패칭 로직 수정)
    -   `app/(chat)/actions.ts`: 챗봇과의 대화 처리 (Server Actions) (존재 확인, 연동 필요)
    -   `components/chat.tsx`: 챗 UI 컴포넌트 (존재 확인, 재사용 또는 확장 필요)
    -   `lib/ai/prompts.ts`: 프로젝트 생성 관련 AI 프롬프트 (Google Gemini API를 활용하여 정의 필요)
    -   `lib/db/schema.ts`: `Project` 테이블 스키마 정의 (Drizzle ORM을 사용하여 정의 필요)
    -   `lib/db/queries.ts`: 프로젝트 관련 DB 쿼리 함수 (Drizzle ORM을 사용하여 구현 필요)
    -   `app/projects/actions.ts`: 프로젝트 관련 Server Actions (구현 완료, `getProjectByIdServerAction` 추가, `user_id` 처리 로직 수정)

### 3.3. 팀원 초대/참여/설문 링크 발급

-   **진행 상황**: 완료 [x] (프로젝트 상세 페이지에 초대 UI 추가)
-   **역할 및 연결 지점**:
    -   `app/projects/[id]/page.tsx`에 팀원 초대 링크를 표시하고 복사하는 UI가 추가되었습니다.
    -   초대 링크는 `/projects/[id]/survey` 경로를 사용하며, 이 링크를 통해 팀원이 설문 페이지로 바로 접근합니다.
-   **관련 파일/디렉토리**:
    -   `lib/db/schema.ts`: `TeamMember` 테이블 스키마 정의 (Drizzle ORM을 사용하여 정의 필요)
    -   `lib/utils.ts`: 초대 링크 생성 유틸리티 함수 (구현 필요)

### 3.4. AI 설문(개별 맞춤형) → 응답 DB 저장

-   **진행 상황**: 완료 [x] (설문 페이지 UI 및 응답 저장 기능 구현 완료, `surveyResponses` 스키마 추가, `app/projects/[id]/survey/actions.ts` 구현 완료, `app/projects/[id]/survey/page.tsx`에 Server Action 연동 및 임포트 완료, AI 챗봇과의 대화 흐름을 통한 맞춤형 질문 기능은 아직 미구현)
-   **역할 및 연결 지점**:
    -   `app/projects/[id]/survey/page.tsx`에서 팀원들이 설문 응답을 입력하고 저장할 수 있습니다.
    -   설문 응답은 `surveyResponses` 테이블에 저장됩니다.
    -   AI 챗봇과의 대화 흐름을 통한 맞춤형 질문 기능은 아직 미구현입니다.
-   **관련 파일/디렉토리**:
    -   `app/projects/[id]/survey/page.tsx`: 설문 UI (구현 완료, Server Action 연동 및 임포트 완료)
    -   `app/projects/[id]/survey/actions.ts`: 설문 응답 처리 (Server Actions) (구현 완료)
    -   `lib/ai/prompts.ts`: 동적 설문 질문 생성 AI 프롬프트 (Google Gemini API를 활용하여 정의 필요)
    -   `lib/db/schema.ts`: `SurveyResponse` 테이블 스키마 정의 (Drizzle ORM을 사용하여 정의 필요)
    -   `lib/db/queries.ts`: 설문 응답 저장 DB 쿼리 함수 (Drizzle ORM을 사용하여 구현 필요)

### 3.5. AI 역할 추천/시각화/수동조정

-   **진행 상황**: 완료 [x] (역할 추천 대시보드 페이지 UI 및 설문 응답 조회 기능 구현 완료, `params` 타입 오류 수정 및 `ERROR.md` 지침에 따라 `Promise`/`React.use` 제거)
-   **역할 및 연결 지점**:
    -   `app/projects/[id]/dashboard/page.tsx`에서 프로젝트의 설문 응답 목록을 조회하여 표시합니다.
    -   AI 역할 추천 결과 표시를 위한 플레이스홀더 UI가 포함되어 있습니다.
    -   AI 역할 할당 로직 및 시각화 기능은 아직 미구현입니다.

### 3.6. 팀 채팅방 자동 생성/실시간 소통

-   **진행 상황**: 완료 [x] (채팅방 페이지 플레이스홀더 구현 완료, `params` 타입 오류 수정)
-   **역할 및 연결 지점**:
    -   `app/projects/[id]/chat-room/page.tsx`에 팀 채팅방 UI의 플레이스홀더가 구현되었습니다.
    -   실시간 채팅 기능 및 메시지 저장 기능은 아직 미구현입니다.

### 3.7. 관리 대시보드 (추후 확장)

-   **진행 상황**: 미구현 [ ]
-   **역할 및 연결 지점**:
    -   프로젝트 관리자가 전체 프로젝트 현황을 파악하고 관리할 수 있는 대시보드입니다. (추후 구현)

---

## 4. 코드 생성 컨텍스트 및 디자인 지침 (Gemini CLI 에이전트가 ORDER.md에 포함할 내용)

코드를 생성할 때 다음 지침을 **반드시** 준수해주세요.

-   **기반 템플릿**: [Vercel ai-chatbot 템플릿](https://github.com/vercel/ai-chatbot)
-   **디자인 언어**: 기존 `ai-chatbot` 프로젝트의 디자인 언어와 일관성을 유지해야 합니다.
-   **컴포넌트 라이브러리**: `shadcn/ui` 컴포넌트를 적극적으로 활용해주세요. (예: `Card`, `Button`, `Input`, `Textarea` 등)
-   **스타일링**: Tailwind CSS를 사용하며, 기존 `ai-chatbot` 템플릿에서 사용되는 Tailwind CSS 클래스 컨벤션(예: `bg-background`, `text-foreground`, `border`, `shadow-sm`, `rounded-md`, `px-4`, `py-2` 등)을 최대한 따릅니다.
-   **파일 구조**: `app` 라우터 기반의 Next.js 프로젝트이며, `components`, `lib` 등의 기존 폴더 구조를 따릅니다.
-   **Server Actions**: 데이터 처리 로직은 가능한 경우 Next.js Server Actions를 활용하는 방식으로 구현합니다.
-   **`use client`**: 클라이언트 측 상호작용이 필요한 컴포넌트에만 `use client` 지시어를 사용합니다.

---

## 5. 프로젝트 협업 원칙 및 Gemini CLI 에이전트 운영 가이드라인

저는 사용자님의 개발 보조 에이전트이자 이 프로젝트의 **내부 AI**입니다. 다음 원칙에 따라 프로젝트를 지원합니다.

-   **단일 진실 공급원 (Single Source of Truth)**: `GEMINI.md`는 이 프로젝트의 모든 중요한 컨텍스트(기술 스택, 데이터베이스 스키마, 디자인 가이드라인, 구현 상세 등)를 담는 **��일 진실 공급원**입니다. 외부 AI는 `ORDER.md`와 함께 `GEMINI.md`의 모든 지침을 **최우선으로, 그리고 엄격하게 준수**해야 합니다. 저(Gemini CLI 에이전트)는 이 `GEMINI.md`를 항상 최신 상태로 유지하고 업데이트할 책임이 있습니다. **프로젝트의 파일 구조나 파일 기능이 변경될 경우, `6. 프로젝트 파일 구조 및 설명` 섹션은 반드시 최신 상태로 업데이트되어야 합니다.**

-   **역할**: 사용자님의 지시에 따라 코드를 생성, 수정, 관리하며 개발 과정을 돕습니다.
-   **목표**: 효율적이고 안전한 개발 지원을 통해 프로젝트 목표 달성을 돕습니다.
-   **작업 방식**:
    -   **코드 생성 요청**: 새로운 코드 구현이 필요할 때, 제가 직접 프로젝트 내의 `ORDER.md` 파일을 생성하거나 수정하여 사용자님께 제시합니다. 이 `ORDER.md`는 **프로젝트의 사전 지식이 없는 외부 AI가 독립적으로 코드를 생성할 수 있도록 모든 필요한 컨텍스트를 포함해야 합니다.** `ORDER.md` 내용에는 다음이 포함됩니다.
        -   **최상단 커밋 메시지**: 해당 작업 완료 후 사용자님이 바로 복사해서 사용할 수 있는 `git add . && git commit -m "..."` 명령어를 한국어로 제공합니다. (한 줄로 제공)
        -   **코드 생성 컨텍스트**: `4. 코드 생성 컨텍스트 및 디자인 지침` 섹션의 전체 내용을 포함하여, 외부 AI가 코드를 생성하는 데 필요한 모든 배경 정보를 제공합니다.
        -   **외부 AI를 위한 구체적인 프롬프트**: 구현할 기능에 대한 상세 요구사항과 함께, 외부 AI가 코드를 생성할 수 있도록 명확하고 구체적인 지시를 포함합니다. **각 `ORDER.md`는 단 하나의 파일에 대한 코드 생성 또는 수정을 요청해야 합니다.**
        -   **타입 정의 및 컴포넌트 종류 명시**: 외부 AI가 타입 오류를 방지하고 올바른 코드를 생성하도록, **필요한 타입(props, state 등)을 명확히 정의**하고, 생성할 컴포넌트가 **서버 컴포넌트인지 클라이언트 컴포넌트(`'use client'`)인지 반드시 명시**합니다.
        -   **코드 삽입을 위한 플레이스홀더**: 외부 AI가 생성한 코드를 사용자님께서 직접 붙여넣을 수 있도록 명확한 주석 처리된 플레이스홀더를 제공합니다.
    -   **코드 적용**: 사용자님께서 제가 제시한 `ORDER.md` 내용을 확인하고, 외부 AI를 통해 코드를 생성한 후 해당 코드를 `ORDER.md`의 지정된 위치에 정확히 붙여넣어 저에게 전달해 주십시오. 제가 `ORDER.md`에 작성된 코드를 읽고, 해당 코드를 바탕으로 프로젝트 파일을 생성하거나 수정합니다.
    -   **진행 상황 업데이트**: 코드 변경 또는 기능 구현 완료 시, `PLAN.md`의 `3. 프로젝트 구현 상세 및 진행 상황` 섹션을 현재 구현 상태(완료 [x] 또는 미구현 [ ])에 맞춰 정확하게 업데이트합니다.
    -   **다음 단계 제안**: 현재 작업이 완료되면, 제가 **새로운 `ORDER.md` 파일을 생성하여 다음 논리적인 단계를 사용자님께 제안함**을 명시합니다. (즉, 다음 작업 지시도 `ORDER.md`를 통해 이루어짐)
    -   **컨벤션 준수**: 기존 코드베이스의 컨벤션(스타일, 구조, 네이밍 등)을 최대한 준수합니다.
    -   **안전 및 확인**: 파일 시스템이나 코드베이스에 중요한 변경을 가하기 전에는 항상 그 목적과 잠재적 영향을 설명하고 사용자님의 확인을 요청합니다.
    -   **오류 보고**: 오류가 발생할 경우 사용자에게 즉시 보고하고, 가능한 해결 방안을 제시합니다.
-   **제한 사항**:
    -   사용자님의 명시적인 지시 없이는 임의로 코드 수정/생성/삭제를 하지 않습니다.
    -   **프로젝트의 상태를 변경할 수 있는 어떠한 명령(예: `run_shell_command`를 통한 빌드, 설치, 마이그레이션, 푸시, 삭제 등)도 사용자님의 명시적인 확인과 승인 없이는 절대 실행하지 않습니다.** 명령의 목적과 잠재적 영향을 항상 먼저 설명하고, 사용자님의 **명확한 승인**을 요청할 것입니다.
    -   보안 및 안전 규칙을 최우선으로 준수하며, 민감한 정보(API 키, 비밀 등)를 코드에 노출하지 않습니다.
    -   대화형 셸 명령(예: `npm init`과 같이 사용자 입력을 요구하는 명령)은 지원하지 않으며, 비대화형 옵션(`npm init -y`)을 선호합니다.
-   **사용자님과의 약속**:
    -   **명확한 지시**: `ORDER.md`에 명확하고 구체적인 코드 요청을 제공해주시면, 제가 이를 정확히 이해하고 반영할 수 있도록 최선을 다하겠습니다.
    -   **코드 제공**: 요청된 코드를 다른 AI 도구로 생성하신 후, `ORDER.md`의 지정된 위치에 정확히 붙여넣어 주시면 제가 다음 작업을 진행할 수 있습니다.
    -   **피드백**: 진행 중 궁금한 점이나 변경 사항, ���는 제가 개선해야 할 부분이 있다면 언제든지 자유롭게 소통해주세요.
    -   **신뢰**: 상호 신뢰를 바탕으로 협업하며, 프로젝트의 성공을 위해 함께 노력하겠습니다.

## 6. 프로젝트 파일 구조 및 설명

이 섹션에서는 프로젝트의 주요 파일 및 디렉토리 구조를 설명하고, 각 파일의 목적과 역할을 명확히 합니다. 이는 프로젝트를 처음 접하는 개발자나 AI가 프로젝트의 구성과 기능을 빠르게 파악하는 데 도움을 줍니다.

### 6.1. 최상위 디렉토리

-   `.env.example`: 환경 변수 설정 예시 파일. `.env` 파일 생성 시 참고합니다.
-   `.eslintrc.json`: ESLint 설정 파일. 코드 품질 및 스타일 가이드를 정의합니다.
-   `.gitignore`: Git 버전 관리에서 제외할 파일 및 디렉토리를 지정합니다.
-   `biome.jsonc`: Biome 설정 파일. 코드 포맷팅, 린팅, 타입 체크 등을 정의합니다.
-   `components.json`: `shadcn/ui` 컴포넌트 설정 파일.
-   `drizzle.config.ts`: Drizzle ORM 설정 파일. 데이터베이스 스키마 및 마이그레이션 관련 설정을 포함합니다.
-   `instrumentation.ts`: Next.js의 Instrumentation 파일. 애플리케이션의 초기화 로직을 정의합니다.
-   `LICENSE`: 프로젝트 라이선스 정보.
-   `middleware.ts`: Next.js 미들웨어. 요청이 완료되기 전에 실행되는 로직을 정의합니다.
-   `next-env.d.ts`: Next.js 환경 변수 타입 정의 파일.
-   `next.config.ts`: Next.js 설정 파일. 빌드 및 런타임 동작을 구성합니다.
-   `package-lock.json`: `pnpm`이 아닌 `npm` 사용 시 의존성 잠금 파일. (현재 `pnpm` 사용)
-   `package.json`: 프로젝트 메타데이터 및 의존성, 스크립트 정의 파일.
-   `playwright.config.ts`: Playwright 테스트 프레임워크 설정 파일.
-   `pnpm-lock.yaml`: `pnpm` 의존성 잠금 파일.
-   `postcss.config.mjs`: PostCSS 설정 파일. CSS 변환을 위한 플러그인을 구성합니다.
-   `README.md`: 프로젝트에 대한 일반적인 정보, 설정 방법, 사용법 등을 설명하는 파일.
-   `tailwind.config.ts`: Tailwind CSS 설정 파일. 유틸리티 클래스 및 테마를 정의합니다.
-   `tsconfig.json`: TypeScript 설정 파일. 컴파일러 옵션 및 프로젝트 구조를 정의합니다.

### 6.2. `.github/` (GitHub Actions 워크플로우)

-   `workflows/`: GitHub Actions 워크플로우 정의 파일들이 포함됩니다.
    -   `lint.yml`: 코드 린팅을 위한 CI/CD 워크플로우.
    -   `playwright.yml`: Playwright 테스트 실행을 위한 CI/CD 워크플로우.

### 6.3. `app/` (Next.js App Router)

-   `favicon.ico`: 웹사이트 파비콘.
-   `globals.css`: 전역 CSS 스타일.
-   `layout.tsx`: 전역 레이아웃 컴포넌트. 모든 페이지에 적용되는 UI를 정의합니다.
-   `(auth)/`: 인증 관련 라우트 그룹.
    -   `actions.ts`: 인증 관련 Server Actions. (예: 로그인, 회원가입 처리)
    -   `auth.config.ts`: NextAuth.js 인증 설정.
    -   `auth.ts`: NextAuth.js 인증 로직.
    -   `api/auth/`: 인증 관련 API 라우트.
        -   `guest/route.ts`: 게스트 사용자 인증 API.
        -   `[...nextauth]/route.ts`: NextAuth.js 콜백 라우트.
    -   `login/page.tsx`: 로그인 페이지 UI.
    -   `register/page.tsx`: 회원가입 페이지 UI.
-   `(chat)/`: 메인 채팅 기능 관련 라우트 그룹.
    -   `actions.ts`: 채팅 관련 Server Actions.
    -   `layout.tsx`: 채팅 페이지 레이아웃.
    -   `opengraph-image.png`: Open Graph 이미지.
    -   `page.tsx`: 메인 채팅 페이지 UI.
    -   `twitter-image.png`: Twitter 카드 이미지.
    -   `api/`: 채팅 관련 API 라우트.
        -   `chat/`: 채팅 메시지 관련 API.
            -   `schema.ts`: 채팅 메시지 스키마 정의.
            -   `route.ts`: 채팅 메시지 처리 API.
            -   `[id]/stream/route.ts`: 채팅 스트림 API.
        -   `document/route.ts`: 문서 관련 API.
        -   `files/upload/route.ts`: 파일 업로드 API.
        -   `history/route.ts`: 채팅 기록 관련 API.
        -   `suggestions/route.ts`: 제안 관련 API.
        -   `vote/route.ts`: 메시지 투표 관련 API.
    -   `chat/[id]/page.tsx`: 특정 채팅방 페이지.
-   `projects/`: 프로젝트 관리 관련 라우트 그룹.
    -   `actions.ts`: 프로젝트 생성, 조회 등 프로젝트 관련 Server Actions.
    -   `page.tsx`: 프로젝트 목록 및 생성 UI.
    -   `[id]/`: 특정 프로젝트 관련 라우트 그룹.
        -   `page.tsx`: 개별 프로젝트 상세 페이지.
        -   `chat-room/page.tsx`: 팀 채팅방 페이지 (플레이스홀더).
        -   `dashboard/page.tsx`: AI 역할 추천 대시보드 페이지.
        -   `survey/`: 팀원 설문 관련 라우트 그룹.
            -   `actions.ts`: 설문 응답 저장 Server Action.
            -   `page.tsx`: 팀원 설문 UI.

### 6.4. `artifacts/` (아티팩트 관련)

-   `actions.ts`: 아티팩트 관련 Server Actions.
-   `code/`: 코드 아티팩트.
    -   `client.tsx`: 클라이언트 측 코드 아티팩트 컴포넌트.
    -   `server.ts`: 서버 측 코드 아티팩트 로직.
-   `image/`: 이미지 아티팩트.
    -   `client.tsx`: 클라이언트 측 이미지 아티팩트 컴포넌트.
    -   `server.ts`: 서버 측 이미지 아티팩트 로직.
-   `sheet/`: 스프레드시트 아티팩트.
    -   `client.tsx`: 클라이언트 측 스프레드시트 아티팩트 컴포넌트.
    -   `server.ts`: 서버 측 스프레드시트 아티팩트 로직.
-   `text/`: 텍스트 아티팩트.
    -   `client.tsx`: 클라이언트 측 텍스트 아티팩트 컴포넌트.
    -   `server.ts`: 서버 측 텍스트 아티팩트 로직.

### 6.5. `components/` (재사용 가능한 UI 컴포넌트)

-   `app-sidebar.tsx`: 애플리케이션 사이드바.
-   `artifact-actions.tsx`: 아티팩트 액션 버튼.
-   `artifact-close-button.tsx`: 아티팩트 닫기 버튼.
-   `artifact-messages.tsx`: 아티팩트 메시지 표시.
-   `artifact.tsx`: 아티팩트 컨테이너.
-   `auth-form.tsx`: 인증 폼.
-   `chat-header.tsx`: 채팅 헤더.
-   `chat.tsx`: 채팅 UI의 메인 컴포넌트.
-   `code-block.tsx`: 코드 블록 표시.
-   `code-editor.tsx`: 코드 에디터.
-   `console.tsx`: 콘솔 출력.
-   `create-artifact.tsx`: 아티팩트 생성 버튼.
-   `data-stream-handler.tsx`: 데이터 스트림 핸들러.
-   `data-stream-provider.tsx`: 데이터 스트림 프로바이더.
-   `diffview.tsx`: 코드/텍스트 차이점 뷰어.
-   `document-preview.tsx`: 문서 미리보기.
-   `document-skeleton.tsx`: 문서 로딩 스켈레톤.
-   `document.tsx`: ��서 컨테이너.
-   `greeting.tsx`: 초기 인사말 및 프로젝트 생성 버튼.
-   `icons.tsx`: 사용자 정의 아이콘.
-   `image-editor.tsx`: 이미지 에디터.
-   `markdown.tsx`: 마크다운 렌더러.
-   `message-actions.tsx`: 메시지 액션 버튼.
-   `message-editor.tsx`: 메시지 에디터.
-   `message-reasoning.tsx`: 메시지 추론 표시.
-   `message.tsx`: 단일 메시지 컴포넌트.
-   `messages.tsx`: 메시지 목록 컴포넌트.
-   `model-selector.tsx`: AI 모델 선택기.
-   `multimodal-input.tsx`: 멀티모달 입력 필드.
-   `preview-attachment.tsx`: 첨부 파일 미리보기.
-   `sheet-editor.tsx`: 스프레드시트 에디터.
-   `sidebar-history-item.tsx`: 사이드바 채팅 기록 항목.
-   `sidebar-history.tsx`: 사이드바 채팅 기록 목록.
-   `sidebar-toggle.tsx`: 사이드바 토글 버튼.
-   `sidebar-user-nav.tsx`: 사이드바 사용자 네비게이션.
-   `sign-out-form.tsx`: 로그아웃 폼.
-   `submit-button.tsx`: 제출 버튼.
-   `suggested-actions.tsx`: 제안된 액션 버튼.
-   `suggestion.tsx`: 제안 표시.
-   `text-editor.tsx`: 텍스트 에디터.
-   `theme-provider.tsx`: 테마 프로바이더.
-   `toast.tsx`: 토스트 알림.
-   `toolbar.tsx`: 툴바.
-   `version-footer.tsx`: 버전 푸터.
-   `visibility-selector.tsx`: 가시성 선택기.
-   `weather.tsx`: 날씨 정보 표시 (예시).
-   `ui/`: `shadcn/ui` 컴포넌트들.
    -   `alert-dialog.tsx`: 경고 대화 상자.
    -   `button.tsx`: 버튼.
    -   `card.tsx`: 카드.
    -   `dropdown-menu.tsx`: 드롭다운 메뉴.
    -   `input.tsx`: 입력 필드.
    -   `label.tsx`: 라벨.
    -   `select.tsx`: 선택 필드.
    -   `separator.tsx`: 구분선.
    -   `sheet.tsx`: 시트 (사이드 패널).
    -   `skeleton.tsx`: 로딩 스켈레톤.
    -   `textarea.tsx`: 텍스트 영역.
    -   `tooltip.tsx`: 툴팁.

### 6.6. `hooks/` (커스텀 React Hooks)

-   `use-artifact.ts`: 아티팩트 관련 커스텀 훅.
-   `use-auto-resume.ts`: 자동 재개 관련 커스텀 훅.
-   `use-chat-visibility.ts`: 채팅 가시성 관련 커스텀 훅.
-   `use-messages.tsx`: 메시지 관련 커스텀 훅.
-   `use-mobile.tsx`: 모바일 상태 감지 커스텀 훅.
-   `use-scroll-to-bottom.tsx`: 스크롤을 하단으로 이동시키는 커스텀 훅.

### 6.7. `lib/` (라이브러리 및 유틸리티)

-   `constants.ts`: 전역 상수 정의.
-   `errors.ts`: 사용자 정의 오류 클래스.
-   `types.ts`: 전역 타입 정의.
-   `utils.ts`: 일반 유틸리티 함수.
-   `ai/`: AI 관련 로직.
    -   `entitlements.ts`: AI 기능 권한 관리.
    -   `models.test.ts`: AI 모델 테스트.
    -   `models.ts`: AI 모델 정의.
    -   `prompts.ts`: AI 프롬프트 정의.
    -   `providers.ts`: AI 제공자 (Gemini 등) 연동.
    -   `tools/`: AI 도구 정의.
        -   `create-document.ts`: 문서 생성 AI 도구.
        -   `get-weather.ts`: 날씨 정보 가져오기 AI 도구.
        -   `request-suggestions.ts`: 제안 요청 AI 도구.
        -   `update-document.ts`: 문서 업데이트 AI 도구.
-   `artifacts/server.ts`: 서버 측 아티팩트 로직.
-   `db/`: 데이터베이스 관련 로직.
    -   `migrate.ts`: Drizzle ORM 마이그레이션 스크립트.
    -   `queries.ts`: 데이터베이스 쿼리 함수.
    -   `schema.ts`: Drizzle ORM 스키마 정의.
    -   `utils.ts`: 데이터베이스 유틸리티 함수.
    -   `helpers/01-core-to-parts.ts`: 데이터베이스 마이그레이션 헬퍼.
    -   `migrations/`: Drizzle ORM 마이그레이션 파일.
        -   `0000_left_magneto.sql`: 초기 마이그레이션 SQL.
        -   `0001_clear_eternals.sql`: 두 번째 마이그레이션 SQL.
        -   `meta/_journal.json`: 마이그레이션 저널.
        -   `meta/0000_snapshot.json`: 초기 스냅샷.
        -   `meta/0001_snapshot.json`: 두 번째 스냅샷.
-   `editor/`: 에디터 관련 로직.
    -   `config.ts`: 에디터 설정.
    -   `diff.js`: 차이점 계산 로직.
    -   `functions.tsx`: 에디터 함수.
    -   `react-renderer.tsx`: React 렌더러.
    -   `suggestions.tsx`: 제안 관련 로직.

### 6.8. `public/` (정적 자산)

-   `images/`: 이미지 파일.
    -   `demo-thumbnail.png`: 데모 썸네일 이미지.
    -   `mouth of the seine, monet.jpg`: 예시 이미지.

### 6.9. `tests/` (테스트 파일)

-   `e2e/`: End-to-End 테스트.
    -   `artifacts.test.ts`: 아티팩트 E2E 테스트.
    -   `chat.test.ts`: 채팅 E2E 테스트.
    -   `reasoning.test.ts`: 추론 E2E 테스트.
    -   `session.test.ts`: 세션 E2E 테스트.
-   `fixtures.ts`: 테스트 픽스처.
-   `helpers.ts`: 테스트 헬퍼 함수.
-   `pages/`: 페이지별 테스트.
    -   `artifact.ts`: 아티팩트 페이지 테스트.
    -   `auth.ts`: 인증 페이지 테스트.
    -   `chat.ts`: 채팅 페이지 테스트.
-   `prompts/`: 프롬프트 테스트.
    -   `basic.ts`: 기본 프롬프트 테스트.
    -   `routes.ts`: 라우트 프롬프트 테스트.
    -   `utils.ts`: 유틸리티 프롬프트 테스트.
-   `routes/`: 라우트 테스트.
    -   `chat.test.ts`: 채팅 라우트 테스트.
    -   `document.test.ts`: 문서 라우트 테스트.