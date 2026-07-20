"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Friend {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface SearchUser {
  id: number;
  name: string;
  displayName: string;
  avatarUrl?: string;
}

interface SendModalProps {
  balance: number;
  friends: Friend[];
  onSend: (amount: number, recipientName: string) => void;
  onClose: () => void;
}

const presetAmounts = [10, 50, 100, 200, 500, 1000, 2500, 5000, 10000];

export default function SendModal({ balance, friends, onSend, onClose }: SendModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SearchUser | Friend | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      performSearch(searchQuery);
    }, 400);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setSearching(true);
    setError("");
    try {
      const res = await fetch(`/api/search?keyword=${encodeURIComponent(query)}&limit=8`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setSearchResults(data.data || []);
    } catch {
      setError("Unable to search users. Please try again.");
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const pickAmount = (val: number) => {
    setAmount(val);
    setCustomAmount("");
    setError("");
  };

  const pickCustom = () => {
    const val = parseInt(customAmount, 10);
    if (!isNaN(val) && val > 0) {
      setAmount(val);
      setError("");
    }
  };

  const handleConfirm = () => {
    if (!selectedUser || !amount || amount <= 0) return;
    if (amount > balance) {
      setError("You don't have enough Robux.");
      return;
    }
    setConfirming(true);
  };

  const finalizeSend = () => {
    if (!selectedUser || !amount) return;
    const recipientName = getUserName(selectedUser);
    onSend(amount, recipientName);
  };

  const getUserName = (user: SearchUser | Friend): string => {
    if ("displayName" in user) return user.displayName || user.name;
    return user.name;
  };
  const getUserAvatar = (user: SearchUser | Friend): string | undefined => {
    if ("avatarUrl" in user) return user.avatarUrl;
    return undefined;
  };
  const userName = selectedUser ? getUserName(selectedUser) : "";
  const userAvatar = selectedUser ? getUserAvatar(selectedUser) : undefined;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1050,
        backgroundColor: "rgba(32, 34, 39, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <motion.div
        className="modal-dialog"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "480px",
          maxHeight: "85vh",
          overflow: "auto",
          boxShadow: "0 20px 48px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#272930", margin: 0 }}>
              {confirming ? "Confirm Send" : "Send Robux"}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "6px",
                color: "#494d5a",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {!confirming ? (
            <>
              {!selectedUser ? (
                <>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#272930", marginBottom: "6px" }}>
                      Search Player
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setSelectedUser(null);
                        }}
                        placeholder="Search by username..."
                        style={{
                          width: "100%",
                          padding: "10px 12px 10px 36px",
                          fontSize: "14px",
                          borderRadius: "8px",
                          border: "1px solid rgba(0,0,0,0.12)",
                          outline: "none",
                          color: "#272930",
                        }}
                      />
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6a6f81"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </div>
                  </div>

                  {searching && (
                    <div style={{ textAlign: "center", padding: "16px", color: "#6a6f81", fontSize: "14px" }}>Searching...</div>
                  )}

                  {searchResults.length > 0 && (
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "#6a6f81", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                        Search Results
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {searchResults.map((user) => (
                          <button
                            key={user.id}
                            onClick={() => {
                              setSelectedUser(user);
                              setSearchResults([]);
                              setSearchQuery("");
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              padding: "10px 12px",
                              backgroundColor: "#f7f7f8",
                              borderRadius: "8px",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left",
                              width: "100%",
                            }}
                          >
                            <img
                              src={user.avatarUrl || "/images/60bedb6518a319544c9445c519ba8d0e-robux_130x130.svg"}
                              alt=""
                              width={36}
                              height={36}
                              style={{ borderRadius: "50%", objectFit: "cover", backgroundColor: "#e3e3e6" }}
                            />
                            <div>
                              <div style={{ fontSize: "14px", fontWeight: 600, color: "#272930" }}>{user.displayName || user.name}</div>
                              <div style={{ fontSize: "12px", color: "#6a6f81" }}>@{user.name}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {friends.length > 0 && !searchQuery && (
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "#6a6f81", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                        Recent Friends
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {friends.map((friend) => (
                          <button
                            key={friend.id}
                            onClick={() => setSelectedUser(friend)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              padding: "10px 12px",
                              backgroundColor: "#f7f7f8",
                              borderRadius: "8px",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left",
                              width: "100%",
                            }}
                          >
                            <img
                              src={friend.avatarUrl || "/images/60bedb6518a319544c9445c519ba8d0e-robux_130x130.svg"}
                              alt=""
                              width={36}
                              height={36}
                              style={{ borderRadius: "50%", objectFit: "cover", backgroundColor: "#e3e3e6" }}
                            />
                            <div style={{ fontSize: "14px", fontWeight: 600, color: "#272930" }}>{friend.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      backgroundColor: "#f7f7f8",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      src={userAvatar || "/images/60bedb6518a319544c9445c519ba8d0e-robux_130x130.svg"}
                      alt=""
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%", objectFit: "cover", backgroundColor: "#e3e3e6" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "#272930" }}>{userName}</div>
                      <div style={{ fontSize: "12px", color: "#6a6f81" }}>Selected recipient</div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedUser(null);
                        setAmount(null);
                        setCustomAmount("");
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#1446ff",
                        fontSize: "13px",
                        fontWeight: 600,
                      }}
                    >
                      Change
                    </button>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#272930", marginBottom: "8px" }}>
                      Select Amount
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                      {presetAmounts.map((val) => (
                        <button
                          key={val}
                          onClick={() => pickAmount(val)}
                          style={{
                            padding: "10px",
                            fontSize: "14px",
                            fontWeight: 600,
                            borderRadius: "8px",
                            border: amount === val ? "2px solid #00b06f" : "1px solid rgba(0,0,0,0.12)",
                            backgroundColor: amount === val ? "rgba(0,176,111,0.08)" : "#fff",
                            color: amount === val ? "#00b06f" : "#272930",
                            cursor: "pointer",
                          }}
                        >
                          {val.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#272930", marginBottom: "6px" }}>
                      Custom Amount
                    </label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          if (e.target.value) pickCustom();
                        }}
                        placeholder="Enter amount..."
                        min={1}
                        style={{
                          flex: 1,
                          padding: "10px 12px",
                          fontSize: "14px",
                          borderRadius: "8px",
                          border: "1px solid rgba(0,0,0,0.12)",
                          outline: "none",
                          color: "#272930",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px",
                      backgroundColor: "#f7f7f8",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#494d5a",
                    }}
                  >
                    <span>Your Balance</span>
                    <span style={{ fontWeight: 700, color: "#272930" }}>{balance.toLocaleString()}</span>
                  </div>
                </>
              )}

              {error && (
                <div style={{ marginTop: "12px", fontSize: "13px", color: "#df281f", fontWeight: 500 }}>{error}</div>
              )}

              <div style={{ marginTop: "24px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  onClick={onClose}
                  style={{
                    padding: "10px 18px",
                    fontSize: "14px",
                    fontWeight: 600,
                    backgroundColor: "transparent",
                    color: "#494d5a",
                    border: "1px solid rgba(0,0,0,0.12)",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                {selectedUser && (
                  <button
                    onClick={handleConfirm}
                    disabled={!amount || amount <= 0}
                    style={{
                      padding: "10px 18px",
                      fontSize: "14px",
                      fontWeight: 600,
                      backgroundColor: !amount || amount <= 0 ? "#c8c8cf" : "#00b06f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: !amount || amount <= 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <img
                  src={userAvatar || "/images/60bedb6518a319544c9445c519ba8d0e-robux_130x130.svg"}
                  alt=""
                  width={64}
                  height={64}
                  style={{ borderRadius: "50%", objectFit: "cover", backgroundColor: "#e3e3e6", margin: "0 auto 12px" }}
                />
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#272930" }}>{userName}</div>
                <div style={{ fontSize: "14px", color: "#6a6f81" }}>
                  @{selectedUser?.name || ""}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "16px",
                  backgroundColor: "#f7f7f8",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src="/images/e3fed0d20e85a51518b2756e66343a5e-economy_small_dark.svg"
                  alt="Robux"
                  width={24}
                  height={24}
                />
                <span style={{ fontSize: "28px", fontWeight: 800, color: "#272930" }}>{amount?.toLocaleString()}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  fontSize: "14px",
                  color: "#494d5a",
                }}
              >
                <span>Remaining Balance</span>
                <span style={{ fontWeight: 700, color: "#272930" }}>{(balance - (amount || 0)).toLocaleString()}</span>
              </div>

              {amount && amount > balance && (
                <div style={{ marginTop: "12px", fontSize: "13px", color: "#df281f", fontWeight: 500 }}>
                  You don't have enough Robux for this transaction.
                </div>
              )}

              <div style={{ marginTop: "24px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setConfirming(false)}
                  style={{
                    padding: "10px 18px",
                    fontSize: "14px",
                    fontWeight: 600,
                    backgroundColor: "transparent",
                    color: "#494d5a",
                    border: "1px solid rgba(0,0,0,0.12)",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Back
                </button>
                <button
                  onClick={finalizeSend}
                  disabled={!amount || amount > balance}
                  style={{
                    padding: "10px 18px",
                    fontSize: "14px",
                    fontWeight: 600,
                    backgroundColor: !amount || amount > balance ? "#c8c8cf" : "#00b06f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: !amount || amount > balance ? "not-allowed" : "pointer",
                  }}
                >
                  Send Robux
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
