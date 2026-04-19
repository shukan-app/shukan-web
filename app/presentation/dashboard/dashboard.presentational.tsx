import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import { DashboardHero } from "./dashboard-hero";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardSummaryCards } from "./dashboard-summary-cards";
import type { DashboardViewData } from "./dashboard.vd";

type DashboardPresentationalProps = {
  dashboard: DashboardViewData;
};

export function DashboardPresentational({ dashboard }: DashboardPresentationalProps) {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHero dashboard={dashboard} />
      <DashboardSummaryCards cards={dashboard.summaryCards} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card
          size="sm"
          className="group border border-destructive/70 bg-destructive/10 text-destructive transition-colors hover:bg-linear-to-br hover:from-destructive hover:to-chart-5 hover:text-primary-foreground"
        >
          <CardHeader className="gap-3">
            <CardDescription className="text-destructive transition-colors group-hover:text-primary-foreground/80">
              要対応アラート
            </CardDescription>
            <CardTitle className="text-4xl font-semibold sm:text-5xl">{dashboard.alerts.length}件</CardTitle>
          </CardHeader>
        </Card>
      </section>

      <DashboardSidebar dashboard={dashboard} />
    </div>
  );
}
