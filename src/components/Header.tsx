"use client";

import React from "react";

interface HeaderProps {
  username: string;
  balance: number;
  onOpenSettings: () => void;
  onOpenSend: () => void;
}

export default function Header({ username, balance, onOpenSettings, onOpenSend }: HeaderProps) {
  return (
    <div id="navigation-container" className="builder-font ixp-marketplace-rename-treatment">
      <div id="header" className="navbar-fixed-top rbx-header" role="navigation">
        <div className="container-fluid">
          <div className="rbx-navbar-header">
            <div id="header-menu-icon" className="rbx-nav-collapse">
              <button type="button" className="btn-navigation-nav-menu-md menu-button">
                <span className="icon-nav-menu"></span>
              </button>
            </div>
            <div className="navbar-header">
              <a id="nav-logo-link" className="navbar-brand" href="/">
                <span className="icon-logo"></span>
                <span className="icon-logo-r"></span>
              </a>
            </div>
          </div>
          <ul className="nav rbx-navbar hidden-xs hidden-sm col-md-5 col-lg-4">
            <li>
              <a id="nav-charts-md-link" className="font-header-2 nav-menu-title text-header" href="/charts">
                Charts
              </a>
            </li>
            <li>
              <a id="nav-marketplace-md-link" className="font-header-2 nav-menu-title text-header" href="/catalog">
                Marketplace
              </a>
            </li>
            <li>
              <a id="header-develop-md-link" className="font-header-2 nav-menu-title text-header" href="/develop">
                Create
              </a>
            </li>
            <li id="navigation-robux-container">
              <a className="font-header-2 nav-menu-title text-header" href="/upgrades/robux">
                <span className="icon-robux-28x28 icon-robux"></span>
                <span>Robux</span>
              </a>
            </li>
          </ul>
          <div id="right-navigation-header" className="rbx-navbar-right">
            <div className="navbar-right">
              <ul className="nav navbar-right">
                <li className="navbar-right-item">
                  <button
                    type="button"
                    className="btn-growth-md btn-min-width"
                    onClick={onOpenSend}
                    style={{
                      backgroundColor: "#00b06f",
                      borderColor: "#00b06f",
                      color: "#fff",
                      fontWeight: 500,
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    Send
                  </button>
                </li>
                <li className="navbar-right-item">
                  <button
                    type="button"
                    className="btn-growth-md btn-min-width"
                    onClick={onOpenSettings}
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid rgba(255,255,255,0.3)",
                      color: "#fff",
                      fontWeight: 500,
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      lineHeight: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                    Settings
                  </button>
                </li>
                <li className="navbar-right-item">
                  <div
                    className="rbx-menu-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 500,
                      padding: "8px 12px",
                    }}
                  >
                    <span className="icon-robux-16x16 icon-robux-gold-16x16" style={{ backgroundImage: "url(/images/e3fed0d20e85a51518b2756e66343a5e-economy_small_dark.svg)", width: 20, height: 20, display: "inline-block", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}></span>
                    <span>{balance.toLocaleString()}</span>
                  </div>
                </li>
                <li className="navbar-right-item">
                  <div
                    className="rbx-menu-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 500,
                      padding: "8px 12px",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>{username || "Guest"}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
