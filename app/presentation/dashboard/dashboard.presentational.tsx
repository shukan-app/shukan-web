import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

import { DashboardCompanyCards } from "./dashboard-company-cards";
import { DashboardCompanyList } from "./dashboard-company-list";
import { DashboardFilterPanel } from "./dashboard-filter-panel";
import { DashboardHero } from "./dashboard-hero";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardSummaryCards } from "./dashboard-summary-cards";
import type {
  DashboardCompanyViewData,
  DashboardSortOption,
  DashboardStatusKey,
  DashboardViewData,
  DashboardViewMode,
} from "./dashboard.vd";

type DashboardPresentationalProps = {
  dashboard: DashboardViewData;
  keyword: string;
  status: DashboardStatusKey;
  sort: DashboardSortOption;
  viewMode: DashboardViewMode;
  visibleCompanyCount: number;
  visibleCompanies: DashboardCompanyViewData[];
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: DashboardStatusKey) => void;
  onSortChange: (value: DashboardSortOption) => void;
  onViewModeChange: (value: DashboardViewMode) => void;
};

export function DashboardPresentational({
  dashboard,
  keyword,
  status,
  sort,
  viewMode,
  visibleCompanyCount,
  visibleCompanies,
  onKeywordChange,
  onStatusChange,
  onSortChange,
  onViewModeChange,
}: DashboardPresentationalProps) {
  return (
    <main className="min-h-screen bg-linear-to-b from-primary/12 via-background to-chart-1/10">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <DashboardHero dashboard={dashboard} visibleCompanyCount={visibleCompanyCount} />
        <DashboardSummaryCards cards={dashboard.summaryCards} />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="flex flex-col gap-6">
            <DashboardFilterPanel
              dashboard={dashboard}
              keyword={keyword}
              status={status}
              sort={sort}
              viewMode={viewMode}
              onKeywordChange={onKeywordChange}
              onStatusChange={onStatusChange}
              onSortChange={onSortChange}
              onViewModeChange={onViewModeChange}
            />

            {visibleCompanies.length > 0 ? (
              viewMode === "card" ? (
                <DashboardCompanyCards companies={visibleCompanies} />
              ) : (
                <DashboardCompanyList companies={visibleCompanies} />
              )
            ) : (
              <Card className="border border-dashed border-border bg-background/70">
                <CardHeader>
                  <CardTitle>該当する企業がありません</CardTitle>
                  <CardDescription>検索条件またはステータス絞り込みを調整してください。</CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>

          <DashboardSidebar dashboard={dashboard} />
        </section>
      </div>
    </main>
  );
}
