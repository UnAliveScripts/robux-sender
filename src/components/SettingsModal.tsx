"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Friend {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface SettingsModalProps {
  username: string;
  balance: number;
  friends: Friend[];
  onSave: (username: string, balance: number, friends: Friend[]) => void;
  onClose: () => void;
}

export default function SettingsModal({ username, balance, friends, onSave, onClose }: SettingsModalProps) {
  const [localUsername, setLocalUsername] = useState(username);
  const [localBalance, setLocalBalance] = useState(balance);
  const [localFriends, setLocalFriends] = useState<Friend[]>(friends);
  const [newFriendName, setNewFriendName] = useState("");

  const handleSave = () => {
    onSave(localUsername, localBalance, localFriends);
    onClose();
  };

  const addFriend = () => {
    if (!newFriendName.trim()) return;
    const newFriend: Friend = {
      id: Math.random().toString(36).substring(2, 9),
      name: newFriendName.trim(),
    };
    setLocalFriends((prev) => [...prev, newFriend]);
    setNewFriendName("");
  };

  const removeFriend = (id: string) => {
    setLocalFriends((prev) => prev.filter((f) => f.id !== id));
  };

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
          maxWidth: "420px",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 20px 48px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#272930", margin: 0 }}>Settings</h2>
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

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#272930", marginBottom: "6px" }}>
                Username
              </label>
              <input
                type="text"
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: "14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  outline: "none",
                  color: "#272930",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#272930", marginBottom: "6px" }}>
                Robux Balance
              </label>
              <input
                type="number"
                value={localBalance}
                onChange={(e) => setLocalBalance(parseInt(e.target.value || "0", 10))}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: "14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  outline: "none",
                  color: "#272930",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#272930", marginBottom: "6px" }}>
                Recent Friends
              </label>
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <input
                  type="text"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                  placeholder="Add friend name..."
                  onKeyDown={(e) => e.key === "Enter" && addFriend()}
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
                <button
                  onClick={addFriend}
                  style={{
                    padding: "10px 14px",
                    fontSize: "14px",
                    fontWeight: 600,
                    backgroundColor: "#00b06f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {localFriends.map((friend) => (
                  <div
                    key={friend.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      backgroundColor: "#f7f7f8",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#272930",
                    }}
                  >
                    <span>{friend.name}</span>
                    <button
                      onClick={() => removeFriend(friend.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#df281f",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {localFriends.length === 0 && (
                  <div style={{ fontSize: "13px", color: "#6a6f81", padding: "8px 0" }}>No friends added yet.</div>
                )}
              </div>
            </div>
          </div>

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
            <button
              onClick={handleSave}
              style={{
                padding: "10px 18px",
                fontSize: "14px",
                fontWeight: 600,
                backgroundColor: "#00b06f",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
