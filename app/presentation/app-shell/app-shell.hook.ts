import * as React from "react";

import type { AppNotificationViewData, AppSearchResultViewData } from "./app-shell.vd";

export function filterAppSearchResults(results: AppSearchResultViewData[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length === 0) {
    return results;
  }

  return results.filter((result) => {
    const target = `${result.title} ${result.description} ${result.kind}`.toLowerCase();
    return target.includes(normalizedQuery);
  });
}

export function countUnreadNotifications(notifications: AppNotificationViewData[]) {
  return notifications.filter((notification) => notification.isUnread).length;
}

export function useAppShellSearch(searchResults: AppSearchResultViewData[]) {
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const results = React.useMemo(() => filterAppSearchResults(searchResults, query), [query, searchResults]);

  return {
    query,
    setQuery,
    selectedId,
    results,
    selectResult: setSelectedId,
  };
}

export function useUnreadNotificationCount(notifications: AppNotificationViewData[]) {
  return React.useMemo(() => countUnreadNotifications(notifications), [notifications]);
}
