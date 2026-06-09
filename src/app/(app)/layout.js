"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileDrawer from "@/components/layout/MobileDrawer";
import ToastProvider from "@/providers/ToastProvider";

// Page title mapping
const pageTitles = {
  "/dashboard": "Dashboard",
  "/infrastructure": "Infrastructure",
  "/agent": "AI Agent",
  "/rewards": "Rewards",
  "/network": "Network",
};

export default function AppLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [infraActive, setInfraActive] = useState(false);

  // Demo wallet — in production this comes from WalletConnect context
  const wallet = "0x1a2b3c4d5e6f7890abcdef1234567890abcd4f9c";

  const handleInfraToggle = (active) => {
    setInfraActive(active);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[--color-bg-base]">
        {/* Desktop Sidebar */}
        <Sidebar
          wallet={wallet}
          infraActive={infraActive}
          onInfraToggle={handleInfraToggle}
        />

        {/* Mobile Drawer */}
        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          wallet={wallet}
          infraActive={infraActive}
          onInfraToggle={handleInfraToggle}
        />

        {/* Main content */}
        <main className="md:ml-56 min-h-screen bg-[--color-bg-base]">
          <Topbar
            title="Dashboard"
            onMenuClick={() => setDrawerOpen(true)}
          />
          <div className="px-6 py-8 max-md:px-4 max-md:py-6">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
