import { useState } from "react";
import { Send, Sparkles, Plus, Paperclip, FileText, CheckSquare2, Clock, Users, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { groups, groupMessages, tasks } from "@/lib/mock-data";
import { toast } from "sonner";

export default function Groups() {
  const [activeId, setActiveId] = useState(groups[0].id);
  const [messages, setMessages] = useState(groupMessages);
  const [input, setInput] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summarizing, setSummarizing] = useState(false);

  const active = groups.find(g => g.id === activeId)!;

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, {
      id: `m${Date.now()}`, author: "Aanya", avatar: "AS", time: "now", text: input, self: true,
    }]);
    setInput("");
  };

  const summarize = () => {
    setSummaryOpen(true);
    setSummarizing(true);
    setTimeout(() => setSummarizing(false), 1200);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
          <p className="text-muted-foreground">Collaborate with your study circles in real time.</p>
        </div>
        <Button variant="hero"><Plus className="h-4 w-4" /> New group</Button>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-4 h-[calc(100vh-220px)] min-h-[600px]">
        {/* Group list */}
        <Card className="p-2 border-border/60 overflow-y-auto">
          {groups.map(g => (
            <button
              key={g.id}
              onClick={() => setActiveId(g.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-smooth ${
                g.id === activeId ? "bg-gradient-primary text-primary-foreground shadow-glow" : "hover:bg-muted"
              }`}
            >
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${g.color} shrink-0`} />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-sm truncate">{g.name}</div>
                <div className={`text-xs truncate ${g.id === activeId ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {g.members} members
                </div>
              </div>
              {g.unread > 0 && g.id !== activeId && (
                <Badge className="bg-gradient-primary text-primary-foreground border-0 h-5 px-1.5 text-[10px]">{g.unread}</Badge>
              )}
            </button>
          ))}
        </Card>

        {/* Workspace */}
        <Card className="border-border/60 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${active.color}`} />
              <div>
                <h2 className="font-semibold">{active.name}</h2>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" /> {active.members} members · {active.subject}
                </div>
              </div>
            </div>
            <Button variant="hero" size="sm" onClick={summarize}>
              <Sparkles className="h-4 w-4" /> AI Summary
            </Button>
          </div>

          <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="mx-4 mt-3 self-start">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="notes">Shared Notes</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden m-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(m => (
                  <div key={m.id} className={`flex gap-3 ${m.self ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className={`text-[10px] ${m.self ? "bg-gradient-primary text-primary-foreground" : "bg-secondary"}`}>{m.avatar}</AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[75%] ${m.self ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{m.author}</span>
                        <span>{m.time}</span>
                      </div>
                      <div className={`px-4 py-2 rounded-2xl ${m.self ? "bg-gradient-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"}`}>
                        <p className="text-sm">{m.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border/60 flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => toast("File upload (demo)")}><Paperclip className="h-4 w-4" /></Button>
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && send()}
                  placeholder="Message your group..."
                />
                <Button variant="hero" onClick={send}><Send className="h-4 w-4" /></Button>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="flex-1 overflow-y-auto p-4 m-0">
              <div className="grid md:grid-cols-3 gap-4">
                {(["todo", "in_progress", "done"] as const).map(col => (
                  <div key={col}>
                    <h3 className="text-sm font-semibold mb-3 capitalize flex items-center gap-2">
                      {col === "todo" && <Clock className="h-4 w-4 text-muted-foreground" />}
                      {col === "in_progress" && <Loader2 className="h-4 w-4 text-warning" />}
                      {col === "done" && <CheckSquare2 className="h-4 w-4 text-success" />}
                      {col.replace("_", " ")}
                    </h3>
                    <div className="space-y-2">
                      {tasks.filter(t => t.status === col).map(t => (
                        <Card key={t.id} className="p-3 border-border/60">
                          <p className="text-sm font-medium">{t.title}</p>
                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <span>{t.assignee}</span>
                            <Badge variant="outline" className="text-[10px]">{t.due}</Badge>
                          </div>
                        </Card>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground"><Plus className="h-3 w-3" /> Add task</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="flex-1 overflow-y-auto p-4 m-0">
              <Card className="p-6 border-border/60 bg-muted/30">
                <h3 className="font-semibold mb-2"># DP on Trees — shared notes</h3>
                <div className="prose prose-sm max-w-none text-sm space-y-2 text-foreground/90">
                  <p><strong>Goal:</strong> compute answers for each subtree using a post-order DFS.</p>
                  <p><strong>Pattern 1:</strong> rerooting — first DFS computes downward answers, second DFS pushes upward contributions.</p>
                  <p><strong>Common pitfall:</strong> double counting the parent edge. Always pass parent into recursion.</p>
                  <p>Add your notes here — everyone in the group can edit live.</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="files" className="flex-1 overflow-y-auto p-4 m-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {["DP cheatsheet.pdf", "Lecture notes wk7.pdf", "Project brief.docx"].map(f => (
                  <Card key={f} className="p-4 border-border/60 hover:shadow-card transition-smooth">
                    <FileText className="h-8 w-8 text-primary mb-2" />
                    <p className="text-sm font-medium truncate">{f}</p>
                    <p className="text-xs text-muted-foreground">Shared by Aanya</p>
                  </Card>
                ))}
                <Card className="p-4 border-2 border-dashed border-border/60 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-smooth">
                  <div className="text-center text-muted-foreground">
                    <Plus className="h-6 w-6 mx-auto mb-1" />
                    <p className="text-xs">Upload file</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <Dialog open={summaryOpen} onOpenChange={setSummaryOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> AI Chat Summary</DialogTitle>
          </DialogHeader>
          {summarizing ? (
            <div className="flex flex-col items-center py-12 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Reading your conversation...</p>
            </div>
          ) : (
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Key points</h4>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Team agreed to sync at 9pm to work on DP problem set</li>
                  <li>Mira hit TLE on problem 4 — Karan suggested prefix sums</li>
                  <li>Aanya offered to share tabulation vs memoization notes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Pending tasks</h4>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Submit assignment — Friday 11:59pm</li>
                  <li>Mira: refactor problem 4 with prefix sums</li>
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
