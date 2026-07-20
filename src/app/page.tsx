'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  RobuxIcon,
  RobuxHexFlat,
  IconHome,
  IconProfile,
  IconPlus,
  IconMessages,
  IconFriends,
  IconAvatar,
  IconInventory,
  IconTrade,
  IconStore,
  IconGamepad,
  IconTag,
  IconTagUp,
  IconArrowUp,
  IconArrowsHorizontal,
  IconChevronRight,
  IconGift,
  IconPaw,
  IconEgg,
} from '@/components/icons';

const bonusPackages = [
  { robux: 24000, extra: 22500, bonus: 1500, price: '£199.99', popular: false },
  { robux: 11000, extra: 10000, bonus: 1000, price: '£99.99', popular: false },
  { robux: 5250, extra: 4500, bonus: 750, price: '£49.99', popular: false },
  { robux: 3625, extra: 3150, bonus: 475, price: '£34.99', popular: false },
  { robux: 2000, extra: 1700, bonus: 300, price: '£19.99', popular: true },
];

const standardPackages = [
  { robux: 1500, extra: 1200, bonus: 300, price: '£14.99' },
  { robux: 1000, extra: 800, bonus: 200, price: '£9.99' },
  { robux: 500, extra: 400, bonus: 100, price: '£4.99' },
];

const plusBenefits = [
  { Icon: IconTag, title: '10% off in-game items, avatars and more', desc: 'Spend less Robux starting now' },
  { Icon: IconTagUp, title: '20% off these items after 2 months', desc: 'Double your discount and lock it in' },
  { Icon: IconGamepad, title: 'Free and unlimited private servers', desc: 'Choose who you play with' },
  { Icon: RobuxIcon, title: 'Send Robux for free', desc: 'Transfers may need parental approval' },
  { Icon: IconArrowsHorizontal, title: 'Trade and resell limited items', desc: 'Build your collection of rare avatars' },
  { Icon: IconArrowUp, title: 'Publish games and avatar items', desc: 'Reach millions of players' },
];

const leftNavItems = [
  { icon: IconHome, label: 'Home', active: false },
  { icon: IconProfile, label: 'Profile', active: false },
  { icon: IconPlus, label: 'Roblox Plus', active: true },
  { icon: IconMessages, label: 'Messages', active: false, badge: 5 },
  { icon: IconFriends, label: 'Friends', active: false, badge: 9 },
  { icon: IconAvatar, label: 'Avatar', active: false },
  { icon: IconInventory, label: 'Inventory', active: false },
  { icon: IconTrade, label: 'Trade', active: false },
  { icon: IconStore, label: 'Official Store', active: false },
];

