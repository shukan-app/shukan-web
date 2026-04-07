import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

import type {
  DashboardCompanyViewData,
  DashboardDeadlineTone,
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

function getSingleValue<TValue extends string>(values: readonly string[], fallback: TValue) {
  return (values[0] as TValue | undefined) ?? fallback;
}

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

function CompanyCards({ companies }: { companies: DashboardCompanyViewData[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {companies.map((company) => (
        <Card key={company.id} className="border border-border/70 bg-card/90 backdrop-blur">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <CardTitle>{company.companyName}</CardTitle>
                <CardDescription>{company.title}</CardDescription>
              </div>
              <Badge variant={getStatusBadgeVariant(company.statusKey)}>{company.statusLabel}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{company.progressLabel}</Badge>
              <Badge variant={getDeadlineBadgeVariant(company.deadlineTone)}>{company.nextDeadlineLabel}</Badge>
              {company.aiTaskCount > 0 ? <Badge variant="secondary">AI {company.aiTaskCount}件</Badge> : null}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-muted/60 p-4">
                <p className="text-xs text-muted-foreground">未完了タスク</p>
                <p className="mt-2 text-2xl font-semibold">{company.pendingTaskCount}</p>
              </div>
              <div className="rounded-3xl bg-muted/60 p-4">
                <p className="text-xs text-muted-foreground">現在地</p>
                <p className="mt-2 text-base font-medium">{company.statusDescription}</p>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <p className="text-sm">{company.note}</p>
              <div className="flex flex-wrap gap-2">
                {company.tags.map((tag) => (
                  <Badge key={tag} variant="ghost">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t border-border/70">
            <p className="text-xs text-muted-foreground">{company.updatedAtLabel}</p>
            <Button type="button" variant="outline" size="sm">
              企業情報を編集
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function CompanyList({ companies }: { companies: DashboardCompanyViewData[] }) {
  return (
    <Card className="border border-border/70 bg-card/90 backdrop-blur">
      <CardHeader>
        <CardTitle>企業一覧</CardTitle>
        <CardDescription>期限とステータスを横断して確認できます。</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {companies.map((company, index) => (
          <div key={company.id} className="flex flex-col gap-4">
            {index > 0 ? <Separator /> : null}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{company.companyName}</p>
                  <Badge variant={getStatusBadgeVariant(company.statusKey)}>{company.statusLabel}</Badge>
                  <Badge variant="outline">{company.progressLabel}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {company.title} / {company.statusDescription}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                <Badge variant={getDeadlineBadgeVariant(company.deadlineTone)}>{company.nextDeadlineLabel}</Badge>
                {company.aiTaskCount > 0 ? <Badge variant="secondary">AI {company.aiTaskCount}件</Badge> : null}
                <Badge variant="ghost">未完了 {company.pendingTaskCount}件</Badge>
              </div>
            </div>
            <p className="text-sm">{company.note}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

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
        <Card className="border border-border/70 bg-background/85 backdrop-blur">
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex max-w-3xl flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Dashboard</Badge>
                  <Badge variant="outline">Phase 1 Mock</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  <CardTitle>Shukan Dashboard</CardTitle>
                  <p className="font-heading text-3xl leading-tight font-semibold sm:text-4xl">
                    今やるべき就活タスクを、ひと目で整理。
                  </p>
                  <CardDescription>
                    Gmail から抽出した企業情報を前提に、期限が近い企業と未処理タスクを優先表示するダッシュボードです。
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline">
                  企業を手動追加
                </Button>
                <Button type="button">Gmail を再同期</Button>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="justify-between border-t border-border/70">
            <p className="text-xs text-muted-foreground">{dashboard.generatedAtLabel}</p>
            <p className="text-xs text-muted-foreground">
              表示件数 {visibleCompanyCount} / {dashboard.companies.length}
            </p>
          </CardFooter>
        </Card>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboard.summaryCards.map((card) => (
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

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="flex flex-col gap-6">
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

            {visibleCompanies.length > 0 ? (
              viewMode === "card" ? (
                <CompanyCards companies={visibleCompanies} />
              ) : (
                <CompanyList companies={visibleCompanies} />
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

          <div className="flex flex-col gap-6">
            <Card className="border border-border/70 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle>直近タスク</CardTitle>
                <CardDescription>期限が近い順に並べています。</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {dashboard.urgentTasks.map((task, index) => (
                  <div key={task.id} className="flex flex-col gap-4">
                    {index > 0 ? <Separator /> : null}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={getDeadlineBadgeVariant(task.deadlineTone)}>{task.dueLabel}</Badge>
                        {task.isAiGenerated ? (
                          <Badge variant="secondary">AI</Badge>
                        ) : (
                          <Badge variant="outline">手動</Badge>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.companyName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="border-t border-border/70">
                <Button type="button" variant="outline" className="w-full">
                  すべてのタスクを見る
                </Button>
              </CardFooter>
            </Card>

            <Card className="border border-border/70 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle>画面の意図</CardTitle>
                <CardDescription>Phase 1 では UI モックとして、意思決定しやすい導線を優先しています。</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
                <p>企業一覧はカードとリストを即時に切り替え可能です。</p>
                <p>期限は未完了タスクのうち最も近いものを想定して表示しています。</p>
                <p>AI抽出タスクと手動追加タスクが識別できるよう、バッジで差を付けています。</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
