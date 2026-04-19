import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { DashboardDeadlineBadge } from "./dashboard-deadline-badge";
import type {
  DashboardRecentEventViewData,
  DashboardRecentScoutViewData,
  DashboardRecentTaskViewData,
  DashboardViewData,
} from "./dashboard.vd";

type DashboardSidebarProps = {
  dashboard: DashboardViewData;
};

type RecentTaskListProps = {
  task: DashboardRecentTaskViewData;
};

type RecentEventListProps = {
  event: DashboardRecentEventViewData;
};

type RecentScoutListProps = {
  scout: DashboardRecentScoutViewData;
};

const hoverReadableBadgeClass =
  "transition-colors group-hover:border-primary-foreground/60 group-hover:bg-primary-foreground/15 group-hover:text-primary-foreground";

function RecentTask({ task }: RecentTaskListProps) {
  return (
    <Card className="group border border-border/70 bg-card/90 transition-colors hover:border-primary hover:bg-linear-to-br hover:from-primary hover:to-chart-3 hover:text-primary-foreground">
      <CardHeader>
        <CardTitle>直近のタスク</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={hoverReadableBadgeClass}>
              {task.taskType}
            </Badge>
            <DashboardDeadlineBadge
              tone={task.deadlineTone}
              label={task.dueLabel}
              className={hoverReadableBadgeClass}
            />
          </div>
          <p className="font-medium">{task.companyName}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="transition-colors group-hover:border-primary-foreground/60 group-hover:bg-primary-foreground group-hover:text-primary"
          aria-label={task.navigationLabel}
          disabled
        >
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </Button>
      </CardContent>
    </Card>
  );
}

function RecentEvent({ event }: RecentEventListProps) {
  return (
    <Card className="group border border-border/70 bg-card/90 transition-colors hover:border-primary hover:bg-linear-to-br hover:from-primary hover:to-chart-3 hover:text-primary-foreground">
      <CardHeader>
        <CardTitle>直近のイベント</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={hoverReadableBadgeClass}>
              {event.eventType}
            </Badge>
            <DashboardDeadlineBadge
              tone={event.deadlineTone}
              label={event.eventDateLabel}
              className={hoverReadableBadgeClass}
            />
          </div>
          <p className="font-medium">{event.companyName ?? "企業未設定"}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="transition-colors group-hover:border-primary-foreground/60 group-hover:bg-primary-foreground group-hover:text-primary"
          aria-label={event.navigationLabel}
          disabled
        >
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </Button>
      </CardContent>
    </Card>
  );
}

function RecentScout({ scout }: RecentScoutListProps) {
  return (
    <Card className="group border border-border/70 bg-card/90 transition-colors hover:border-primary hover:bg-linear-to-br hover:from-primary hover:to-chart-3 hover:text-primary-foreground">
      <CardHeader>
        <CardTitle>直近のスカウト</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={hoverReadableBadgeClass}>
              {scout.scoutType}
            </Badge>
            <Badge variant="secondary" className={hoverReadableBadgeClass}>
              {scout.serviceName}
            </Badge>
          </div>
          <p className="font-medium">{scout.companyName}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="transition-colors group-hover:border-primary-foreground/60 group-hover:bg-primary-foreground group-hover:text-primary"
          aria-label={scout.navigationLabel}
          disabled
        >
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </Button>
      </CardContent>
    </Card>
  );
}

export function DashboardSidebar({ dashboard }: DashboardSidebarProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <RecentTask task={dashboard.recentTask} />
      <RecentEvent event={dashboard.recentEvent} />
      <RecentScout scout={dashboard.recentScout} />
    </section>
  );
}
