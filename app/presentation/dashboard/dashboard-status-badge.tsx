import { Badge } from "~/components/ui/badge";

import type { DashboardStatusKey } from "./dashboard.vd";

type DashboardStatusBadgeProps = {
  status: DashboardStatusKey;
  label: string;
};

function getStatusBadgeVariant(status: DashboardStatusKey) {
  switch (status) {
    case "needs-action":
      return "destructive";
    case "interviewing":
      return "default";
    case "offer":
      return "secondary";
    case "waiting":
    case "all":
      return "outline";
  }
}

export function DashboardStatusBadge({ status, label }: DashboardStatusBadgeProps) {
  return <Badge variant={getStatusBadgeVariant(status)}>{label}</Badge>;
}
