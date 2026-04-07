import { Badge } from "~/components/ui/badge";

import type { DashboardDeadlineTone } from "./dashboard.vd";

type DashboardDeadlineBadgeProps = {
  tone: DashboardDeadlineTone;
  label: string;
};

function getDeadlineBadgeVariant(deadlineTone: DashboardDeadlineTone) {
  switch (deadlineTone) {
    case "urgent":
      return "destructive";
    case "soon":
      return "secondary";
    case "normal":
      return "outline";
    case "none":
      return "ghost";
  }
}

export function DashboardDeadlineBadge({ tone, label }: DashboardDeadlineBadgeProps) {
  return <Badge variant={getDeadlineBadgeVariant(tone)}>{label}</Badge>;
}
