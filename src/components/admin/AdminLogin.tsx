"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        window.location.reload(); // Reload to fetch dashboard data
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-medical-blue/[0.02] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl shadow-medical-blue/10 p-10 border border-medical-blue/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 premium-gradient" />
        <div className="text-center mb-8">
          <img
            src="/logo-transparent.png"
            alt="AHAD International Hospital"
            className="h-[90px] w-auto mx-auto mb-4 object-contain"
          />
          <h2 className="text-2xl font-black font-display text-medical-dark">Admin Access</h2>
          <p className="text-gray-500 text-sm mt-2">Sign in to manage the hospital website</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm font-medium text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-medical-blue/50 uppercase tracking-[0.2em] pl-2">Username</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medical-blue/30 group-focus-within:text-medical-blue transition-colors">
                <User className="w-full h-full" />
              </div>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="premium-input pl-12"
                placeholder="admin"
              />
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black text-medical-blue/50 uppercase tracking-[0.2em] pl-2">Password</label>
             <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medical-blue/30 group-focus-within:text-medical-blue transition-colors">
                  <Lock className="w-full h-full" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="premium-input pl-12"
                  placeholder="••••••••"
                />
             </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 premium-gradient text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-medical-blue/20 hover:shadow-medical-blue/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
