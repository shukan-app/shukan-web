import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

import { DashboardDeadlineBadge } from "./dashboard-deadline-badge";
import { DashboardStatusBadge } from "./dashboard-status-badge";
import type { DashboardCompanyViewData } from "./dashboard.vd";

type DashboardCompanyCardsProps = {
  companies: DashboardCompanyViewData[];
};

export function DashboardCompanyCards({ companies }: DashboardCompanyCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {companies.map((company) => (
        <Card key={company.id} className="border border-border/70 bg-card/90 backdrop-blur">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <CardTitle>{company.companyName}</CardTitle>
                <CardDescription>{company.title}</CardDescription>
              </div>
              <DashboardStatusBadge status={company.statusKey} label={company.statusLabel} />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{company.progressLabel}</Badge>
              <DashboardDeadlineBadge tone={company.deadlineTone} label={company.nextDeadlineLabel} />
              {company.aiTaskCount > 0 ? <Badge variant="secondary">AI {company.aiTaskCount}件</Badge> : null}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-muted/60 p-4">
                <p className="text-xs text-muted-foreground">未完了タスク</p>
                <p className="mt-2 text-2xl font-semibold">{company.pendingTaskCount}</p>
              </div>
              <div className="rounded-3xl bg-muted/60 p-4">
                <p className="text-xs text-muted-foreground">現在地</p>
                <p className="mt-2 text-base font-medium">{company.statusDescription}</p>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <p className="text-sm">{company.note}</p>
              <div className="flex flex-wrap gap-2">
                {company.tags.map((tag) => (
                  <Badge key={tag} variant="ghost">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t border-border/70">
            <p className="text-xs text-muted-foreground">{company.updatedAtLabel}</p>
            <Button type="button" variant="outline" size="sm">
              企業情報を編集
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
