import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import type { DashboardViewData } from "./dashboard.vd";

type DashboardHeroProps = {
  dashboard: DashboardViewData;
};

export function DashboardHero({ dashboard }: DashboardHeroProps) {
  return (
    <Card className="border border-border/70 bg-background/85">
      <CardHeader>
        <CardTitle>{dashboard.title}</CardTitle>
        <CardDescription>{dashboard.description}</CardDescription>
      </CardHeader>
      <CardFooter className="border-t border-border/70">
        <p className="text-xs text-muted-foreground">{dashboard.lastUpdatedLabel}</p>
      </CardFooter>
    </Card>
  );
}
