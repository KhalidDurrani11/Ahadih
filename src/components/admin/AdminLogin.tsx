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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
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
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-medical-blue transition-all"
                placeholder="admin"
              />
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Password</label>
             <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-medical-blue transition-all"
                  placeholder="••••••••"
                />
             </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 premium-gradient text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-medical-blue/30 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
