export type DashboardDeadlineTone = "urgent" | "soon" | "normal" | "none";

type DashboardSummaryCardBaseViewData = {
  id: string;
  label: string;
  navigationLabel: string | null;
};

export type DashboardSummaryCardViewData =
  | (DashboardSummaryCardBaseViewData & {
      kind: "value";
      value: string;
    })
  | (DashboardSummaryCardBaseViewData & {
      kind: "rate";
      completionRate: number;
    });

export type DashboardAlertKind = "task-due-soon" | "unreplied-mail" | "backend-failure";

export type DashboardAlertViewData = {
  id: string;
  kind: DashboardAlertKind;
  title: string;
  description: string;
  statusLabel: string;
  deadlineTone: DashboardDeadlineTone;
};

export type DashboardRecentTaskViewData = {
  id: string;
  taskType: string;
  companyName: string;
  dueLabel: string;
  deadlineTone: DashboardDeadlineTone;
  navigationLabel: string;
};

export type DashboardRecentEventViewData = {
  id: string;
  eventType: string;
  companyName: string | null;
  eventDateLabel: string;
  deadlineTone: DashboardDeadlineTone;
  navigationLabel: string;
};

export type DashboardRecentScoutViewData = {
  id: string;
  scoutType: string;
  companyName: string;
  serviceName: string;
  navigationLabel: string;
};

export type DashboardViewData = {
  title: string;
  description: string;
  lastUpdatedLabel: string;
  summaryCards: DashboardSummaryCardViewData[];
  alerts: DashboardAlertViewData[];
  recentTask: DashboardRecentTaskViewData;
  recentEvent: DashboardRecentEventViewData;
  recentScout: DashboardRecentScoutViewData;
};

export const dashboardViewData: DashboardViewData = {
  title: "今日やるべきこと",
  description: "直近のタスク、イベント、スカウトを確認できます。",
  lastUpdatedLabel: "モックデータ: 最終更新日時は未接続",
  summaryCards: [
    {
      id: "active-company-count",
      kind: "value",
      label: "進行中の企業数",
      value: "6社",
      navigationLabel: "企業一覧へ",
    },
    {
      id: "incomplete-task-count",
      kind: "value",
      label: "未完了のタスク数",
      value: "4件",
      navigationLabel: "タスク一覧へ",
    },
    {
      id: "event-count",
      kind: "value",
      label: "イベント数",
      value: "3件",
      navigationLabel: "イベント一覧へ",
    },
    {
      id: "unread-scout-count",
      kind: "value",
      label: "未読スカウト数",
      value: "5件",
      navigationLabel: "スカウト一覧へ",
    },
    {
      id: "task-completion-rate",
      kind: "rate",
      label: "タスク完了率",
      completionRate: 68,
      navigationLabel: null,
    },
    {
      id: "last-updated-at",
      kind: "value",
      label: "最終更新日時",
      value: "未接続",
      navigationLabel: null,
    },
  ],
  alerts: [
    {
      id: "alert-task-01",
      kind: "task-due-soon",
      title: "24時間以内に対応が必要なタスクがあります",
      description: "LayerX の書類送信が明日 10:00 までです。",
      statusLabel: "24時間以内",
      deadlineTone: "urgent",
    },
    {
      id: "alert-mail-01",
      kind: "unreplied-mail",
      title: "2日以上返信していないメールがあります",
      description: "Sansan からの面接候補日確認に返信していません。",
      statusLabel: "2日以上未返信",
      deadlineTone: "soon",
    },
    {
      id: "alert-backend-01",
      kind: "backend-failure",
      title: "バックエンド処理の失敗通知があります",
      description: "1件のメール解析に失敗しました。",
      statusLabel: "処理失敗",
      deadlineTone: "normal",
    },
  ],
  recentTask: {
    id: "task-01",
    taskType: "書類送信",
    companyName: "LayerX",
    dueLabel: "明日 10:00 まで",
    deadlineTone: "urgent",
    navigationLabel: "タスク一覧へ",
  },
  recentEvent: {
    id: "event-01",
    eventType: "面接",
    companyName: "freee",
    eventDateLabel: "4月20日 14:00",
    deadlineTone: "urgent",
    navigationLabel: "イベント一覧へ",
  },
  recentScout: {
    id: "scout-01",
    scoutType: "インターン",
    companyName: "メルカリ",
    serviceName: "サポーターズ",
    navigationLabel: "スカウト一覧へ",
  },
};
