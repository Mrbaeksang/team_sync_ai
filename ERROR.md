# [Next.js 15 동적 라우트 params 타입 점검 요청]

아래 조건에 따라, 내 프로젝트 전체에서 동적 라우트([id] 등) page.tsx 파일이 올바르게 수정되었는지 자동으로 점검해줘.

**점검 기준:**
1. 각 파일의 page 컴포넌트 시그니처가 반드시 아래와 같아야 한다.
   - `export default async function Page({ params }: { params: Promise<{ id: string }> }) { ... }`
2. 함수 내부에서 params를 바로 사용하지 않고 반드시
   - `const { id } = await params;` 처럼 **await params**로 값을 추출해야 함.
3. 예전 방식(`params: { id: string }`, `React.use(params)` 등)은 남아있으면 안 됨.

**점검 방법:**
- app/ 이하 모든 동적 라우트(`[id]` 등) page.tsx 파일을 탐색해서,
  위 1~3번 기준을 만족하지 않는 파일명을 전부 알려줘.
- 이미 올바르게 수정된 파일은 "OK" 표시.
- 문제 있는 파일은 "수정 필요"와 함께 이유, 예시 코드까지 출력.
- 추가로, 자동 일괄 수정 커맨드(예: sed, codemod) 제안도 해줘.

**(내 프로젝트 루트: ./app)**

