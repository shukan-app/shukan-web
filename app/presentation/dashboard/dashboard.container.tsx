import { DashboardPresentational } from "./dashboard.presentational";
import { dashboardViewData } from "./dashboard.vd";
import { useDashboardState } from "./dashboard.hook";

export function DashboardContainer() {
  const state = useDashboardState(dashboardViewData);

  return <DashboardPresentational dashboard={dashboardViewData} {...state} />;
}
