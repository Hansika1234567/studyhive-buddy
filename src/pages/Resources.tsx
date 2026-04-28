import { useState } from "react";
import { Upload, Search, FileText, Download, History } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { resources } from "@/lib/mock-data";
import { toast } from "sonner";

const SUBJECTS = ["All", "Algorithms", "Machine Learning", "Operating Systems", "Calculus", "Math"];

export default function Resources() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const list = resources
    .filter(r => filter === "All" || r.subject === filter)
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource library</h1>
          <p className="text-muted-foreground">Notes & PDFs shared by your peers, with version history.</p>
        </div>
        <Button variant="hero" onClick={() => toast("Upload coming soon")}>
          <Upload className="h-4 w-4" /> Upload resource
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1 flex-wrap">
          {SUBJECTS.map(s => (
            <Button key={s} size="sm" variant={filter === s ? "default" : "outline"} onClick={() => setFilter(s)}>{s}</Button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(r => (
          <Card key={r.id} className="p-5 border-border/60 hover:shadow-card hover:-translate-y-1 transition-smooth group">
            <div className="flex items-start justify-between mb-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <Badge variant="outline" className="gap-1"><History className="h-3 w-3" /> {r.version}</Badge>
            </div>
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{r.name}</h3>
            <Badge variant="secondary" className="text-[10px] mb-3">{r.subject}</Badge>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <span>by {r.uploader}</span>
              <span>{r.size} · {r.downloads} ↓</span>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={() => toast.success(`Downloading ${r.name}`)}>
              <Download className="h-3 w-3" /> Download
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
