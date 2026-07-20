'use client';

import { useState } from 'react';
import { SettingsModal } from './SettingsModal';
import { SendModal } from './SendModal';
import { RobuxHexFlat, IconSettings, IconSend, IconNavMenu } from './icons';

interface HeaderProps {
  username: string;
  balance: number;
  onSettingsChange: (username: string, balance: number) => void;
}

export function Header({ username, balance, onSettingsChange }: HeaderProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showSend, setShowSend] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#111111]/95 backdrop-blur-sm border-b border-[#222222]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-lg hover:bg-[#222222] transition-colors"
              title="Settings"
            >
              <IconSettings className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex items-center gap-2">
              <RobuxHexFlat className="w-6 h-6 text-white" />
              <span className="font-extrabold text-lg tracking-tight">Roblox</span>
            </div>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Charts</span>
            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Marketplace</span>
            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Create</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 rounded-full border border-[#2a2a2a]">
              <RobuxHexFlat className="w-4 h-4 text-white" />
              <span className="text-sm font-bold">{balance.toLocaleString()}</span>
            </div>
            <button
              onClick={() => setShowSend(true)}
              className="flex items-center gap-1.5 bg-[#2a2a2a] hover:bg-[#333333] text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-all active:scale-95"
            >
              <IconSend className="w-3.5 h-3.5" />
              Send
            </button>
          </div>
        </div>
      </header>

      {showSettings && (
        <SettingsModal
          currentUsername={username}
          currentBalance={balance}
          onSave={(u, b) => {
            onSettingsChange(u, b);
            setShowSettings(false);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showSend && (
        <SendModal
          balance={balance}
          onClose={() => setShowSend(false)}
          onSend={(amount) => {
            onSettingsChange(username, balance - amount);
          }}
        />
      )}
    </>
  );
}
