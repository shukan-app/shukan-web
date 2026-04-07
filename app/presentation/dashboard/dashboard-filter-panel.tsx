import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

import type { DashboardSortOption, DashboardStatusKey, DashboardViewData, DashboardViewMode } from "./dashboard.vd";

type DashboardFilterPanelProps = {
  dashboard: DashboardViewData;
  keyword: string;
  status: DashboardStatusKey;
  sort: DashboardSortOption;
  viewMode: DashboardViewMode;
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: DashboardStatusKey) => void;
  onSortChange: (value: DashboardSortOption) => void;
  onViewModeChange: (value: DashboardViewMode) => void;
};

function getSingleValue<TValue extends string>(values: readonly string[], fallback: TValue) {
  return (values[0] as TValue | undefined) ?? fallback;
}

export function DashboardFilterPanel({
  dashboard,
  keyword,
  status,
  sort,
  viewMode,
  onKeywordChange,
  onStatusChange,
  onSortChange,
  onViewModeChange,
}: DashboardFilterPanelProps) {
  return (
    <Card className="border border-border/70 bg-background/85 backdrop-blur">
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-2">
          <CardTitle>企業ダッシュボード</CardTitle>
          <CardDescription>検索、絞り込み、表示切り替えをすべてローカル状態で確認できます。</CardDescription>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            aria-label="企業名または職種名で検索"
            placeholder="企業名・職種名で検索"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
          />
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3">
              <ToggleGroup
                aria-label="ステータスで絞り込み"
                className="w-full flex-wrap"
                variant="outline"
                value={[status]}
                onValueChange={(values) => onStatusChange(getSingleValue(values, status))}
              >
                {dashboard.statusOptions.map((option) => (
                  <ToggleGroupItem key={option.value} value={option.value}>
                    {option.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <ToggleGroup
                aria-label="期限順で並び替え"
                className="w-full flex-wrap"
                variant="outline"
                value={[sort]}
                onValueChange={(values) => onSortChange(getSingleValue(values, sort))}
              >
                {dashboard.sortOptions.map((option) => (
                  <ToggleGroupItem key={option.value} value={option.value}>
                    {option.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <ToggleGroup
              aria-label="表示形式を切り替え"
              variant="outline"
              value={[viewMode]}
              onValueChange={(values) => onViewModeChange(getSingleValue(values, viewMode))}
            >
              {dashboard.viewModeOptions.map((option) => (
                <ToggleGroupItem key={option.value} value={option.value}>
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
