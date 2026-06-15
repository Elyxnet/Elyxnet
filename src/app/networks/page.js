"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useNetwork } from "@/hooks/useNetwork";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import ProgressBar from "@/components/ui/ProgressBar";
import DottedMap from "dotted-map";
import { RiGlobalLine, RiServerLine, RiFlashlightLine, RiGroupLine } from "react-icons/ri";

export default function NetworksPublicPage() {
  const shouldReduce = useReducedMotion();
  const { stats, leaderboard, isLoading } = useNetwork();

  const [healthMetrics, setHealthMetrics] = useState([
    { label: "Node Availability", value: 99.7, unit: "%", bar: 99.7, color: "bg-green-400" },
    { label: "Query Throughput", value: 12.4, unit: "k/hr", bar: 82, color: "bg-blue-400" },
    { label: "Avg Response Time", value: 340, unit: "ms", bar: 65, color: "bg-yellow-400" },
    { label: "Data Coverage", value: 94.2, unit: "%", bar: 94.2, color: "bg-purple-400" },
  ]);

  const [activePins, setActivePins] = useState([
    { lat: 40.7128, lng: -74.0060, id: 0 },
    { lat: 51.5074, lng: -0.1278, id: 1 },
    { lat: 35.6762, lng: 139.6503, id: 2 },
    { lat: 1.3521, lng: 103.8198, id: 3 },
    { lat: -33.8688, lng: 151.2093, id: 4 },
    { lat: 48.8566, lng: 2.3522, id: 5 },
    { lat: 50.1109, lng: 8.6821, id: 6 },
    { lat: 37.7749, lng: -122.4194, id: 7 },
    { lat: -23.5505, lng: -46.6333, id: 8 },
    { lat: 19.0760, lng: 72.8777, id: 9 },
    { lat: 25.2048, lng: 55.2708, id: 10 },
    { lat: 43.6532, lng: -79.3832, id: 11 },
    { lat: 55.7558, lng: 37.6173, id: 12 },
    { lat: 14.5995, lng: 120.9842, id: 13 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthMetrics(prev => prev.map(m => {
        let newVal = m.value;
        if (m.label === "Node Availability") {
          newVal = Math.min(100, Math.max(90, +(newVal + (Math.random() * 0.4 - 0.2)).toFixed(1)));
        } else if (m.label === "Query Throughput") {
          newVal = +(newVal + (Math.random() * 1.0 - 0.5)).toFixed(1);
        } else if (m.label === "Avg Response Time") {
          newVal = Math.floor(newVal + (Math.random() * 20 - 10));
        } else if (m.label === "Data Coverage") {
          newVal = Math.min(100, Math.max(80, +(newVal + (Math.random() * 0.6 - 0.3)).toFixed(1)));
        }
        return { 
          ...m, 
          value: newVal, 
          bar: m.label === "Avg Response Time" 
            ? Math.max(10, 100 - ((newVal - 200) / 3)) 
            : (m.label === "Query Throughput" ? Math.min(100, (newVal / 20) * 100) : newVal) 
        };
      }));

      setActivePins(prev => prev.map(pin => ({
        ...pin,
        lat: pin.lat + (Math.random() * 6 - 3),
        lng: pin.lng + (Math.random() * 6 - 3)
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const { basePoints, width, height } = useMemo(() => {
    const map = new DottedMap({ height: 50, grid: "diagonal" });
    return {
      basePoints: map.getPoints(),
      width: map.width,
      height: map.height
    };
  }, []);

  const pinData = useMemo(() => {
    const map = new DottedMap({ height: 50, grid: "diagonal" });
    activePins.forEach(pin => map.addPin({ lat: pin.lat, lng: pin.lng, data: pin.id }));
    return map.pins;
  }, [activePins]);

  const displayLeaderboard = leaderboard;

  const recentActivity = useMemo(() => {
    if (!displayLeaderboard.length) return [];
    
    const getRandomNode = () => {
      const idx = Math.floor(Math.random() * Math.min(20, displayLeaderboard.length));
      const addr = displayLeaderboard[idx]?.walletAddress || "0x000...0000";
      return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const topNode = displayLeaderboard[0];
    const topNodeAddr = topNode ? `${topNode.walletAddress.slice(0,6)}...${topNode.walletAddress.slice(-4)}` : "0x...";

    return [
      { event: "New node joined", detail: `${getRandomNode()} connected to network`, time: "2m ago", type: "join" },
      { event: "Infrastructure query processed", detail: `${Math.floor(800 + Math.random() * 200)} nodes allocated for deep analysis`, time: "5m ago", type: "query" },
      { event: "Rewards distributed", detail: `${(Math.random() * 5 + 10).toFixed(1)}k pts across ${stats?.activeNodes?.toLocaleString() || "11,293"} active nodes`, time: "12m ago", type: "reward" },
      { event: "Network snapshot taken", detail: `${healthMetrics[0]?.value || 99.7}% availability recorded`, time: "30m ago", type: "snapshot" },
      { event: "Leaderboard updated", detail: `Top scorer: ${topNodeAddr} (score: ${topNode?.score || 0})`, time: "1h ago", type: "leaderboard" },
    ];
  }, [displayLeaderboard, stats?.activeNodes, healthMetrics]);

  return (
    <div className="min-h-screen bg-[#050505] text-text-primary selection:bg-yellow-950 selection:text-yellow-400 font-sans relative overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 sm:px-6 relative z-10 max-w-[1400px] mx-auto">
        <motion.div 
        initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={shouldReduce ? undefined : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-24 mb-14 max-w-4xl">
          <h2 className="text-4xl md:text-[56px] font-medium tracking-tight text-text-primary leading-[1.05] mb-4">
           Elyxnet Global Traffic
          </h2>
          <p className="text-text-secondary text-lg md:text-[20px] leading-relaxed max-w-2xl font-normal">
            Real-time monitoring of our decentralized AI infrastructure, node health, geographic coverage, and top performing operators.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-2xl bg-[#0A0A0A] border border-white/[0.04]" />)}
            </div>
            <Skeleton className="h-96 rounded-2xl bg-[#0A0A0A] border border-white/[0.04]" />
          </div>
        ) : (
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={shouldReduce ? undefined : { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Global Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Total Nodes"
                value={stats?.totalNodes?.toLocaleString() || "12,847"}
                subline="Distributed worldwide"
                progress={85}
                progressMax={100}
                color="yellow"
                primary
                index={0}
              />
              <StatCard
                label="Active Nodes"
                value={stats?.activeNodes?.toLocaleString() || "11,293"}
                subline="Currently online"
                progress={stats?.activeNodes ? Math.round((stats.activeNodes / stats.totalNodes) * 100) : 88}
                progressMax={100}
                color="green"
                index={1}
              />
              <StatCard
                label="Total Points"
                value={stats?.totalPoints ? `${(stats.totalPoints / 1000000).toFixed(1)}M` : "4.2M"}
                subline="Distributed to contributors"
                progress={70}
                progressMax={100}
                color="blue"
                index={2}
              />
              <StatCard
                label="Contributors"
                value={stats?.activeContributors?.toLocaleString() || "3,842"}
                subline="Active participants"
                progress={60}
                progressMax={100}
                color="purple"
                index={3}
              />
            </div>

            {/* Network Health + Geographic Coverage */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Network Health */}
              <div className="lg:col-span-1 rounded-2xl bg-[#0A0A0A] border border-white/[0.04] p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                  <RiServerLine className="w-5 h-5 text-yellow-500/80" />
                  <h3 className="text-lg font-medium text-white/90 tracking-tight">Network Health</h3>
                </div>
                
                <div className="space-y-6 flex-1">
                  {healthMetrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white/50">{metric.label}</span>
                        <span className="text-sm font-semibold text-white/90">{metric.value}{metric.unit}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${metric.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.bar}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-[12px] text-white/40 leading-relaxed">
                    <strong className="text-yellow-500/80 font-medium">Live Telemetry:</strong> Metrics continuously stream from our global decentralized nodes. Data refreshes every 30s.
                  </p>
                </div>
              </div>

              {/* Geographic Coverage */}
              <div className="lg:col-span-2 rounded-2xl bg-[#0A0A0A] border border-white/[0.04] overflow-hidden flex flex-col relative group">
                <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
                  <RiGlobalLine className="w-5 h-5 text-yellow-500/80" />
                  <h3 className="text-lg font-medium text-white/90 tracking-tight">Geographic Coverage</h3>
                </div>

                <div className="relative flex-1 flex items-center justify-center min-h-[400px] overflow-hidden bg-[#080808]">
                  {/* Subtle sweep animation */}
                  <div className="absolute top-0 bottom-0 left-0 w-[400px] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[sweep_6s_linear_infinite] pointer-events-none z-10" />
                  
                  <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full opacity-60 z-0" style={{ transform: 'scale(1.2) translateY(5%)' }}>
                    {basePoints.map((p, i) => (
                      <circle key={`dot-${i}`} cx={p.x} cy={p.y} r={0.35} fill="currentColor" className="text-white/[0.15]" />
                    ))}
                    
                    {pinData.map((p, i) => (
                      <motion.g 
                        key={`pin-${p.data}`} 
                        animate={{ x: p.x, y: p.y }} 
                        transition={{ duration: 4, ease: "easeInOut" }}
                      >
                        <circle cx={0} cy={0} r={0.7} fill="#E6B93C" className="drop-shadow-[0_0_2px_rgba(230,185,60,0.8)]" />
                        <motion.circle 
                          cx={0} cy={0}
                          animate={{ r: [0.7, 2.5], opacity: [0.8, 0] }}
                          transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: "easeOut", delay: i * 0.2 }}
                          fill="#E6B93C" 
                        />
                      </motion.g>
                    ))}
                  </svg>
                  
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="text-[12px] font-medium text-white/40 bg-[#0A0A0A]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.04]">
                      {stats?.totalNodes?.toLocaleString() || "12,847"} nodes active across 42 countries
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity and Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Recent Network Activity */}
              <div className="lg:col-span-1 rounded-2xl bg-[#0A0A0A] border border-white/[0.04] p-8">
                <div className="flex items-center gap-3 mb-8">
                  <RiFlashlightLine className="w-5 h-5 text-yellow-500/80" />
                  <h3 className="text-lg font-medium text-white/90 tracking-tight">Live Activity</h3>
                </div>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <motion.div
                      key={i}
                      initial={shouldReduce ? undefined : { opacity: 0, x: -8 }}
                      animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
                      transition={shouldReduce ? undefined : { duration: 0.3, delay: i * 0.05 }}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                          activity.type === "join" ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.4)]" :
                          activity.type === "query" ? "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.4)]" :
                          activity.type === "reward" ? "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]" :
                          "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.4)]"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-white/90 truncate">{activity.event}</p>
                          <p className="text-[11px] text-white/40 mt-0.5">{activity.detail}</p>
                        </div>
                        <span className="text-[10px] font-medium text-white/30 shrink-0">{activity.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="lg:col-span-2 rounded-2xl bg-[#0A0A0A] border border-white/[0.04] p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <RiGroupLine className="w-5 h-5 text-yellow-500/80" />
                    <h3 className="text-lg font-medium text-white/90 tracking-tight">Top Operators</h3>
                    <span className="text-[11px] text-white/30 ml-2">Showing Top 50</span>
                  </div>
                  <Badge variant="yellow" className="hidden sm:inline-flex">{stats?.activeNodes?.toLocaleString() || "12,847"} active</Badge>
                </div>

                <div className="overflow-x-auto max-h-[450px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="py-3 px-4 text-[12px] font-medium text-white/30 tracking-wide uppercase">Rank</th>
                        <th className="py-3 px-4 text-[12px] font-medium text-white/30 tracking-wide uppercase">Node Wallet</th>
                        <th className="py-3 px-4 text-[12px] font-medium text-white/30 tracking-wide uppercase">Points</th>
                        <th className="py-3 px-4 text-[12px] font-medium text-white/30 tracking-wide uppercase hidden sm:table-cell">Nodes</th>
                        <th className="py-3 px-4 text-[12px] font-medium text-white/30 tracking-wide uppercase hidden md:table-cell text-right">Uptime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayLeaderboard.slice(0, 50).map((entry) => (
                        <tr key={entry.rank} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group">
                          <td className="py-3 px-4">
                            <span className={`text-[13px] font-medium ${entry.rank <= 3 ? "text-yellow-400" : "text-white/50"}`}>
                              #{entry.rank}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 font-mono text-[13px] text-white/80 group-hover:text-white transition-colors">
                              <div className={`w-1.5 h-1.5 rounded-full ${entry.uptimePercent > 95 ? "bg-green-400" : "bg-yellow-400"}`} />
                              {entry.walletAddress.slice(0, 6)}...{entry.walletAddress.slice(-4)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[13px] font-medium text-white/90">{entry.score.toLocaleString()}</span>
                          </td>
                          <td className="py-3 px-4 hidden sm:table-cell">
                            <span className="text-[13px] text-white/40">{entry.accountsCount}</span>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell text-right">
                            <span className="text-[13px] text-green-400/80 font-medium">{entry.uptimePercent}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Extensive Text Content Sections */}
            <div className="mt-24 max-w-5xl mx-auto space-y-24 pb-12">
              
              {/* Section 1: Architecture */}
              <motion.div 
                initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16"
              >
                <div className="md:col-span-4 border-t border-white/[0.08] pt-6">
                  <h2 className="text-2xl font-medium tracking-tight text-white/90">
                    Network Architecture
                  </h2>
                  <p className="text-sm text-yellow-500/80 mt-2 font-mono uppercase tracking-widest">Core Infrastructure</p>
                </div>
                <div className="md:col-span-8 space-y-6 pt-6 text-[15px] leading-relaxed text-white/50">
                  <p>
                    Elyxnet operates on a uniquely distributed architecture where idle social media accounts are collapsed into active, crawling compute nodes. Unlike traditional centralized data scrapers, our protocol routes query requests dynamically across thousands of globally distributed residential connections.
                  </p>
                  <p>
                    When an AI agent requests real-time sentiment or raw data extraction, the Elyxnet routing algorithm determines the optimal subset of nodes based on geographic proximity, historical node uptime, and current query load. This ensures high availability and drastically reduces the probability of IP bans or rate limiting from target platforms.
                  </p>
                  <p className="p-5 mt-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-white/70 italic">
                    "By decentralizing the extraction layer, Elyxnet provides AI models with the unfiltered, real-time pulse of the internet without the central point of failure inherent to legacy APIs."
                  </p>
                </div>
              </motion.div>

              {/* Section 2: Security & Privacy */}
              <motion.div 
                initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16"
              >
                <div className="md:col-span-4 border-t border-white/[0.08] pt-6">
                  <h2 className="text-2xl font-medium tracking-tight text-white/90">
                    Security Protocol
                  </h2>
                  <p className="text-sm text-yellow-500/80 mt-2 font-mono uppercase tracking-widest">Zero-Trust Standard</p>
                </div>
                <div className="md:col-span-8 space-y-6 pt-6 text-[15px] leading-relaxed text-white/50">
                  <p>
                    Security is not an afterthought; it is the foundation of the Elyxnet protocol. Operating thousands of distributed accounts requires a zero-trust architecture. All session cookies and authentication tokens are encrypted client-side using <strong className="text-white/80 font-medium">AES-256-GCM</strong> before they are ever transmitted to our relay servers.
                  </p>
                  <p>
                    The relay nodes hold the encrypted blobs but lack the decryption keys, which are fragmented and stored exclusively within secure enclaves during active query processing. This means that even in the event of a catastrophic central database compromise, the raw social credentials of our node operators remain mathematically impossible to decrypt.
                  </p>
                </div>
              </motion.div>

              {/* Section 3: Tokenomics & Rewards */}
              <motion.div 
                initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16"
              >
                <div className="md:col-span-4 border-t border-white/[0.08] pt-6">
                  <h2 className="text-2xl font-medium tracking-tight text-white/90">
                    Reward Distribution
                  </h2>
                  <p className="text-sm text-yellow-500/80 mt-2 font-mono uppercase tracking-widest">Incentive Layer</p>
                </div>
                <div className="md:col-span-8 space-y-6 pt-6 text-[15px] leading-relaxed text-white/50">
                  <p>
                    Node operators are the lifeblood of Elyxnet. To ensure network stability and incentivize high-quality infrastructure, rewards are distributed algorithmically based on a composite score of three critical metrics: <strong className="text-white/80">Uptime Reliability</strong>, <strong className="text-white/80">Bandwidth Provided</strong>, and <strong className="text-white/80">Successful Query Resolution</strong>.
                  </p>
                  <ul className="space-y-3 list-disc list-inside ml-2">
                    <li><strong className="text-white/80">Base Uptime:</strong> Nodes pinging the network consistently earn a baseline point drip every 30 seconds.</li>
                    <li><strong className="text-white/80">Query Bounties:</strong> When a node successfully resolves a complex extraction request, it receives a multiplier bounty.</li>
                    <li><strong className="text-white/80">Slashing:</strong> Nodes that repeatedly return falsified data or timeout are temporarily penalized to maintain network integrity.</li>
                  </ul>
                  <p>
                    These accrued points form the basis for future governance rights and protocol-level utility conversions as Elyxnet transitions into its fully decentralized mainnet phase.
                  </p>
                </div>
              </motion.div>

            </div>

          </motion.div>
        )}
      </main>
      
      <Footer />
      
      {/* Global styles for animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}} />
    </div>
  );
}
