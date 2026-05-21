"use client";

import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  KanbanSquare,
  Layers3,
  LayoutDashboard,
  NotebookPen,
  PanelLeftClose,
  PanelLeftOpen,
  PencilRuler,
  Plus,
  Search,
  Settings,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuGroups = [
  {
    label: "Workspace",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        color: "text-sky-500",
        active: true,
      },
      { label: "AI Assistant", icon: Sparkles, color: "text-violet-500" },
      { label: "Calendar", icon: CalendarDays, color: "text-emerald-500" },
      { label: "Task / Kanban", icon: KanbanSquare, color: "text-amber-500" },
    ],
  },
  {
    label: "Create",
    items: [
      { label: "Notes", icon: NotebookPen, color: "text-rose-500" },
      { label: "Whiteboard", icon: PencilRuler, color: "text-cyan-500" },
      { label: "Pages / Spaces", icon: Layers3, color: "text-lime-600" },
      {
        label: "AI Template Builder",
        icon: WandSparkles,
        color: "text-fuchsia-500",
      },
    ],
  },
  {
    label: "Manage",
    items: [{ label: "Settings", icon: Settings, color: "text-slate-500" }],
  },
];

const focusItems = [
  { label: "Project brief", meta: "Notes", accent: "bg-sky-500" },
  { label: "Sprint board review", meta: "Kanban", accent: "bg-amber-500" },
  { label: "Research map", meta: "Whiteboard", accent: "bg-cyan-500" },
];

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8faf6] text-slate-900">
      <div className="flex min-h-screen">
        <aside
          className={cn(
            "sticky top-0 flex h-screen shrink-0 flex-col border-r border-slate-200/80 bg-white/90 px-3 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur transition-all duration-300",
            isCollapsed ? "w-[84px]" : "w-[248px] max-md:w-[84px]",
          )}
        >
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex min-w-0 items-center gap-2">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-teal-400 via-sky-400 to-indigo-500 text-white shadow-sm">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              {!isCollapsed && (
                <div className="min-w-0 max-md:hidden">
                  <p className="truncate text-sm font-semibold text-slate-950">
                    FlowSpace
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    Ideas, tasks, and maps
                  </p>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-slate-500 hover:bg-slate-100"
              onClick={() => setIsCollapsed((value) => !value)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
              ) : (
                <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>

          <nav className="mt-7 flex flex-1 flex-col gap-5 overflow-y-auto">
            {menuGroups.map((group) => (
              <div key={group.label}>
                {!isCollapsed && (
                  <p className="mb-2 px-3 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-slate-400 max-md:hidden">
                    {group.label}
                  </p>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.label}
                        className={cn(
                          "flex h-9 w-full items-center gap-2 rounded-lg px-2.5 text-left text-[0.84rem] font-medium transition",
                          item.active
                            ? "bg-slate-950 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                          isCollapsed && "justify-center px-0",
                          "max-md:justify-center max-md:px-0",
                        )}
                        type="button"
                        title={item.label}
                      >
                        <Icon
                          className={cn(
                            "h-[18px] w-[18px] shrink-0",
                            item.active ? "text-teal-300" : item.color,
                          )}
                          aria-hidden="true"
                        />
                        {!isCollapsed && (
                          <span className="truncate max-md:hidden">{item.label}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div
            className={cn(
              "mt-5 rounded-lg border border-teal-100 bg-teal-50/80 p-3",
              isCollapsed &&
                "grid place-items-center border-transparent bg-transparent p-0",
            )}
          >
            <div className={cn(!isCollapsed && "md:hidden")}>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-teal-600 hover:bg-teal-50"
                title="New workspace item"
                aria-label="New workspace item"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            {!isCollapsed && (
              <div className="max-md:hidden">
                <p className="text-xs font-semibold text-teal-950">
                  Quick capture
                </p>
                <p className="mt-1 text-xs leading-5 text-teal-700">
                  Add a note, board, or task from anywhere.
                </p>
                <Button className="mt-3 h-8 w-full bg-teal-600 text-xs text-white hover:bg-teal-700">
                  <Plus className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  New item
                </Button>
              </div>
            )}
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-[#f8faf6]/85 px-4 py-3 backdrop-blur md:px-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal-600">
                Dashboard
              </p>
              <h1 className="text-xl font-semibold text-slate-950">
                Welcome back
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden h-9 w-[260px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500 shadow-sm md:flex">
                <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
                Search notes, boards, spaces
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-slate-200 bg-white"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4 text-amber-500" aria-hidden="true" />
              </Button>
              <Button className="h-9 bg-slate-950 px-3 text-sm text-white hover:bg-slate-800">
                <Plus className="mr-1.5 h-4 w-4 text-teal-300" aria-hidden="true" />
                Create
              </Button>
            </div>
          </header>

          <div className="grid flex-1 gap-5 p-4 md:p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="min-w-0 space-y-5">
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-teal-600">
                      Fresh workspace
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                      Plan, write, and sketch in one calm place.
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      A focused dashboard for your notes, boards, tasks, pages,
                      and AI-assisted templates.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-slate-200 bg-white">
                      <ChevronLeft className="mr-1.5 h-4 w-4 text-slate-400" />
                      Today
                    </Button>
                    <Button variant="outline" className="border-slate-200 bg-white">
                      Next
                      <ChevronRight className="ml-1.5 h-4 w-4 text-slate-400" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {focusItems.map((item) => (
                  <article
                    key={item.label}
                    className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className={cn("h-1.5 w-10 rounded-full", item.accent)} />
                    <h3 className="mt-4 text-sm font-semibold text-slate-950">
                      {item.label}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                  </article>
                ))}
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-950">
                    Active canvas
                  </h2>
                  <span className="rounded-full bg-lime-100 px-2.5 py-1 text-xs font-medium text-lime-700">
                    Live
                  </span>
                </div>
                <div className="mt-4 grid min-h-[260px] place-items-center rounded-lg border border-dashed border-slate-300 bg-[linear-gradient(#e2e8f0_1px,transparent_1px),linear-gradient(90deg,#e2e8f0_1px,transparent_1px)] bg-[size:28px_28px]">
                  <div className="rounded-lg border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
                    <PencilRuler className="mx-auto h-7 w-7 text-cyan-500" />
                    <p className="mt-2 text-sm font-semibold text-slate-950">
                      Whiteboard preview
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Ready for diagrams, notes, and AI-generated flows.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-5">
              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold text-slate-950">
                  Today
                </h2>
                <div className="mt-4 space-y-3">
                  {["Draft project page", "Review roadmap", "Map user journey"].map(
                    (task, index) => (
                      <label
                        key={task}
                        className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-700"
                      >
                        <input
                          className="h-4 w-4 rounded border-slate-300 accent-teal-600"
                          defaultChecked={index === 0}
                          type="checkbox"
                        />
                        {task}
                      </label>
                    ),
                  )}
                </div>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <WandSparkles className="h-5 w-5 text-fuchsia-500" />
                  <h2 className="text-base font-semibold text-slate-950">
                    AI Template Builder
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Turn goals into reusable pages, task systems, and visual
                  planning boards.
                </p>
                <Button className="mt-4 h-9 w-full bg-fuchsia-600 text-sm text-white hover:bg-fuchsia-700">
                  Build template
                </Button>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
