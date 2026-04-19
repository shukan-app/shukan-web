import { describe, expect, it } from "vitest";

import { countUnreadNotifications, filterAppSearchResults } from "./app-shell.vd-mapper";
import type { AppNotificationViewData, AppSearchResultViewData } from "./app-shell.vd";

const searchResults = [
  {
    id: "company-layerx",
    kind: "company",
    title: "LayerX",
    description: "企業 / 選考中",
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
] satisfies AppSearchResultViewData[];

const notifications = [
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
] satisfies AppNotificationViewData[];

describe("filterAppSearchResults", () => {
  it("空検索では全件を返す", () => {
    expect(filterAppSearchResults(searchResults, "   ")).toEqual(searchResults);
  });

  it("日本語 title で検索できる", () => {
    expect(filterAppSearchResults(searchResults, "書類")).toEqual([searchResults[1]]);
  });

  it("日本語 description で検索できる", () => {
    expect(filterAppSearchResults(searchResults, "選考中")).toEqual([searchResults[0]]);
  });

  it("kind で検索できる", () => {
    expect(filterAppSearchResults(searchResults, "event")).toEqual([searchResults[2]]);
  });

  it("該当なしでは空配列を返す", () => {
    expect(filterAppSearchResults(searchResults, "not-found")).toEqual([]);
  });
});

describe("countUnreadNotifications", () => {
  it("未読通知数を返す", () => {
    expect(countUnreadNotifications(notifications)).toBe(2);
  });
});
