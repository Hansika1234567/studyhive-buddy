import { useState } from "react";
import { Plus, Bell, Calendar as CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { planner as initialPlanner } from "@/lib/mock-data";
import { toast } from "sonner";

export default function Planner() {
  const [items, setItems] = useState(initialPlanner);

  const toggle = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  };

  const upcoming = items.filter(i => !i.done);
  const done = items.filter(i => i.done);

  // simple month grid
  const today = new Date();
  const monthName = today.toLocaleString("default", { month: "long", year: "numeric" });
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const startDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study planner</h1>
          <p className="text-muted-foreground">Track assignments, deadlines and get smart reminders.</p>
        </div>
        <Button variant="hero" onClick={() => toast("Add task (demo)")}>
          <Plus className="h-4 w-4" /> Add task
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 p-6 border-border/60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><CalendarIcon className="h-4 w-4" /> {monthName}</h3>
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-2">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d} className="text-center font-semibold">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate();
              const hasTask = items.some(it => it.due.endsWith(String(day).padStart(2, "0")) && !it.done);
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-start p-1.5 text-sm border transition-smooth ${
                    isToday ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow" :
                    hasTask ? "border-primary/40 bg-primary/5" : "border-transparent hover:bg-muted"
                  }`}
                >
                  <span className="text-xs">{day}</span>
                  {hasTask && !isToday && <div className="h-1 w-1 rounded-full bg-primary mt-auto" />}
                  {isToday && hasTask && <div className="h-1 w-1 rounded-full bg-primary-foreground mt-auto" />}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Reminders */}
        <Card className="p-6 border-border/60">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-accent" />
            <h3 className="font-semibold">Smart reminders</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="font-medium">Algo Assignment 4</p>
              <p className="text-xs text-muted-foreground">Due in 2 days · start now to avoid the rush</p>
            </div>
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
              <p className="font-medium">ML Project Milestone 2</p>
              <p className="text-xs text-muted-foreground">Due in 5 days · 2 tasks pending</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="font-medium">Group sync tonight</p>
              <p className="text-xs text-muted-foreground">9:00 PM with Algorithms Study Circle</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 border-border/60">
        <h3 className="font-semibold mb-4">Tasks</h3>
        <div className="space-y-2">
          {upcoming.map(p => (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/60 hover:border-primary/30 transition-smooth">
              <Checkbox checked={p.done} onCheckedChange={() => toggle(p.id)} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.subject} · Due {p.due}</p>
              </div>
              <Badge variant="outline" className={`capitalize ${
                p.priority === "high" ? "border-destructive/40 text-destructive" :
                p.priority === "medium" ? "border-warning/40 text-warning" : ""
              }`}>{p.priority}</Badge>
            </div>
          ))}
          {done.map(p => (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/40 opacity-60">
              <Checkbox checked onCheckedChange={() => toggle(p.id)} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm line-through">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
