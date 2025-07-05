✅ Next.js 15에서 params는 Promise입니다
공식 문서 예제:

tsx
복사
편집
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  …
}
중간고사도 아닌 게 넘어온 params는 Promise라 await나 use()로 처리해야 합니다.
devanddeliver.com
+10
medium.com
+10
stackoverflow.com
+10

🧭 두 가지 올바른 처리 방식
A) 서버 컴포넌트 (async/await)
tsx
복사
편집
export default async function ChatRoomPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // id로 DB 조회/렌더링
}
공식 문서의 권장 방식이고, 타입 에러 없이 빌드 통과
medium.com
+14
nextjs.org
+14
reddit.com
+14

B) 클라이언트 컴포넌트 (use(params))
tsx
복사
편집
'use client'
import { use } from 'react'

export default function ChatRoomPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  return <div>Chat Room: {id}</div>
}
use() 훅을 사용하면 Promise를 해제할 수 있음
medium.com
+11
medium.com
+11
nextjs.org
+11

⚠️ 절대 피해야 할 잘못된 접근
params를 동기 객체 형태로 선언하거나:

tsx
복사
편집
export default async function ChatRoomPage({
  params,
}: {
  params: { id: string }
}) { … }
→ 이렇게 하면 빌드 시 에러: missing Promise<any>
stackoverflow.com
+3
stackoverflow.com
+3
medium.com
+3

React.use(params) 같은 잘못된 패턴도 절대 사용하지 말아야 합니다.

✅ 요약: “내 AI”용 정리 프롬프트
md
복사
편집
Next.js 15+ 기준:
- params는 `Promise<{ id: string }>` 타입입니다.

app/projects/[id]/chat-room/page.tsx 파일을 아래처럼 수정하세요:

```tsx
export default async function ChatRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // id 활용 코드
}
또는 클라이언트 컴포넌트로 전환하려면:

tsx
복사
편집
'use client';
import { use } from 'react';

export default function ChatRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (JSX...);
}
❌ 금지 항목:

params: { id: string } (동기 타입)

React.use(params)

PageProps, Promise<any> 등의 잘못된 타입

Promise 금지 경고는 무시하세요.``

yaml
복사
편집
