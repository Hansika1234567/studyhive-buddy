import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  MessageSquare,
  BookOpen,
  Sparkles,
  Trophy,
  Calendar,
  ArrowRight,
  Github,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImg from "@/assets/hero.jpg";

const features = [
  { icon: Users, title: "Group Workspaces", desc: "Real-time chat, shared notes, file sharing and task boards — all in one place." },
  { icon: MessageSquare, title: "Peer Doubt Solving", desc: "Post doubts (anonymously if you want), get answers from peers, upvote what helps." },
  { icon: BookOpen, title: "Resource Library", desc: "Share notes & PDFs, organized by subject, with version history baked in." },
  { icon: Sparkles, title: "AI Superpowers", desc: "Summarize chats, generate hints before you ask, and find peers who solved similar problems." },
  { icon: Trophy, title: "Contribution Score", desc: "Track messages, files, tasks and answers. Climb the leaderboard, earn badges." },
  { icon: Calendar, title: "Smart Study Planner", desc: "Calendar view, deadline tracking and gentle reminders so nothing slips." },
];

const benefits = [
  { icon: Zap, title: "Faster than DMs", desc: "Stop juggling WhatsApp, email and Drive. One place for everything." },
  { icon: ShieldCheck, title: "Student-only", desc: "A safe peer space — no teachers watching, just learners helping learners." },
  { icon: Sparkles, title: "AI that helps you think", desc: "Hints before answers, summaries before scrollback. You stay in the driver's seat." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">PeerClass</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-smooth">Features</a>
            <a href="#benefits" className="hover:text-foreground transition-smooth">Why peer learning</a>
            <a href="#cta" className="hover:text-foreground transition-smooth">Get started</a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild><Link to="/login">Log in</Link></Button>
            <Button variant="hero" asChild><Link to="/signup">Sign up free</Link></Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
        <div className="container mx-auto px-4 pt-20 pb-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 backdrop-blur px-3 py-1 text-xs">
                <span className="h-2 w-2 rounded-full bg-gradient-primary" />
                Built for students, by students
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                Learn together.{" "}
                <span className="text-gradient">Solve doubts faster.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                PeerClass is the unified workspace for student collaboration —
                group projects, doubt solving, shared notes and AI-powered help. All in one peer-only space.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/signup">Get started free <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/dashboard">Live demo</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div><span className="text-foreground font-bold text-xl">12k+</span> students</div>
                <div className="h-8 w-px bg-border" />
                <div><span className="text-foreground font-bold text-xl">3.2k</span> groups</div>
                <div className="h-8 w-px bg-border" />
                <div><span className="text-foreground font-bold text-xl">98%</span> doubts solved</div>
              </div>
            </div>
            <div className="relative animate-in fade-in zoom-in-95 duration-700 delay-150">
              <div className="absolute -inset-4 bg-gradient-primary opacity-30 blur-3xl rounded-full" />
              <img
                src={heroImg}
                alt="PeerClass collaborative learning illustration"
                width={1536}
                height={1024}
                className="relative rounded-2xl shadow-card border border-border/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything you need to study together</h2>
            <p className="text-muted-foreground mt-4 text-lg">Stop scattering work across 5 apps. PeerClass brings collaboration, doubts, resources and planning into one place.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="p-6 hover:shadow-glow hover:-translate-y-1 transition-smooth border-border/60 bg-card/50 backdrop-blur">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-4">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-24 bg-gradient-subtle border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map(b => (
              <div key={b.title} className="text-center space-y-3">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                  <b.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl">{b.title}</h3>
                <p className="text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 md:p-20 text-center shadow-glow">
            <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
            <div className="relative space-y-6 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">Ready to learn with your peers?</h2>
              <p className="text-lg text-primary-foreground/80">Join thousands of students collaborating, solving doubts and crushing deadlines together.</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <Button size="xl" variant="secondary" asChild>
                  <Link to="/signup">Create free account <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button size="xl" variant="outline" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link to="/dashboard">Try the demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>© 2026 PeerClass. Built for students.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
