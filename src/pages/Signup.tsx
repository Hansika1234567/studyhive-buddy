import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GraduationCap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SUGGESTED = ["Algorithms", "Machine Learning", "Calculus", "Operating Systems", "Databases", "Linear Algebra", "Physics", "Chemistry"];

export default function Signup() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<string[]>(["Algorithms"]);
  const [input, setInput] = useState("");

  const addSubject = (s: string) => {
    if (s && !subjects.includes(s)) setSubjects([...subjects, s]);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created — welcome to PeerClass!");
    setTimeout(() => navigate("/dashboard"), 400);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative bg-gradient-primary p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <Link to="/" className="relative flex items-center gap-2 text-primary-foreground">
          <GraduationCap className="h-6 w-6" />
          <span className="font-bold text-lg">PeerClass</span>
        </Link>
        <div className="relative space-y-3 text-primary-foreground">
          <h1 className="text-4xl font-bold leading-tight">Join thousands of students learning together.</h1>
          <p className="text-primary-foreground/80">Create your free account and unlock collaborative groups, peer doubt solving and AI study help.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md p-8 border-border/60 shadow-card">
          <div className="space-y-2 mb-6">
            <h2 className="text-2xl font-bold">Create your account</h2>
            <p className="text-sm text-muted-foreground">Tell us a bit about yourself.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Jane Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@university.edu" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="At least 8 characters" required minLength={8} />
            </div>
            <div className="space-y-2">
              <Label>Subjects of interest</Label>
              <div className="flex flex-wrap gap-2">
                {subjects.map(s => (
                  <Badge key={s} variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                    {s}
                    <button type="button" onClick={() => setSubjects(subjects.filter(x => x !== s))} className="hover:bg-background rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Type and press enter to add..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSubject(input.trim()); } }}
              />
              <div className="flex flex-wrap gap-1 pt-1">
                {SUGGESTED.filter(s => !subjects.includes(s)).slice(0, 6).map(s => (
                  <button key={s} type="button" onClick={() => addSubject(s)} className="text-xs text-muted-foreground hover:text-primary px-2 py-1 rounded-md border border-border/60 hover:border-primary/50 transition-smooth">
                    + {s}
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full">Create account</Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
