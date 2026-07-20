'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  IconX,
  IconSearch,
  RobuxHexFlat,
  IconLoader,
  IconTrash,
  IconSettings,
} from './icons';
import type { Friend, RobloxUser } from '@/types';

interface SettingsModalProps {
  currentUsername: string;
  currentBalance: number;
  onSave: (username: string, balance: number) => void;
  onClose: () => void;
}

export function SettingsModal({ currentUsername, currentBalance, onSave, onClose }: SettingsModalProps) {
  const [username, setUsername] = useState(currentUsername);
  const [balance, setBalance] = useState(currentBalance.toString());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RobloxUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [friends, setFriends] = useLocalStorage<Friend[]>('robux-friends', []);

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

  function addFriend(user: RobloxUser) {
    const newFriend: Friend = {
      id: user.id,
      name: user.name,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl || '',
    };
    if (!friends.find(f => f.id === user.id)) {
      setFriends([...friends, newFriend]);
    }
    setSearchQuery('');
    setSearchResults([]);
  }

  function removeFriend(id: number) {
    setFriends(friends.filter(f => f.id !== id));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#181818] rounded-2xl border border-[#2a2a2a] shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <IconSettings className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-bold tracking-tight">Settings</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#2a2a2a] rounded-lg transition-colors">
            <IconX className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-4 space-y-5 max-h-[70vh] overflow-y-auto scrollbar-hide">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              Roblox Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-[#232323] border border-[#333333] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              Robux Balance
            </label>
            <div className="relative">
              <RobuxHexFlat className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={balance}
                onChange={e => setBalance(e.target.value)}
                className="w-full bg-[#232323] border border-[#333333] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              Friends ({friends.length})
            </label>
            <div className="relative mb-3">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#232323] border border-[#333333] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all"
                placeholder="Search players to add..."
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin">
                  <IconLoader className="w-4 h-4 text-gray-500" />
                </div>
              )}
            </div>

            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden mb-3"
                >
                  {searchResults.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => addFriend(user)}
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
                      <span className="text-xs text-[#3b82f6] font-semibold">Add</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 px-3 py-2.5 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]"
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
                  <button
                    onClick={() => removeFriend(friend.id)}
                    className="p-1.5 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-500 hover:text-red-400"
                  >
                    <IconTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {friends.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-4">No friends added yet. Search above to add some.</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#2a2a2a]">
          <button
            onClick={() => onSave(username, parseInt(balance) || 0)}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors active:scale-[0.98]"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
