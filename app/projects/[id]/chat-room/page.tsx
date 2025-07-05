// app/projects/[id]/chat-room/page.tsx

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

type Props = {
  params: { id: string };
};

export default async function ChatRoomPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background px-4 py-12">
      <div className="w-full max-w-xl">
        <Card className="w-full border shadow-sm mb-8">
          <CardContent className="py-8 px-6">
            <h1 className="text-2xl font-bold mb-2 text-foreground">
              팀 채팅방 (프로젝트 ID: <span className="font-mono">{params.id}</span>)
            </h1>
            <p className="text-muted-foreground mb-6">
              실시간 채팅 기능은 추후 구현됩니다.
            </p>
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-muted text-muted-foreground text-center">
                [채팅 메시지 리스트 플레이스홀더]
              </div>
              <div className="flex gap-2">
                <Input
                  className="flex-1"
                  placeholder="메시지를 입력하세요 (미구현)"
                  disabled
                />
                <Button disabled>전송</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
