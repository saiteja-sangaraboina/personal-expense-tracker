import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline && !showReconnected) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 text-center py-2 px-4 text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${
        isOffline
          ? 'bg-amber-500 text-white'
          : 'bg-emerald-600 text-white animate-fade-out'
      }`}
    >
      {isOffline ? (
        <>
          <WifiOff size={15} />
          <span>You are currently offline. Local changes will be preserved.</span>
        </>
      ) : (
        <>
          <Wifi size={15} />
          <span>Connection restored! You are back online.</span>
        </>
      )}
    </div>
  );
};

export default OfflineBanner;
