import { useState } from 'react';
import { Ship, TrendingUp, Calculator } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-white space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Ship className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl tracking-tight">FREIGHTY MERCURY</h1>
              <p className="text-gray-300 text-sm mt-1">Smart Costing for Smarter Logistics Decisions</p>
            </div>
          </div>

          <div className="space-y-4 mt-12">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Ship className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg">Incoterms Database</h3>
                <p className="text-gray-400 text-sm">Understand responsibilities and cost breakdowns for EXW, FOB, CIF, DDP and more</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg">Real-Time Exchange Rates</h3>
                <p className="text-gray-400 text-sm">Track live currency data and weekly trends for accurate pricing</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calculator className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg">Integrated Cost Calculator</h3>
                <p className="text-gray-400 text-sm">Calculate total shipment costs automatically using live rates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to access your pricing dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="farhan.wijaya@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Sign In
              </Button>
              <p className="text-xs text-center text-gray-500">
                Demo: Use any email and password to login
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
