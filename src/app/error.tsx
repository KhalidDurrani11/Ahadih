'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center border border-gray-100"
      >
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <AlertTriangle className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-display font-black text-medical-dark mb-4">Something went wrong</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          {error.message.includes('DATABASE_URL') || error.message.includes('Can\'t reach database')
            ? "Database connection failed. Please ensure your Vercel Environment Variables are set correctly." 
            : `Error: ${error.name} - ${error.message}`}
        </p>

        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="w-full py-4 premium-gradient text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl shadow-medical-blue/20 hover:scale-[1.02] transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          
          <Link 
            href="/"
            className="w-full py-4 bg-white border border-gray-200 text-medical-dark rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Go to Homepage</span>
          </Link>
        </div>

        {process.env.NODE_ENV !== 'production' && (
          <div className="mt-8 text-left p-4 bg-gray-100 rounded-xl overflow-auto max-h-40">
            <p className="text-[10px] font-mono whitespace-pre-wrap text-gray-600">
              {error.stack}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
