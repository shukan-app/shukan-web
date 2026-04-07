export type DashboardViewMode = "card" | "list";

export type DashboardSortOption = "deadline-asc" | "deadline-desc";

export type DashboardStatusKey = "all" | "needs-action" | "interviewing" | "waiting" | "offer";

export type DashboardDeadlineTone = "urgent" | "soon" | "normal" | "none";

export type DashboardSummaryCardViewData = {
  id: string;
  label: string;
  value: string;
  note: string;
};

export type DashboardUrgentTaskViewData = {
  id: string;
  companyName: string;
  title: string;
  dueLabel: string;
  dueDate: string;
  isAiGenerated: boolean;
  deadlineTone: DashboardDeadlineTone;
};

export type DashboardCompanyViewData = {
  id: string;
  companyName: string;
  title: string;
  statusKey: DashboardStatusKey;
  statusLabel: string;
  statusDescription: string;
  nextDeadlineLabel: string;
  nextDeadlineAt: string | null;
  deadlineTone: DashboardDeadlineTone;
  pendingTaskCount: number;
  aiTaskCount: number;
  updatedAtLabel: string;
  progressLabel: string;
  note: string;
  tags: string[];
};

export type DashboardOptionViewData<TValue extends string> = {
  value: TValue;
  label: string;
};

export type DashboardViewData = {
  generatedAtLabel: string;
  summaryCards: DashboardSummaryCardViewData[];
  urgentTasks: DashboardUrgentTaskViewData[];
  companies: DashboardCompanyViewData[];
  statusOptions: DashboardOptionViewData<DashboardStatusKey>[];
  sortOptions: DashboardOptionViewData<DashboardSortOption>[];
  viewModeOptions: DashboardOptionViewData<DashboardViewMode>[];
};

export const dashboardViewData: DashboardViewData = {
  generatedAtLabel: "2026年4月7日 13:20 時点",
  summaryCards: [
    {
      id: "active-company-count",
      label: "進行中の企業",
      value: "6社",
      note: "今週中に更新が必要な企業 3社",
    },
    {
      id: "urgent-task-count",
      label: "48時間以内のタスク",
      value: "3件",
      note: "ES提出 1件 / 面接準備 2件",
    },
    {
      id: "ai-task-count",
      label: "AI抽出タスク",
      value: "4件",
      note: "自動解析の確認待ち 1件",
    },
    {
      id: "scout-count",
      label: "未読スカウト",
      value: "6件",
      note: "興味あり候補を優先表示",
    },
  ],
  urgentTasks: [
    {
      id: "task-01",
      companyName: "LayerX",
      title: "ES提出",
      dueLabel: "明日 18:00 まで",
      dueDate: "2026-04-08T18:00:00+09:00",
      isAiGenerated: true,
      deadlineTone: "urgent",
    },
    {
      id: "task-02",
      companyName: "Sansan",
      title: "一次面接の候補日返信",
      dueLabel: "4月8日 12:00 まで",
      dueDate: "2026-04-08T12:00:00+09:00",
      isAiGenerated: true,
      deadlineTone: "urgent",
    },
    {
      id: "task-03",
      companyName: "SmartHR",
      title: "ポートフォリオ更新",
      dueLabel: "4月9日 23:59 まで",
      dueDate: "2026-04-09T23:59:00+09:00",
      isAiGenerated: false,
      deadlineTone: "soon",
    },
  ],
  companies: [
    {
      id: "company-01",
      companyName: "LayerX",
      title: "プロダクトデザイナー",
      statusKey: "needs-action",
      statusLabel: "対応優先",
      statusDescription: "ES未提出",
      nextDeadlineLabel: "4月8日 18:00",
      nextDeadlineAt: "2026-04-08T18:00:00+09:00",
      deadlineTone: "urgent",
      pendingTaskCount: 3,
      aiTaskCount: 2,
      updatedAtLabel: "最終更新: 3時間前",
      progressLabel: "書類選考",
      note: "AIが応募締切と提出書類を本文から抽出済み",
      tags: ["締切間近", "デザイン職", "AI抽出あり"],
    },
    {
      id: "company-02",
      companyName: "Sansan",
      title: "UXデザイナー",
      statusKey: "interviewing",
      statusLabel: "面接調整中",
      statusDescription: "一次面接",
      nextDeadlineLabel: "4月8日 12:00",
      nextDeadlineAt: "2026-04-08T12:00:00+09:00",
      deadlineTone: "urgent",
      pendingTaskCount: 2,
      aiTaskCount: 1,
      updatedAtLabel: "最終更新: 6時間前",
      progressLabel: "一次面接",
      note: "候補日返信が未完了",
      tags: ["日程調整", "返信待ち"],
    },
    {
      id: "company-03",
      companyName: "SmartHR",
      title: "プロダクトデザイナー",
      statusKey: "needs-action",
      statusLabel: "準備中",
      statusDescription: "課題選考",
      nextDeadlineLabel: "4月9日 23:59",
      nextDeadlineAt: "2026-04-09T23:59:00+09:00",
      deadlineTone: "soon",
      pendingTaskCount: 4,
      aiTaskCount: 1,
      updatedAtLabel: "最終更新: 1日前",
      progressLabel: "課題提出",
      note: "手動追加したタスクが1件あります",
      tags: ["課題あり", "ポートフォリオ"],
    },
    {
      id: "company-04",
      companyName: "freee",
      title: "UIデザイナー",
      statusKey: "waiting",
      statusLabel: "結果待ち",
      statusDescription: "二次面接結果",
      nextDeadlineLabel: "4月12日 10:00",
      nextDeadlineAt: "2026-04-12T10:00:00+09:00",
      deadlineTone: "normal",
      pendingTaskCount: 1,
      aiTaskCount: 0,
      updatedAtLabel: "最終更新: 2日前",
      progressLabel: "二次面接",
      note: "お礼メール送付済み",
      tags: ["結果待ち"],
    },
    {
      id: "company-05",
      companyName: "サイバーエージェント",
      title: "クリエイティブ職",
      statusKey: "offer",
      statusLabel: "オファー",
      statusDescription: "面談調整",
      nextDeadlineLabel: "4月15日 17:00",
      nextDeadlineAt: "2026-04-15T17:00:00+09:00",
      deadlineTone: "normal",
      pendingTaskCount: 1,
      aiTaskCount: 0,
      updatedAtLabel: "最終更新: 3日前",
      progressLabel: "オファー面談",
      note: "条件面談の日程候補あり",
      tags: ["内定関連"],
    },
    {
      id: "company-06",
      companyName: "メルカリ",
      title: "Product Designer",
      statusKey: "waiting",
      statusLabel: "返信待ち",
      statusDescription: "書類通過連絡待ち",
      nextDeadlineLabel: "期限未設定",
      nextDeadlineAt: null,
      deadlineTone: "none",
      pendingTaskCount: 0,
      aiTaskCount: 0,
      updatedAtLabel: "最終更新: 5日前",
      progressLabel: "応募済み",
      note: "現時点で未完了タスクはありません",
      tags: ["待機中"],
    },
  ],
  statusOptions: [
    { value: "all", label: "すべて" },
    { value: "needs-action", label: "対応優先" },
    { value: "interviewing", label: "面接中" },
    { value: "waiting", label: "結果待ち" },
    { value: "offer", label: "オファー" },
  ],
  sortOptions: [
    { value: "deadline-asc", label: "期限が近い順" },
    { value: "deadline-desc", label: "期限が遠い順" },
  ],
  viewModeOptions: [
    { value: "card", label: "カード" },
    { value: "list", label: "リスト" },
  ],
};
