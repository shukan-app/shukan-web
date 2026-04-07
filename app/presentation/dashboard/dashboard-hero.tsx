import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import type { DashboardViewData } from "./dashboard.vd";

type DashboardHeroProps = {
  dashboard: DashboardViewData;
  visibleCompanyCount: number;
};

export function DashboardHero({ dashboard, visibleCompanyCount }: DashboardHeroProps) {
  return (
    <Card className="border border-border/70 bg-background/85 backdrop-blur">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex max-w-3xl flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Dashboard</Badge>
              <Badge variant="outline">Phase 1 Mock</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <CardTitle>Shukan Dashboard</CardTitle>
              <p className="font-heading text-3xl leading-tight font-semibold sm:text-4xl">
                今やるべき就活タスクを、ひと目で整理。
              </p>
              <CardDescription>
                Gmail から抽出した企業情報を前提に、期限が近い企業と未処理タスクを優先表示するダッシュボードです。
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline">
              企業を手動追加
            </Button>
            <Button type="button">Gmail を再同期</Button>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="justify-between border-t border-border/70">
        <p className="text-xs text-muted-foreground">{dashboard.generatedAtLabel}</p>
        <p className="text-xs text-muted-foreground">
          表示件数 {visibleCompanyCount} / {dashboard.companies.length}
        </p>
      </CardFooter>
    </Card>
  );
}
