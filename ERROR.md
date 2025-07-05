Run pnpm lint

> ai-chatbot@3.1.0 lint /home/runner/work/team_sync_ai/team_sync_ai
> next lint && biome lint --write --unsafe

Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry


./app/(auth)/login/page.tsx
45:6  Warning: React Hook useEffect has missing dependencies: 'router' and 'updateSession'. Either include them or remove the dependency array.  react-hooks/exhaustive-deps

./app/(auth)/register/page.tsx
46:6  Warning: React Hook useEffect has missing dependencies: 'router' and 'updateSession'. Either include them or remove the dependency array.  react-hooks/exhaustive-deps

./app/projects/[id]/chat-room/page.tsx
13:30  Error: 'use' not found in imported namespace 'React'.  import/namespace

./app/projects/[id]/dashboard/page.tsx
26:30  Error: 'use' not found in imported namespace 'React'.  import/namespace

./app/projects/[id]/survey/page.tsx
10:23  Error: Unable to resolve path to module '@/components/ui/toast'.  import/no-unresolved
11:36  Warning: '/home/runner/work/team_sync_ai/team_sync_ai/app/projects/[id]/survey/actions.ts' imported multiple times.  import/no-duplicates
12:36  Warning: '/home/runner/work/team_sync_ai/team_sync_ai/app/projects/[id]/survey/actions.ts' imported multiple times.  import/no-duplicates

info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
 ELIFECYCLE  Command failed with exit code 1.
Error: Process completed with exit code 1.


ChatGPT의 말:
🚨 lint 결과 및 에러/워닝 요약
에러 (코드 실행 중단!)
'use' not found in imported namespace 'React'.

React.use() 사용 시
→ Next.js 15+에서만 지원
→ 보통 import React from "react" 또는
import * as React from "react" 형태에서
use를 쓸 수 있지만,
버전/설정에 따라 지원 안 됨

Unable to resolve path to module '@/components/ui/toast'.

해당 경로에 toast 모듈 없음

파일명, 경로, 확장자 .tsx 등 오타 또는 실제 파일 존재 안 함

경고
React Hook useEffect has missing dependencies:
router, updateSession 등
→ useEffect의 의존성 배열에 해당 값 넣으라는 경고

import/no-duplicates:
같은 모듈을 여러 번 import

즉시 수정 가이드
1. 'React.use' 관련
diff
복사
편집
- const params = React.use(paramsPromise); // ❌
+ // 아래 둘 중 하나로 변경
+ // (1) 서버 컴포넌트라면 props로 params 받기
  export default function Page({ params }: { params: { id: string } }) { ... }

+ // (2) 클라이언트 컴포넌트에서 useParams() 등 사용
  import { useParams } from "next/navigation";
  const params = useParams();
React.use() 사용 금지! (대부분 환경에서 지원X)

SSR에서는 props로 전달

CSR에서는 useParams 훅 사용

2. toast import 경로 확인
@/components/ui/toast
→ 실제 toast.tsx 또는 toast/index.tsx 파일이 있는지 확인
→ 파일 없으면 경로 수정/파일 생성/불필요하면 코드에서 삭제

3. useEffect deps 경고
diff
복사
편집
useEffect(() => {
  // ...
- }, []); // <- 잘못된 예시
+ }, [router, updateSession]); // <- 올바른 예시
useEffect 내부에서 사용하는 변수, 함수는 의존성 배열에 추가!

4. import/no-duplicates
같은 파일 여러 번 import하지 않게 정리

실전 예시: 에러 2가지 수정
(1) React.use → useParams 대체
tsx
복사
편집
// ❌ (에러 발생 예시)
import React from "react";
const params = React.use(paramsPromise);

// ✅ (CSR)
import { useParams } from "next/navigation";
const params = useParams();

// ✅ (SSR)
export default function Page({ params }: { params: { id: string } }) {
  // params.id 사용
}
(2) toast import 경로 점검
tsx
복사
편집
// ❌ 잘못된 경로
import { toast } from "@/components/ui/toast";

// ✅ 올바른 경로로 고치거나, 파일 생성/이동
// 실제 파일 위치와 일치해야 함
