import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-base pt-16 pb-8 px-6 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
        <div className="col-span-2 md:col-span-1">
          <span className="text-yellow-400 font-bold text-xl tracking-[-0.02em] mb-6 block">
            ELYXNET
          </span>
          <p className="text-[13px] text-text-muted leading-relaxed max-w-xs">
            The premium decentralized intelligence engine. Build the future of AI with us.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-4">Product</h4>
          <ul className="space-y-3">
            <li><Link href="/dashboard" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Dashboard</Link></li>
            <li><Link href="/infrastructure" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Infrastructure</Link></li>
            <li><Link href="/agent" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">AI Agent</Link></li>
            <li><Link href="/network" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Network Stats</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-4">Resources</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Documentation</a></li>
            <li><a href="#" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">API Reference</a></li>
            <li><a href="#" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Github</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-4">Legal</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto pt-8 border-t border-border-default flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-text-muted">
          © {new Date().getFullYear()} Elyxnet Protocol. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[12px] text-text-muted">All systems operational</span>
        </div>
      </div>
    </footer>
  );
}
