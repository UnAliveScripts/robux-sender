"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import SettingsModal from "@/components/SettingsModal";
import SendModal from "@/components/SendModal";

interface Friend {
  id: string;
  name: string;
  avatarUrl?: string;
}

export default function HomePage() {
  const [showSettings, setShowSettings] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [username, setUsername] = useState("RobloxUser");
  const [balance, setBalance] = useState(1250);
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "Builderman", avatarUrl: undefined },
    { id: "2", name: "Stickmasterluke", avatarUrl: undefined },
  ]);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });

  useEffect(() => {
    const savedUsername = localStorage.getItem("robux_username");
    const savedBalance = localStorage.getItem("robux_balance");
    const savedFriends = localStorage.getItem("robux_friends");
    if (savedUsername) setUsername(savedUsername);
    if (savedBalance) setBalance(parseInt(savedBalance, 10));
    if (savedFriends) {
      try {
        setFriends(JSON.parse(savedFriends));
      } catch {}
    }
  }, []);

  const saveSettings = (newUsername: string, newBalance: number, newFriends: Friend[]) => {
    setUsername(newUsername);
    setBalance(newBalance);
    setFriends(newFriends);
    localStorage.setItem("robux_username", newUsername);
    localStorage.setItem("robux_balance", String(newBalance));
    localStorage.setItem("robux_friends", JSON.stringify(newFriends));
  };

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 4000);
  }, []);

  const handleSend = (amount: number, recipientName: string) => {
    setBalance((prev) => prev - amount);
    showToast(`You sent ${amount.toLocaleString()} Robux to ${recipientName}`);
    setShowSend(false);
  };

  const packages = [
    { robux: 400, price: "$4.99", bonus: "0" },
    { robux: 800, price: "$9.99", bonus: "0" },
    { robux: 1700, price: "$19.99", bonus: "0" },
    { robux: 4500, price: "$49.99", bonus: "0" },
    { robux: 10000, price: "$99.99", bonus: "0" },
  ];

  return (
    <div className="wrap no-gutter-ads logged-out">
      <Header
        username={username}
        balance={balance}
        onOpenSettings={() => setShowSettings(true)}
        onOpenSend={() => setShowSend(true)}
      />

      <main className="container-main content-no-ads" id="container-main" tabIndex={-1}>
        <div className="content" id="content">
          <div id="robux-redesign-page" className="robux-redesign-page">
            <div className="buy-robux-background"></div>
            <div className="buy-robux-content">
              <div className="text-section">
                <h1 className="text-section-title buy-robux-section-header">Get Robux</h1>
                <p className="text-section-subtitle buy-robux-section-header" style={{ marginTop: "8px" }}>
                  Robux allows you to purchase upgrades for your avatar or buy special abilities in experiences.
                </p>
              </div>

              <div className="section-container">
                <div className="section-header" style={{ marginBottom: "16px" }}>
                  <h2 className="font-header-2 text-header" style={{ fontSize: "20px", fontWeight: 700, color: "#272930" }}>
                    Robux Packages
                  </h2>
                </div>
                <div
                  className="package-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {packages.map((pkg) => (
                    <div
                      key={pkg.robux}
                      className="package-card"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        padding: "16px",
                        textAlign: "center",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        border: "1px solid rgba(0,0,0,0.06)",
                        cursor: "pointer",
                        transition: "transform 0.15s ease, box-shadow 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)";
                      }}
                    >
                      <div style={{ marginBottom: "12px" }}>
                        <img
                          src="/images/28cef7d049096fa2b31630f1c094da3e-robux_156x169.png"
                          alt="Robux"
                          width={78}
                          height={84}
                          style={{ display: "block", margin: "0 auto" }}
                        />
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "#272930", marginBottom: "4px" }}>
                        {pkg.robux.toLocaleString()}
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#494d5a" }}>{pkg.price}</div>
                      <button
                        className="btn-buy"
                        style={{
                          marginTop: "12px",
                          width: "100%",
                          backgroundColor: "#00b06f",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          padding: "8px 0",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        onClick={() => setShowSend(true)}
                      >
                        Buy
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-container" style={{ marginTop: "32px" }}>
                <div className="section-header" style={{ marginBottom: "16px" }}>
                  <h2 className="font-header-2 text-header" style={{ fontSize: "20px", fontWeight: 700, color: "#272930" }}>
                    Roblox Plus
                  </h2>
                </div>
                <div
                  className="subscription-card"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <img
                      src="/images/bc5f0a53bc666c421d91820f8319254d-premium_120x120.svg"
                      alt="Roblox Plus"
                      width={48}
                      height={48}
                    />
                    <div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "#272930" }}>Roblox Plus</div>
                      <div style={{ fontSize: "14px", color: "#494d5a" }}>Get exclusive benefits every month</div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#494d5a" }}>
                      <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0762 7.29574C15.6479 6.96571 16.3521 6.96571 16.9238 7.29574L23.0762 10.8479C23.6479 11.1779 24 11.7878 24 12.4479V19.5521C24 20.2122 23.6479 20.8221 23.0762 21.1521L16.9238 24.7043C16.3521 25.0343 15.6479 25.0343 15.0762 24.7043L8.92376 21.1521C8.35214 20.8221 8 20.2122 8 19.5521V12.4479C8 11.7878 8.35214 11.1779 8.92376 10.8479L15.0762 7.29574ZM11.9998 13V19C11.9998 19.5523 12.4475 20 12.9998 20H18.9998C19.5521 20 19.9998 19.5523 19.9998 19V13C19.9998 12.4477 19.5521 12 18.9998 12H12.9998C12.4475 12 11.9998 12.4477 11.9998 13Z" fill="#494d5a"/>
                      </svg>
                      Receive a monthly Robux stipend
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#494d5a" }}>
                      <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0762 7.29574C15.6479 6.96571 16.3521 6.96571 16.9238 7.29574L23.0762 10.8479C23.6479 11.1779 24 11.7878 24 12.4479V19.5521C24 20.2122 23.6479 20.8221 23.0762 21.1521L16.9238 24.7043C16.3521 25.0343 15.6479 25.0343 15.0762 24.7043L8.92376 21.1521C8.35214 20.8221 8 20.2122 8 19.5521V12.4479C8 11.7878 8.35214 11.1779 8.92376 10.8479L15.0762 7.29574ZM11.9998 13V19C11.9998 19.5523 12.4475 20 12.9998 20H18.9998C19.5521 20 19.9998 19.5523 19.9998 19V13C19.9998 12.4477 19.5521 12 18.9998 12H12.9998C12.4475 12 11.9998 12.4477 11.9998 13Z" fill="#494d5a"/>
                      </svg>
                      10% bonus when buying Robux
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#494d5a" }}>
                      <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0762 7.29574C15.6479 6.96571 16.3521 6.96571 16.9238 7.29574L23.0762 10.8479C23.6479 11.1779 24 11.7878 24 12.4479V19.5521C24 20.2122 23.6479 20.8221 23.0762 21.1521L16.9238 24.7043C16.3521 25.0343 15.6479 25.0343 15.0762 24.7043L8.92376 21.1521C8.35214 20.8221 8 20.2122 8 19.5521V12.4479C8 11.7878 8.35214 11.1779 8.92376 10.8479L15.0762 7.29574ZM11.9998 13V19C11.9998 19.5523 12.4475 20 12.9998 20H18.9998C19.5521 20 19.9998 19.5523 19.9998 19V13C19.9998 12.4477 19.5521 12 18.9998 12H12.9998C12.4475 12 11.9998 12.4477 11.9998 13Z" fill="#494d5a"/>
                      </svg>
                      Trade and resell items
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#494d5a" }}>
                      <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0762 7.29574C15.6479 6.96571 16.3521 6.96571 16.9238 7.29574L23.0762 10.8479C23.6479 11.1779 24 11.7878 24 12.4479V19.5521C24 20.2122 23.6479 20.8221 23.0762 21.1521L16.9238 24.7043C16.3521 25.0343 15.6479 25.0343 15.0762 24.7043L8.92376 21.1521C8.35214 20.8221 8 20.2122 8 19.5521V12.4479C8 11.7878 8.35214 11.1779 8.92376 10.8479L15.0762 7.29574ZM11.9998 13V19C11.9998 19.5523 12.4475 20 12.9998 20H18.9998C19.5521 20 19.9998 19.5523 19.9998 19V13C19.9998 12.4477 19.5521 12 18.9998 12H12.9998C12.4475 12 11.9998 12.4477 11.9998 13Z" fill="#494d5a"/>
                      </svg>
                      Publish items and earn
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="container-footer" id="footer-container" data-is-giftcards-footer-enabled="True">
        <div className="container-footer" style={{ backgroundColor: "#f7f7f8", padding: "40px 0", marginTop: "40px" }}>
          <div className="container" style={{ maxWidth: "792px", margin: "0 auto", padding: "0 16px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#272930", marginBottom: "12px" }}>About Us</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <a href="#" style={{ fontSize: "14px", color: "#494d5a", textDecoration: "none" }}>About Roblox</a>
                  <a href="#" style={{ fontSize: "14px", color: "#494d5a", textDecoration: "none" }}>Careers</a>
                  <a href="#" style={{ fontSize: "14px", color: "#494d5a", textDecoration: "none" }}>Technology</a>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#272930", marginBottom: "12px" }}>Parents</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <a href="#" style={{ fontSize: "14px", color: "#494d5a", textDecoration: "none" }}>Parenting Guide</a>
                  <a href="#" style={{ fontSize: "14px", color: "#494d5a", textDecoration: "none" }}>Account Controls</a>
                  <a href="#" style={{ fontSize: "14px", color: "#494d5a", textDecoration: "none" }}>Safety</a>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#272930", marginBottom: "12px" }}>Legal</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <a href="#" style={{ fontSize: "14px", color: "#494d5a", textDecoration: "none" }}>Terms of Use</a>
                  <a href="#" style={{ fontSize: "14px", color: "#494d5a", textDecoration: "none" }}>Privacy Policy</a>
                  <a href="#" style={{ fontSize: "14px", color: "#494d5a", textDecoration: "none" }}>Cookie Policy</a>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "32px", paddingTop: "16px", borderTop: "1px solid rgba(0,0,0,0.08)", fontSize: "12px", color: "#6a6f81" }}>
              © 2025 Roblox Corporation. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showSettings && (
          <SettingsModal
            key="settings"
            username={username}
            balance={balance}
            friends={friends}
            onSave={saveSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSend && (
          <SendModal
            key="send"
            balance={balance}
            friends={friends}
            onSend={handleSend}
            onClose={() => setShowSend(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast.visible && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="toast-container"
            style={{
              position: "fixed",
              bottom: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1060,
              backgroundColor: "#202227",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#39c582" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
