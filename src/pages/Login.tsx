import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Welcome back!");
      navigate("/dashboard");
    }, 600);
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
          <h1 className="text-4xl font-bold leading-tight">Welcome back to your peer learning space.</h1>
          <p className="text-primary-foreground/80">Pick up where you left off — your groups, doubts and notes are waiting.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md p-8 border-border/60 shadow-card">
          <div className="space-y-2 mb-6">
            <h2 className="text-2xl font-bold">Log in</h2>
            <p className="text-sm text-muted-foreground">Enter your credentials to access your account.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@university.edu" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>
              </div>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Log in"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-6">
            New here? <Link to="/signup" className="text-primary font-medium hover:underline">Create an account</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
