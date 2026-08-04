"use client";

import { useState, useEffect } from "react";
import { Download, X, Share } from "lucide-react";

export function PWAInstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if we are already in standalone mode
    const isStandaloneMode = window.matchMedia("(display-mode: standalone)").matches || 
                           (window.navigator as any).standalone || 
                           document.referrer.includes("android-app://");
    
    setIsStandalone(isStandaloneMode);

    if (isStandaloneMode) {
      return;
    }

    // iOS detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Show prompt after a short delay for everyone not in standalone mode
    const timer = setTimeout(() => setShowPrompt(true), 2500);

    // Android/Chrome event (if it fires, we'll have the real prompt)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-[100] animate-in slide-in-from-bottom-5">
      <button 
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-600 dark:text-primary-400">
          <Download className="w-6 h-6" />
        </div>
        
        <div className="flex-1 pr-4">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Install App</h3>
          
          {isIOS ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              To install on iOS, tap <Share className="inline w-3.5 h-3.5 mx-1" /> and select <strong>Add to Home Screen</strong>.
            </p>
          ) : deferredPrompt ? (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-3">
                Install our portal for a better experience.
              </p>
              <button 
                onClick={handleInstallClick}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 rounded-xl transition-colors"
              >
                Install Now
              </button>
            </>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Use your browser's menu to install this app.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
