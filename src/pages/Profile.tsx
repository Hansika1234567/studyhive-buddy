import { Mail, Trophy, MessageSquare, Upload, CheckSquare, HelpCircle, Edit } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { currentUser, stats, leaderboard } from "@/lib/mock-data";

export default function Profile() {
  const breakdown = [
    { label: "Messages", value: stats.messagesSent, icon: MessageSquare, max: 500 },
    { label: "Files", value: stats.filesUploaded, icon: Upload, max: 50 },
    { label: "Tasks", value: stats.tasksCompleted, icon: CheckSquare, max: 100 },
    { label: "Doubts answered", value: stats.doubtsAnswered, icon: HelpCircle, max: 100 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      <Card className="overflow-hidden border-border/60">
        <div className="h-32 bg-gradient-primary relative">
          <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        </div>
        <div className="px-6 pb-6 -mt-12 relative">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <Avatar className="h-24 w-24 border-4 border-background shadow-card">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">{currentUser.avatar}</AvatarFallback>
            </Avatar>
            <Button variant="outline"><Edit className="h-4 w-4" /> Edit profile</Button>
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p className="text-muted-foreground">@{currentUser.username}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <Mail className="h-4 w-4" /> {currentUser.email}
            </div>
            <p className="mt-3 text-sm">{currentUser.bio}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {currentUser.subjects.map(s => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 border-border/60 md:col-span-2">
          <h3 className="font-semibold mb-4">Contribution breakdown</h3>
          <div className="space-y-4">
            {breakdown.map(b => (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    <b.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{b.label}</span>
                  </div>
                  <span className="font-semibold">{b.value}</span>
                </div>
                <Progress value={(b.value / b.max) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border/60">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-4 w-4 text-warning" />
            <h3 className="font-semibold">Rank</h3>
          </div>
          <div className="text-5xl font-bold text-gradient">#{currentUser.rank}</div>
          <p className="text-xs text-muted-foreground mb-4">in your school this week</p>
          <div className="space-y-2 pt-4 border-t border-border/60">
            {leaderboard.slice(0, 5).map(p => (
              <div key={p.rank} className={`flex items-center gap-2 p-2 rounded-lg text-sm ${p.name === currentUser.name ? "bg-primary/10" : ""}`}>
                <span className="text-xs font-bold w-4">{p.rank}</span>
                <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px] bg-secondary">{p.avatar}</AvatarFallback></Avatar>
                <span className="flex-1 truncate">{p.name}</span>
                <span className="font-semibold text-xs">{p.score}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 border-border/60">
        <h3 className="font-semibold mb-4">Badges earned</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Helpful Peer", "Top Contributor", "Streak ×7", "Early Bird"].map(b => (
            <div key={b} className="p-4 rounded-xl bg-gradient-primary/10 border border-primary/20 text-center">
              <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xs font-medium">{b}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
