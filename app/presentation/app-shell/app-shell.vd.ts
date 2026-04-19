export type AppNavigationItemViewData = {
  id: string;
  label: string;
  href: string;
  icon: "dashboard" | "company" | "task" | "scout" | "event";
  isEnabled: boolean;
};

export type AppSearchResultKind = "company" | "task" | "event" | "scout" | "notification";

export type AppSearchResultViewData = {
  id: string;
  kind: AppSearchResultKind;
  title: string;
  description: string;
};

export type AppNotificationTone = "info" | "warning" | "error";

export type AppNotificationViewData = {
  id: string;
  tone: AppNotificationTone;
  title: string;
  description: string;
  receivedAtLabel: string;
  isUnread: boolean;
};

export type AppAccountViewData = {
  initials: string;
  lastSyncedAtLabel: string;
  gmailConnectionStatusLabel: string;
};

export type AppShellViewData = {
  serviceName: string;
  navigationItems: AppNavigationItemViewData[];
  searchResults: AppSearchResultViewData[];
  notifications: AppNotificationViewData[];
  account: AppAccountViewData;
};

export const appShellViewData: AppShellViewData = {
  serviceName: "Shukan",
  navigationItems: [
    {
      id: "dashboard",
      label: "ダッシュボード",
      href: "/",
      icon: "dashboard",
      isEnabled: true,
    },
    {
      id: "companies",
      label: "企業一覧",
      href: "/companies",
      icon: "company",
      isEnabled: false,
    },
    {
      id: "tasks",
      label: "タスク一覧",
      href: "/tasks",
      icon: "task",
      isEnabled: false,
    },
    {
      id: "scouts",
      label: "スカウト一覧",
      href: "/scouts",
      icon: "scout",
      isEnabled: false,
    },
    {
      id: "events",
      label: "イベント一覧",
      href: "/events",
      icon: "event",
      isEnabled: false,
    },
  ],
  searchResults: [
    {
      id: "company-layerx",
      kind: "company",
      title: "LayerX",
      description: "企業 / 選考中",
    },
    {
      id: "company-freee",
      kind: "company",
      title: "freee",
      description: "企業 / 面接予定あり",
    },
    {
      id: "task-documents",
      kind: "task",
      title: "書類送信",
      description: "LayerX / 明日 10:00 まで",
    },
    {
      id: "event-interview",
      kind: "event",
      title: "一次面接",
      description: "freee / 4月20日 14:00",
    },
    {
      id: "scout-mercari",
      kind: "scout",
      title: "インターンのスカウト",
      description: "メルカリ / サポーターズ",
    },
    {
      id: "notification-parse-error",
      kind: "notification",
      title: "メール解析に失敗しました",
      description: "1件のメールを確認してください",
    },
  ],
  notifications: [
    {
      id: "notice-01",
      tone: "info",
      title: "運営からのお知らせ",
      description: "Gmail連携の初期スキャンはモック表示です。",
      receivedAtLabel: "5分前",
      isUnread: true,
    },
    {
      id: "notice-02",
      tone: "warning",
      title: "メール解析失敗",
      description: "Sansan からのメール解析に失敗しました。",
      receivedAtLabel: "18分前",
      isUnread: true,
    },
    {
      id: "notice-03",
      tone: "error",
      title: "バックエンド処理失敗",
      description: "1件の同期処理が完了しませんでした。",
      receivedAtLabel: "1時間前",
      isUnread: false,
    },
  ],
  account: {
    initials: "SK",
    lastSyncedAtLabel: "2026/04/19 09:30",
    gmailConnectionStatusLabel: "連携済み",
  },
};
