import * as React from "react";
import {
  AlertCircleIcon,
  Briefcase01Icon,
  Building02Icon,
  Calendar03Icon,
  CheckListIcon,
  Clock01Icon,
  DashboardSquare01Icon,
  Logout03Icon,
  MailValidation01Icon,
  Menu01Icon,
  Notification03Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { NavLink } from "react-router";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

import { countUnreadNotifications, filterAppSearchResults } from "./app-shell.logic";
import { appShellViewData, type AppNavigationItemViewData, type AppSearchResultKind } from "./app-shell.vd";

type AppShellProps = {
  children: React.ReactNode;
};

type NavigationListProps = {
  items: AppNavigationItemViewData[];
  compact?: boolean;
};

type AppIconKey = AppNavigationItemViewData["icon"] | AppSearchResultKind | "notification";

const iconByKey = {
  dashboard: DashboardSquare01Icon,
  company: Building02Icon,
  task: CheckListIcon,
  scout: Briefcase01Icon,
  event: Calendar03Icon,
  notification: Notification03Icon,
} satisfies Record<AppIconKey, unknown>;

function AppLogo() {
  return (
    <div className="flex h-16 items-center gap-3 px-4">
      <span className="flex size-9 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
        <HugeiconsIcon icon={Briefcase01Icon} />
      </span>
      <span className="font-heading text-lg font-semibold tracking-normal">{appShellViewData.serviceName}</span>
    </div>
  );
}

function NavigationList({ items, compact = false }: NavigationListProps) {
  return (
    <nav className="flex flex-col gap-1 px-3" aria-label="メインナビゲーション">
      {items.map((item) => {
        const icon = iconByKey[item.icon];
        const getItemClassName = (isActive: boolean) =>
          cn(
            "flex h-10 w-full items-center gap-3 rounded-3xl px-3 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
            !item.isEnabled && "cursor-not-allowed opacity-65 hover:bg-transparent hover:text-muted-foreground",
            compact && "justify-start",
          );

        if (item.isEnabled) {
          return (
            <NavLink key={item.id} to={item.href} className={({ isActive }) => getItemClassName(isActive)} end>
              <HugeiconsIcon icon={icon} />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            className={getItemClassName(false)}
            disabled
            aria-label={`${item.label}は準備中です`}
          >
            <HugeiconsIcon icon={icon} />
            <span className="truncate">{item.label}</span>
            <Badge variant="secondary" className="ml-auto">
              準備中
            </Badge>
          </button>
        );
      })}
    </nav>
  );
}

function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
      <AppLogo />
      <Separator />
      <div className="flex flex-1 flex-col gap-4 py-4">
        <NavigationList items={appShellViewData.navigationItems} />
      </div>
    </aside>
  );
}

function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger render={<Button type="button" variant="ghost" size="icon-sm" className="lg:hidden" />}>
        <HugeiconsIcon icon={Menu01Icon} />
        <span className="sr-only">メニューを開く</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 max-w-[88vw]">
        <SheetHeader>
          <SheetTitle>{appShellViewData.serviceName}</SheetTitle>
        </SheetHeader>
        <NavigationList items={appShellViewData.navigationItems} compact />
      </SheetContent>
    </Sheet>
  );
}

function AppSearch() {
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const results = filterAppSearchResults(appShellViewData.searchResults, query);

  return (
    <Popover>
      <PopoverTrigger render={<div className="relative w-full max-w-xl" />}>
        <HugeiconsIcon
          icon={Search01Icon}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="検索"
          className="pl-10"
          aria-label="全体検索"
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(36rem,calc(100vw-2rem))] p-2">
        <PopoverHeader className="px-2 py-1">
          <PopoverTitle className="text-sm">検索結果</PopoverTitle>
        </PopoverHeader>
        <ScrollArea className={cn(results.length > 0 ? "h-80" : "h-20")}>
          <div className="flex flex-col gap-1 p-1">
            {results.length > 0 ? (
              results.map((result) => {
                const icon = iconByKey[result.kind];

                return (
                  <button
                    key={result.id}
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-3 rounded-3xl px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                      selectedId === result.id && "bg-muted",
                    )}
                    onClick={() => setSelectedId(result.id)}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-3xl bg-secondary text-secondary-foreground">
                      <HugeiconsIcon icon={icon} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{result.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">{result.description}</span>
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="flex items-center gap-3 rounded-3xl px-3 py-6 text-sm text-muted-foreground">
                <HugeiconsIcon icon={Search01Icon} />
                <span>該当なし</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

function NotificationsMenu() {
  const unreadCount = countUnreadNotifications(appShellViewData.notifications);

  return (
    <Popover>
      <PopoverTrigger render={<Button type="button" variant="ghost" size="icon-sm" className="relative" />}>
        <HugeiconsIcon icon={Notification03Icon} />
        {unreadCount > 0 && (
          <span
            className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive"
            aria-label={`${unreadCount}件の未読通知`}
          />
        )}
        <span className="sr-only">通知</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(22rem,calc(100vw-2rem))] p-2">
        <PopoverHeader className="px-2 py-1">
          <PopoverTitle className="text-sm">通知</PopoverTitle>
        </PopoverHeader>
        <div className="flex flex-col gap-1">
          {appShellViewData.notifications.map((notification) => (
            <div key={notification.id} className="flex gap-3 rounded-3xl px-3 py-2">
              <span
                className={cn(
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-3xl bg-secondary text-secondary-foreground",
                  notification.tone === "error" && "bg-destructive/10 text-destructive",
                )}
              >
                <HugeiconsIcon icon={notification.tone === "info" ? Notification03Icon : AlertCircleIcon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium">{notification.title}</span>
                  {notification.isUnread && <Badge variant="default">未読</Badge>}
                </span>
                <span className="block text-xs text-muted-foreground">{notification.description}</span>
                <span className="block text-xs text-muted-foreground">{notification.receivedAtLabel}</span>
              </span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button type="button" variant="ghost" size="icon-sm" />}>
        <Avatar size="sm">
          <AvatarFallback>{appShellViewData.account.initials}</AvatarFallback>
        </Avatar>
        <span className="sr-only">アカウント</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>アカウント</DropdownMenuLabel>
          <DropdownMenuItem>
            <HugeiconsIcon icon={Clock01Icon} />
            <span className="flex flex-col">
              <span>最終同期日時</span>
              <span className="text-xs text-muted-foreground">{appShellViewData.account.lastSyncedAtLabel}</span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HugeiconsIcon icon={MailValidation01Icon} />
            <span className="flex flex-col">
              <span>Gmail連携状態</span>
              <span className="text-xs text-muted-foreground">
                {appShellViewData.account.gmailConnectionStatusLabel}
              </span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <HugeiconsIcon icon={Logout03Icon} />
            <span>ログアウト</span>
            <Badge variant="secondary" className="ml-auto">
              Mock
            </Badge>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <MobileNavigation />
        <div className="lg:hidden">
          <span className="font-heading text-lg font-semibold tracking-normal">{appShellViewData.serviceName}</span>
        </div>
        <div className="flex flex-1 justify-center">
          <AppSearch />
        </div>
        <div className="flex items-center gap-1">
          <NotificationsMenu />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
