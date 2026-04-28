import { Link } from "react-router-dom";
import { MessageSquare, Upload, CheckSquare, HelpCircle, ArrowRight, Trophy, Flame, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { currentUser, stats, groups, doubts, planner, leaderboard } from "@/lib/mock-data";

const statCards = [
  { label: "Messages sent", value: stats.messagesSent, icon: MessageSquare, color: "from-violet-500 to-fuchsia-500" },
  { label: "Files uploaded", value: stats.filesUploaded, icon: Upload, color: "from-indigo-500 to-purple-500" },
  { label: "Tasks completed", value: stats.tasksCompleted, icon: CheckSquare, color: "from-pink-500 to-rose-500" },
  { label: "Doubts answered", value: stats.doubtsAnswered, icon: HelpCircle, color: "from-fuchsia-500 to-pink-500" },
];

export default function Dashboard() {
  const upcoming = planner.filter(p => !p.done).slice(0, 3);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Greeting */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-6 md:p-8 shadow-glow">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="text-primary-foreground">
            <p className="text-sm opacity-80">Welcome back,</p>
            <h1 className="text-3xl md:text-4xl font-bold">{currentUser.name.split(" ")[0]} 👋</h1>
            <p className="opacity-90 mt-1">You're rank #{currentUser.rank} this week. Keep it up!</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" asChild><Link to="/groups">Open groups</Link></Button>
            <Button variant="outline" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/doubts">Ask a doubt</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <Card key={s.label} className="p-5 border-border/60 hover:shadow-card transition-smooth">
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-glow`}>
              <s.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My groups */}
        <Card className="lg:col-span-2 p-6 border-border/60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">My groups</h3>
            <Button variant="ghost" size="sm" asChild><Link to="/groups">View all <ArrowRight className="h-3 w-3" /></Link></Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {groups.slice(0, 4).map(g => (
              <Link key={g.id} to="/groups" className="group flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:border-primary/40 hover:shadow-card transition-smooth">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${g.color} shrink-0`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{g.name}</span>
                    {g.unread > 0 && <Badge className="bg-gradient-primary text-primary-foreground border-0 h-5 px-1.5 text-[10px]">{g.unread}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{g.lastMessage}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Contribution */}
        <Card className="p-6 border-border/60">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="h-4 w-4 text-accent" />
            <h3 className="font-semibold">Contribution score</h3>
          </div>
          <div className="text-4xl font-bold text-gradient">{currentUser.contributionScore}</div>
          <p className="text-xs text-muted-foreground mb-4">+128 this week</p>
          <Progress value={73} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">270 to next level</p>

          <div className="mt-6 pt-6 border-t border-border/60">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-4 w-4 text-warning" />
              <h4 className="font-semibold text-sm">Leaderboard</h4>
            </div>
            <div className="space-y-2">
              {leaderboard.slice(0, 4).map(p => (
                <div key={p.rank} className={`flex items-center gap-3 p-2 rounded-lg ${p.name === currentUser.name ? "bg-primary/10" : ""}`}>
                  <span className="text-xs font-bold text-muted-foreground w-4">{p.rank}</span>
                  <Avatar className="h-7 w-7"><AvatarFallback className="text-[10px] bg-secondary">{p.avatar}</AvatarFallback></Avatar>
                  <span className="text-sm flex-1 truncate">{p.name}</span>
                  <span className="text-xs font-semibold">{p.score}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Trending doubts */}
        <Card className="p-6 border-border/60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Trending doubts</h3>
            <Button variant="ghost" size="sm" asChild><Link to="/doubts">View all <ArrowRight className="h-3 w-3" /></Link></Button>
          </div>
          <div className="space-y-3">
            {doubts.slice(0, 3).map(d => (
              <Link key={d.id} to="/doubts" className="block p-3 rounded-xl border border-border/60 hover:border-primary/40 transition-smooth">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-medium line-clamp-1">{d.title}</h4>
                  <span className="text-xs text-muted-foreground shrink-0">▲ {d.votes}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {d.tags.map(t => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                  <span className="text-xs text-muted-foreground ml-auto">{d.answers} answers</span>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Upcoming */}
        <Card className="p-6 border-border/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-lg">Upcoming deadlines</h3>
            </div>
            <Button variant="ghost" size="sm" asChild><Link to="/planner">Open planner <ArrowRight className="h-3 w-3" /></Link></Button>
          </div>
          <div className="space-y-3">
            {upcoming.map(p => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/60">
                <div className={`h-10 w-10 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold ${
                  p.priority === "high" ? "bg-destructive/15 text-destructive" :
                  p.priority === "medium" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"
                }`}>
                  <span>{p.due.split(" ")[0]}</span>
                  <span>{p.due.split(" ")[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.subject}</p>
                </div>
                <Badge variant="outline" className="capitalize text-[10px]">{p.priority}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
