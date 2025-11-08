import { useState } from 'react';
import { Heart, Lock, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // For demo purposes - in production this would validate against backend
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0066CC] to-[#004C99] flex flex-col items-center justify-center p-6">
      {/* Logo Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
          <Heart className="w-10 h-10 text-[#0066CC]" fill="#0066CC" />
        </div>
        <h1 className="text-white mb-2">PeaceMaker</h1>
        <p className="text-white/80">Understanding Your Heart Health</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="mb-6 text-center">
          <h2 className="text-[#0066CC] mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-[#666]">
            {isSignUp 
              ? 'Sign up to access your medical reports' 
              : 'Sign in to view your reports'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#333]">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 h-12 text-lg border-2 border-[#E0E0E0] focus:border-[#0066CC]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#333]">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 h-12 text-lg border-2 border-[#E0E0E0] focus:border-[#0066CC]"
                required
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="text-right">
              <button
                type="button"
                className="text-[#0066CC] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-[#0066CC] hover:bg-[#0052A3] text-white"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#666]">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            {' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#0066CC]"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-[#F0F7FF] rounded-lg border border-[#0066CC]/20">
          <p className="text-[#0066CC] text-center">
            🔒 Your data is encrypted and secure
          </p>
        </div>
      </div>

      {/* Offline Indicator */}
      <div className="mt-6 text-white/60 text-center">
        <p>Works offline • HIPAA Compliant Design</p>
      </div>
    </div>
  );
}
