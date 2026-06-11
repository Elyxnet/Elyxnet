export default function StatsBanner() {
  return (
    <section className="py-20 border-y border-border-default bg-bg-surface">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border-default">
        <div className="text-center px-4">
          <p className="text-4xl md:text-5xl font-bold tracking-[-0.02em] text-text-primary mb-2">12k+</p>
          <p className="text-[13px] text-text-muted font-medium uppercase tracking-wider">Active Nodes</p>
        </div>
        <div className="text-center px-4">
          <p className="text-4xl md:text-5xl font-bold tracking-[-0.02em] text-text-primary mb-2">4.2M</p>
          <p className="text-[13px] text-text-muted font-medium uppercase tracking-wider">Points Distributed</p>
        </div>
        <div className="text-center px-4">
          <p className="text-4xl md:text-5xl font-bold tracking-[-0.02em] text-text-primary mb-2">99.9%</p>
          <p className="text-[13px] text-text-muted font-medium uppercase tracking-wider">Network Uptime</p>
        </div>
        <div className="text-center px-4">
          <p className="text-4xl md:text-5xl font-bold tracking-[-0.02em] text-text-primary mb-2">847k</p>
          <p className="text-[13px] text-text-muted font-medium uppercase tracking-wider">Queries Served</p>
        </div>
      </div>
    </section>
  );
}
