"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";

interface PinEntryProps {
  onLogin: (pin: string) => Promise<any>;
}

export function PinEntry({ onLogin }: PinEntryProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;
    
    setError("");
    setIsSubmitting(true);
    
    try {
      await onLogin(pin);
    } catch (err: any) {
      setError(err.message || "Incorrect PIN. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-sm mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 text-primary-500 rounded-full flex items-center justify-center mb-6">
        <Lock className="w-8 h-8" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">
        Authentication Required
      </h2>
      <p className="text-slate-500 text-center mb-8">
        Please enter your secure PIN to view your child's behaviour records.
      </p>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="space-y-4">
          <input
            type="password"
            maxLength={6}
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            disabled={isSubmitting}
            className="w-full text-center text-2xl tracking-[0.5em] py-4 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all disabled:opacity-50"
            autoFocus
          />
          
          {error && (
            <p className="text-red-500 text-sm text-center font-medium animate-in slide-in-from-top-1">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !pin}
            className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Unlock Records"}
          </button>
        </div>
      </form>
    </div>
  );
}
