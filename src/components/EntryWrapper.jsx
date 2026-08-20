"use client";

import { useState } from 'react';
// We will drop your actual LoadingScreen code in here next
import { LoadingScreen } from './ui/loading-screen'; 

export function EntryWrapper({ children }) {
  const [isEntryComplete, setIsEntryComplete] = useState(false);

  return (
    <>
      {!isEntryComplete ? (
        <LoadingScreen onEnter={() => setIsEntryComplete(true)} />
      ) : (
        <div className="animate-in fade-in duration-700 ease-out">
          {children}
        </div>
      )}
    </>
  );
}