import { useState } from "react";
import { Plus, Search, Sparkles, ArrowBigUp, MessageCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { doubts } from "@/lib/mock-data";
import { toast } from "sonner";

const TAGS = ["All", "Algorithms", "Machine Learning", "Operating Systems", "Calculus"];

export default function Doubts() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [doubtTitle, setDoubtTitle] = useState("");

  const list = doubts
    .filter(d => filter === "All" || d.tags.includes(filter))
    .filter(d => d.title.toLowerCase().includes(search.toLowerCase()));

  const generateHint = () => {
    if (!doubtTitle.trim()) return;
    setHintLoading(true);
    setHint(null);
    setTimeout(() => {
      setHint("💡 This sounds related to time-complexity analysis. Try checking the worst-case input pattern, and look up 'pivot selection strategies' before posting — you might find your answer faster!");
      setHintLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doubts</h1>
          <p className="text-muted-foreground">Ask, answer, and learn from your peers.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="hero"><Plus className="h-4 w-4" /> Ask a doubt</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader><DialogTitle>Ask a doubt</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="What are you stuck on?" value={doubtTitle} onChange={e => setDoubtTitle(e.target.value)} />
              </div>
              <Button variant="outline" size="sm" onClick={generateHint} disabled={hintLoading || !doubtTitle.trim()}>
                {hintLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Get AI hint first
              </Button>
              {hint && (
                <Card className="p-3 bg-primary/5 border-primary/30">
                  <p className="text-sm">{hint}</p>
                </Card>
              )}
              <div className="space-y-2">
                <Label>Details</Label>
                <Textarea placeholder="Describe your problem, what you've tried..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <Input placeholder="e.g. Algorithms, Sorting" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/60">
                <div>
                  <Label>Post anonymously</Label>
                  <p className="text-xs text-muted-foreground">Your name won't be shown</p>
                </div>
                <Switch />
              </div>
              <Button variant="hero" className="w-full" onClick={() => { toast.success("Doubt posted!"); setOpen(false); setHint(null); setDoubtTitle(""); }}>
                Post doubt
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search doubts..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1 flex-wrap">
          {TAGS.map(t => (
            <Button key={t} size="sm" variant={filter === t ? "default" : "outline"} onClick={() => setFilter(t)}>{t}</Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {list.map(d => (
          <Card key={d.id} className="p-5 border-border/60 hover:shadow-card hover:border-primary/30 transition-smooth">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <button className="p-1 rounded-lg hover:bg-primary/10 hover:text-primary transition-smooth"><ArrowBigUp className="h-5 w-5" /></button>
                <span className="font-bold text-sm">{d.votes}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold hover:text-primary transition-smooth cursor-pointer">{d.title}</h3>
                  {d.solved && <Badge className="bg-success/15 text-success border-success/30 shrink-0"><CheckCircle2 className="h-3 w-3" /> Solved</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{d.body}</p>
                <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {d.tags.map(t => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {d.answers}</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5"><AvatarFallback className="text-[9px] bg-secondary">{d.avatar}</AvatarFallback></Avatar>
                      <span>{d.author} · {d.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
