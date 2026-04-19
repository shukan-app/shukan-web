import { DashboardPresentational } from "./dashboard.presentational";
import { dashboardViewData } from "./dashboard.vd";

export function DashboardContainer() {
  return <DashboardPresentational dashboard={dashboardViewData} />;
}
