import { useState } from "react";

import type { DashboardSortOption, DashboardStatusKey, DashboardViewData, DashboardViewMode } from "./dashboard.vd";

function normalizeKeyword(value: string) {
  return value.trim().toLowerCase();
}

function toSortableTimestamp(value: string | null, sort: DashboardSortOption) {
  if (!value) {
    return sort === "deadline-asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  }

  return new Date(value).getTime();
}

export function useDashboardState(dashboard: DashboardViewData) {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<DashboardStatusKey>("all");
  const [sort, setSort] = useState<DashboardSortOption>("deadline-asc");
  const [viewMode, setViewMode] = useState<DashboardViewMode>("card");

  const normalizedKeyword = normalizeKeyword(keyword);

  const visibleCompanies = [...dashboard.companies]
    .filter((company) => {
      const matchedKeyword =
        normalizedKeyword.length === 0 ||
        `${company.companyName} ${company.title}`.toLowerCase().includes(normalizedKeyword);
      const matchedStatus = status === "all" || company.statusKey === status;

      return matchedKeyword && matchedStatus;
    })
    .sort((left, right) => {
      const leftTimestamp = toSortableTimestamp(left.nextDeadlineAt, sort);
      const rightTimestamp = toSortableTimestamp(right.nextDeadlineAt, sort);

      return sort === "deadline-asc" ? leftTimestamp - rightTimestamp : rightTimestamp - leftTimestamp;
    });

  return {
    keyword,
    status,
    sort,
    viewMode,
    visibleCompanies,
    visibleCompanyCount: visibleCompanies.length,
    onKeywordChange: setKeyword,
    onStatusChange: setStatus,
    onSortChange: setSort,
    onViewModeChange: setViewMode,
  };
}
