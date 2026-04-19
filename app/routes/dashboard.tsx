import { DashboardContainer } from "~/presentation/dashboard/dashboard.container";

export function meta() {
  return [
    { title: "Shukan | ダッシュボード" },
    { name: "description", content: "就活の進捗と期限を一元管理するダッシュボード" },
  ];
}

export default function Dashboard() {
  return <DashboardContainer />;
}
