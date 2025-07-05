Error: ./components/messages.tsx:2:1
Export [32mGreeting[39m doesn't exist in target module
[0m [90m 1 |[39m [36mimport[39m { [33mPreviewMessage[39m[33m,[39m [33mThinkingMessage[39m } [36mfrom[39m [32m'./message'[39m[33m;[39m[0m
[0m[31m[1m>[22m[39m[90m 2 |[39m [36mimport[39m { [33mGreeting[39m } [36mfrom[39m [32m'./greeting'[39m[33m;[39m[0m
[0m [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[0m
[0m [90m 3 |[39m [36mimport[39m { memo } [36mfrom[39m [32m'react'[39m[33m;[39m[0m
[0m [90m 4 |[39m [36mimport[39m type { [33mVote[39m } [36mfrom[39m [32m'@/lib/db/schema'[39m[33m;[39m[0m
[0m [90m 5 |[39m [36mimport[39m equal [36mfrom[39m [32m'fast-deep-equal'[39m[33m;[39m[0m

The export [32mGreeting[39m was not found in module [1m[31m[project]/components/greeting.tsx [app-client] (ecmascript)[39m[22m.
Did you mean to import [32mdefault[39m?
All exports of the module are statically known (It doesn't have dynamic exports). So it's known statically that the requested export doesn't exist.
    at BuildError (http://localhost:3000/_next/static/chunks/%5Broot-of-the-server%5D__d1e9cc7e._.js:17492:41)
    at react-stack-bottom-frame (http://localhost:3000/_next/static/chunks/cec93_react-dom_85968617._.js:12381:24)
    at renderWithHooks (http://localhost:3000/_next/static/chunks/cec93_react-dom_85968617._.js:3396:24)
    at updateFunctionComponent (http://localhost:3000/_next/static/chunks/cec93_react-dom_85968617._.js:4720:21)
    at beginWork (http://localhost:3000/_next/static/chunks/cec93_react-dom_85968617._.js:5351:24)
    at runWithFiberInDEV (http://localhost:3000/_next/static/chunks/cec93_react-dom_85968617._.js:631:20)
    at performUnitOfWork (http://localhost:3000/_next/static/chunks/cec93_react-dom_85968617._.js:7930:97)
    at workLoopSync (http://localhost:3000/_next/static/chunks/cec93_react-dom_85968617._.js:7823:40)
    at renderRootSync (http://localhost:3000/_next/static/chunks/cec93_react-dom_85968617._.js:7806:13)
    at performWorkOnRoot (http://localhost:3000/_next/static/chunks/cec93_react-dom_85968617._.js:7547:175)
    at performWorkOnRootViaSchedulerTask (http://localhost:3000/_next/static/chunks/cec93_react-dom_85968617._.js:8379:9)
    at MessagePort.performWorkUntilDeadline (http://localhost:3000/_next/static/chunks/node_modules__pnpm_3346111e._.js:1490:64)