export default function Home() {
  const [settings, setSettings] = useLocalStorage('robux-settings', {
    username: 'RoBeatsGreenSword',
    robuxBalance: 237,
  });

  const username = settings.username || 'RoBeatsGreenSword';
  const balance = settings.robuxBalance ?? 237;

  const handleSettingsChange = (newUsername: string, newBalance: number) => {
    setSettings({ username: newUsername, robuxBalance: newBalance });
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Header username={username} balance={balance} onSettingsChange={handleSettingsChange} />

      {/* Top Balance Bar */}
      <div className="bg-[#181818] border-b border-[#222222]">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="opacity-75">{username} (0)</span>
          <span className="mx-1">|</span>
          <span>Balance: {balance.toLocaleString()} Robux</span>
        </div>
      </div>

      {/* Hero Grid Background */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111111]/60 to-[#111111]" />

        <div className="relative max-w-3xl mx-auto px-4 pt-10 pb-6 text-center">
          <h1 className="text-[28px] md:text-[36px] font-extrabold leading-tight tracking-tight">
            Enjoy up to 25%<br />more Robux
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-20 space-y-8 relative">
        {/* Bonus Item Section */}
        <section className="animate-slide-up">
          <h2 className="text-[15px] font-bold mb-3 tracking-tight">Bonus item we picked for you</h2>
          <div className="bg-[#181818] rounded-2xl border border-[#2a2a2a] overflow-hidden">
            <div className="relative h-36 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-blue-500 flex items-center justify-center shadow-xl border border-white/10">
                    <IconGift className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <IconPaw className="w-3.5 h-3.5 text-gray-300" />
                      <p className="text-sm font-bold">Adopt Me!</p>
                      <IconEgg className="w-3.5 h-3.5 text-gray-300" />
                    </div>
                    <p className="text-xs text-gray-400">+1 Pet Per Slot</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 space-y-1.5">
              {bonusPackages.map((pkg) => (
                <div
                  key={pkg.robux}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1f1f1f] transition-colors"
                >
                  <div className="flex items-center gap-1.5 flex-1 flex-wrap">
                    <RobuxHexFlat className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-sm font-bold">{pkg.robux.toLocaleString()}</span>
                    <span className="text-xs text-gray-600 line-through">{pkg.extra.toLocaleString()}</span>
                    <span className="text-[10px] bg-[#232323] text-gray-400 px-1.5 py-0.5 rounded-md font-medium">
                      +{pkg.bonus} more
                    </span>
                    {pkg.popular && (
                      <span className="text-[10px] bg-[#232323] text-gray-400 px-1.5 py-0.5 rounded-md font-medium flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        Popular
                      </span>
                    )}
                  </div>
                  <button className={`px-5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                    pkg.popular
                      ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
                      : 'bg-[#2a2a2a] hover:bg-[#333333] text-white'
                  }`}>
                    {pkg.price}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Robux Packages */}
        <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-[15px] font-bold mb-3 tracking-tight">Robux packages</h2>
          <div className="bg-[#181818] rounded-2xl border border-[#2a2a2a] p-3 space-y-1.5">
            {standardPackages.map((pkg) => (
              <div
                key={pkg.robux}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1f1f1f] transition-colors"
              >
                <div className="flex items-center gap-1.5 flex-1 flex-wrap">
                  <RobuxHexFlat className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="text-sm font-bold">{pkg.robux.toLocaleString()}</span>
                  <span className="text-xs text-gray-600 line-through">{pkg.extra.toLocaleString()}</span>
                  <span className="text-[10px] bg-[#232323] text-gray-400 px-1.5 py-0.5 rounded-md font-medium">
                    +{pkg.bonus} more
                  </span>
                </div>
                <button className="px-5 py-2 rounded-xl text-xs font-bold bg-[#2a2a2a] hover:bg-[#333333] text-white transition-all active:scale-95">
                  {pkg.price}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* New on Roblox - Plus Section */}
        <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <RobuxHexFlat className="w-5 h-5 text-white" />
              <h2 className="text-[15px] font-bold tracking-tight">New on Roblox</h2>
            </div>
            <button className="text-xs text-gray-400 hover:text-white transition-colors font-medium">
              Learn more
            </button>
          </div>

          <div className="bg-[#181818] rounded-2xl border border-[#2a2a2a] overflow-hidden">
            {/* Plus Hero */}
            <div className="relative p-8 text-center">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <RobuxHexFlat className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold">Roblox Plus</span>
                </div>
                <h3 className="text-2xl md:text-[32px] font-extrabold mb-2 tracking-tight">
                  Our best deal. Unlock 20% off.
                </h3>
                <p className="text-sm text-gray-400 mb-5">1 month free, then CA$6.99/month</p>
                <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold px-8 py-3 rounded-xl transition-all active:scale-95 text-sm">
                  Try it for free
                </button>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plusBenefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#232323] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <benefit.Icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-snug">{benefit.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 pb-4">
              <p className="text-[11px] text-gray-600 leading-relaxed">
                By clicking &quot;Try it for free,&quot; you agree to the <span className="text-[#3b82f6] hover:underline cursor-pointer">Roblox Subscription Terms</span>. Your 1-month free trial ends on May 30, 2026 and you will be charged automatically each month and can cancel at any time.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Left Nav Sidebar Mock (desktop only, absolute positioning within content area) */}
      <div className="fixed left-4 top-32 hidden xl:flex flex-col w-56">
        <div className="space-y-0.5">
          {leftNavItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                item.active ? 'bg-[#2a2a2a] font-semibold text-white' : 'hover:bg-[#1f1f1f] text-gray-400'
              }`}
            >
              <item.icon className={`w-[18px] h-[18px] ${item.active ? 'text-white' : 'text-gray-500'}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && (
                <span className="w-5 h-5 rounded-full bg-[#3b82f6] text-[10px] font-bold flex items-center justify-center text-white">
                  {item.badge}
                </span>
              )}
              {item.active && <IconChevronRight className="w-4 h-4 text-gray-500" />}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#222222] bg-[#111111]">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <RobuxHexFlat className="w-5 h-5 text-white fill-white" />
              <span className="font-extrabold text-sm tracking-tight">Roblox</span>
            </div>
            <div className="flex items-center gap-5 text-[11px] text-gray-500 flex-wrap justify-center">
              <span className="hover:text-white cursor-pointer transition-colors">About Us</span>
              <span className="hover:text-white cursor-pointer transition-colors">Jobs</span>
              <span className="hover:text-white cursor-pointer transition-colors">Blog</span>
              <span className="hover:text-white cursor-pointer transition-colors">Parents</span>
              <span className="hover:text-white cursor-pointer transition-colors">Gift Cards</span>
              <span className="hover:text-white cursor-pointer transition-colors">Help</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            </div>
            <p className="text-[11px] text-gray-600">&copy;2026 Roblox Corporation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
