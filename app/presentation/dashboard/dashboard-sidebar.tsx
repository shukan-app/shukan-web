import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

import { DashboardDeadlineBadge } from "./dashboard-deadline-badge";
import type { DashboardViewData } from "./dashboard.vd";

type DashboardSidebarProps = {
  dashboard: DashboardViewData;
};

export function DashboardSidebar({ dashboard }: DashboardSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border border-border/70 bg-card/90 backdrop-blur">
        <CardHeader>
          <CardTitle>直近タスク</CardTitle>
          <CardDescription>期限が近い順に並べています。</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {dashboard.urgentTasks.map((task, index) => (
            <div key={task.id} className="flex flex-col gap-4">
              {index > 0 ? <Separator /> : null}
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <DashboardDeadlineBadge tone={task.deadlineTone} label={task.dueLabel} />
                  {task.isAiGenerated ? <Badge variant="secondary">AI</Badge> : <Badge variant="outline">手動</Badge>}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.companyName}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="border-t border-border/70">
          <Button type="button" variant="outline" className="w-full">
            すべてのタスクを見る
          </Button>
        </CardFooter>
      </Card>

      <Card className="border border-border/70 bg-card/90 backdrop-blur">
        <CardHeader>
          <CardTitle>画面の意図</CardTitle>
          <CardDescription>Phase 1 では UI モックとして、意思決定しやすい導線を優先しています。</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
          <p>企業一覧はカードとリストを即時に切り替え可能です。</p>
          <p>期限は未完了タスクのうち最も近いものを想定して表示しています。</p>
          <p>AI抽出タスクと手動追加タスクが識別できるよう、バッジで差を付けています。</p>
        </CardContent>
      </Card>
    </div>
  );
}
