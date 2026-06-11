"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileDrawer from "@/components/layout/MobileDrawer";
import ToastProvider from "@/providers/ToastProvider";
import { useSession } from "@/hooks/useSession";
import Skeleton from "@/components/ui/Skeleton";

export default function AppLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [infraActive, setInfraActive] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/connect");
    }
  }, [isLoading, isAuthenticated, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-10 h-10 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin mx-auto" />
          <p className="text-text-muted text-sm">Loading session...</p>
        </div>
      </div>
    );
  }

  // Don't render app if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const wallet = user?.walletAddress || "0x0000…0000";

  const handleInfraToggle = (active) => {
    setInfraActive(active);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-bg-base">
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
        <main className="md:ml-56 min-h-screen bg-bg-base">
          <Topbar
            title="Dashboard"
            onMenuClick={() => setDrawerOpen(true)}
          />
          <div className="px-6 max-w-[1500px] mx-auto py-8 max-md:px-4 max-md:py-6">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
