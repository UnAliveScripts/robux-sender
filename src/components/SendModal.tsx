'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  IconX,
  IconSearch,
  RobuxHexFlat,
  IconLoader,
  IconChevronRight,
  IconCheck,
} from './icons';
import type { Friend, RobloxUser } from '@/types';

interface SendModalProps {
  balance: number;
  onClose: () => void;
  onSend: (amount: number) => void;
}

type Step = 'select' | 'amount' | 'confirm';

export function SendModal({ balance, onClose, onSend }: SendModalProps) {
  const [step, setStep] = useState<Step>('select');
  const [selectedUser, setSelectedUser] = useState<RobloxUser | Friend | null>(null);
  const [amount, setAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RobloxUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sentAmount, setSentAmount] = useState(0);
  const [friends] = useLocalStorage<Friend[]>('robux-friends', []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        doSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  async function doSearch(query: string) {
    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?keyword=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
    setIsSearching(false);
  }

  function handleSelectUser(user: RobloxUser | Friend) {
    setSelectedUser(user);
    setStep('amount');
    setSearchQuery('');
    setSearchResults([]);
  }

  function handleAmountSelect(amt: number) {
    setAmount(amt);
    setCustomAmount('');
  }

  function handleNext() {
    if (step === 'amount') {
      const finalAmount = amount || parseInt(customAmount) || 0;
      if (finalAmount > 0 && finalAmount <= balance) {
        setAmount(finalAmount);
        setStep('confirm');
      }
    } else if (step === 'confirm') {
      onSend(amount);
      setSentAmount(amount);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onClose();
      }, 2500);
    }
  }

  const presetAmounts = [25, 50, 100, 200];
  const finalAmount = amount || parseInt(customAmount) || 0;

  const userAvatarUrl = selectedUser
    ? (selectedUser as any).avatarUrl || `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${(selectedUser as any).id}&size=150x150&format=Png`
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-sm bg-[#181818] rounded-2xl border border-[#2a2a2a] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <RobuxHexFlat className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-bold tracking-tight">Send Robux</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <RobuxHexFlat className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-bold">{balance.toLocaleString()}</span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-[#2a2a2a] rounded-lg transition-colors">
              <IconX className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <AnimatePresence mode="wait">
            {step === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="relative">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-[#232323] border border-[#333333] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
                    placeholder="Search by username"
                    autoFocus
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin">
                      <IconLoader className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                </div>

                {searchResults.length > 0 && (
                  <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden">
                    {searchResults.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleSelectUser(user)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#222222] transition-colors text-left"
                      >
                        <img
                          src={user.avatarUrl || `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png`}
                          alt=""
                          className="w-8 h-8 rounded-full bg-[#2a2a2a] object-cover"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{user.displayName}</p>
                          <p className="text-xs text-gray-500 truncate">@{user.name}</p>
                        </div>
                        <IconChevronRight className="w-4 h-4 text-gray-500" />
                      </button>
                    ))}
                  </div>
                )}

                {friends.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      My friends ({friends.length})
                    </p>
                    <div className="space-y-1">
                      {friends.map((friend) => (
                        <button
                          key={friend.id}
                          onClick={() => handleSelectUser(friend)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] hover:bg-[#222222] transition-colors text-left"
                        >
                          <img
                            src={friend.avatarUrl || `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${friend.id}&size=150x150&format=Png`}
                            alt=""
                            className="w-8 h-8 rounded-full bg-[#2a2a2a] object-cover"
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{friend.displayName || friend.name}</p>
                            <p className="text-xs text-gray-500 truncate">@{friend.name}</p>
                          </div>
                          <IconChevronRight className="w-4 h-4 text-gray-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 'amount' && selectedUser && (
              <motion.div
                key="amount"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <button
                  onClick={() => setStep('select')}
                  className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1 font-medium"
                >
                  <IconChevronRight className="w-3 h-3 rotate-180" /> Back
                </button>

                <div className="flex flex-col items-center gap-3">
                  <img
                    src={userAvatarUrl}
                    alt=""
                    className="w-16 h-16 rounded-full bg-[#2a2a2a] object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <p className="text-sm font-semibold">{selectedUser.displayName || selectedUser.name}</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <RobuxHexFlat className="w-6 h-6 text-white" />
                  <span className="text-3xl font-bold tracking-tight">{finalAmount}</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleAmountSelect(amt)}
                      className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                        amount === amt && !customAmount
                          ? 'bg-[#3b82f6] text-white'
                          : 'bg-[#2a2a2a] hover:bg-[#333333] text-white'
                      }`}
                    >
                      <RobuxHexFlat className="w-3.5 h-3.5" />
                      {amt}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <RobuxHexFlat className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="number"
                    value={customAmount}
                    onChange={e => {
                      setCustomAmount(e.target.value);
                      setAmount(0);
                    }}
                    placeholder="Custom amount"
                    className="w-full bg-[#232323] border border-[#333333] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
                  />
                </div>

                <button
                  onClick={handleNext}
                  disabled={finalAmount <= 0 || finalAmount > balance}
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:bg-[#2a2a2a] disabled:text-gray-500 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] disabled:active:scale-100"
                >
                  Next
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Robux are sent instantly with no fees
                </p>
              </motion.div>
            )}

            {step === 'confirm' && selectedUser && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <button
                  onClick={() => setStep('amount')}
                  className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1 font-medium"
                >
                  <IconChevronRight className="w-3 h-3 rotate-180" /> Back
                </button>

                <div className="flex flex-col items-center gap-3">
                  <img
                    src={userAvatarUrl}
                    alt=""
                    className="w-16 h-16 rounded-full bg-[#2a2a2a] object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <p className="text-sm font-semibold">{selectedUser.displayName || selectedUser.name}</p>
                </div>

                <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Amount to send</p>
                  <div className="flex items-center justify-center gap-2">
                    <RobuxHexFlat className="w-5 h-5 text-white" />
                    <span className="text-2xl font-bold tracking-tight">{amount}</span>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98]"
                >
                  Send Robux
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-[#181818] border border-[#2a2a2a] rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl"
          >
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <IconCheck className="w-3 h-3 text-green-500" />
            </div>
            <span className="text-sm font-semibold">You sent {sentAmount} Robux</span>
            <button onClick={() => setShowToast(false)} className="text-gray-500 hover:text-white">
              <IconX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
