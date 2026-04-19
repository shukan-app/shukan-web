import * as React from "react";

import { AppShellPresentational } from "./app-shell.presentational";
import { appShellViewData } from "./app-shell.vd";

type AppShellContainerProps = {
  children: React.ReactNode;
};

export function AppShellContainer({ children }: AppShellContainerProps) {
  return <AppShellPresentational appShell={appShellViewData}>{children}</AppShellPresentational>;
}
