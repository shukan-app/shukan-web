import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Label, PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import type { DashboardViewData } from "./dashboard.vd";

type DashboardSummaryCardsProps = {
  cards: DashboardViewData["summaryCards"];
};

type TaskCompletionRateChartProps = {
  value: number;
  label: string;
};

function TaskCompletionRateChart({ value, label }: TaskCompletionRateChartProps) {
  const chartData = [{ name: label, value, fill: "currentColor" }];

  return (
    <div className="relative mx-auto size-36 text-primary transition-colors group-hover:text-primary-foreground">
      <RadialBarChart
        accessibilityLayer
        data={chartData}
        endAngle={360}
        innerRadius={54}
        outerRadius={68}
        startAngle={0}
        width={144}
        height={144}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          allowDataOverflow
          tick={false}
          tickLine={false}
          axisLine={false}
        />
        <PolarGrid gridType="circle" radialLines={false} stroke="none" polarRadius={[54, 48]} />
        <RadialBar dataKey="value" background cornerRadius={8} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                return null;
              }

              return (
                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy}
                    className="fill-foreground text-3xl font-semibold transition-colors group-hover:fill-primary-foreground"
                  >
                    {value}%
                  </tspan>
                </text>
              );
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </div>
  );
}

export function DashboardSummaryCards({ cards }: DashboardSummaryCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.id}
          size="sm"
          className="group border border-border/70 bg-card/90 transition-colors hover:border-primary hover:bg-linear-to-br hover:from-primary hover:to-chart-3 hover:text-primary-foreground"
        >
          <CardHeader className="gap-3">
            <CardDescription className="transition-colors group-hover:text-primary-foreground/80">
              {card.label}
            </CardDescription>
            {card.kind === "value" ? (
              <CardTitle className="text-4xl font-semibold sm:text-5xl">{card.value}</CardTitle>
            ) : (
              <TaskCompletionRateChart value={card.completionRate} label={card.label} />
            )}
          </CardHeader>
          <CardFooter className="justify-end">
            {card.navigationLabel ? (
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="transition-colors group-hover:border-primary-foreground/60 group-hover:bg-primary-foreground group-hover:text-primary"
                aria-label={card.navigationLabel}
                disabled
              >
                <HugeiconsIcon icon={ArrowRight01Icon} />
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
