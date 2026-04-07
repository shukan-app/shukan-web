import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import type { DashboardViewData } from "./dashboard.vd";

type DashboardSummaryCardsProps = {
  cards: DashboardViewData["summaryCards"];
};

export function DashboardSummaryCards({ cards }: DashboardSummaryCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.id} size="sm" className="border border-border/70 bg-card/90 backdrop-blur">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle>{card.value}</CardTitle>
          </CardHeader>
          <CardFooter className="border-t border-border/70">
            <p className="text-xs text-muted-foreground">{card.note}</p>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
