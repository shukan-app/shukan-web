import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

import { DashboardDeadlineBadge } from "./dashboard-deadline-badge";
import { DashboardStatusBadge } from "./dashboard-status-badge";
import type { DashboardCompanyViewData } from "./dashboard.vd";

type DashboardCompanyListProps = {
  companies: DashboardCompanyViewData[];
};

export function DashboardCompanyList({ companies }: DashboardCompanyListProps) {
  return (
    <Card className="border border-border/70 bg-card/90 backdrop-blur">
      <CardHeader>
        <CardTitle>企業一覧</CardTitle>
        <CardDescription>期限とステータスを横断して確認できます。</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {companies.map((company, index) => (
          <div key={company.id} className="flex flex-col gap-4">
            {index > 0 ? <Separator /> : null}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{company.companyName}</p>
                  <DashboardStatusBadge status={company.statusKey} label={company.statusLabel} />
                  <Badge variant="outline">{company.progressLabel}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {company.title} / {company.statusDescription}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                <DashboardDeadlineBadge tone={company.deadlineTone} label={company.nextDeadlineLabel} />
                {company.aiTaskCount > 0 ? <Badge variant="secondary">AI {company.aiTaskCount}件</Badge> : null}
                <Badge variant="ghost">未完了 {company.pendingTaskCount}件</Badge>
              </div>
            </div>
            <p className="text-sm">{company.note}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
