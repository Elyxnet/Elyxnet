"use client";

export default function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`bg-bg-surface animate-pulse rounded ${className}`}
      {...props}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl p-5 border border-border-default bg-bg-surface">
      <Skeleton className="h-3 w-20 mb-3 rounded-md" />
      <Skeleton className="h-7 w-24 mb-2 rounded-md" />
      <Skeleton className="h-2.5 w-16 mb-3 rounded-md" />
      <Skeleton className="h-1 w-full rounded-full" />
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border-default">
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-3.5 w-36 mb-1.5 rounded-md" />
        <Skeleton className="h-2.5 w-20 rounded-md" />
      </div>
      <Skeleton className="h-4 w-14 rounded-md" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl p-4 border border-border-default bg-bg-raised">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="w-5 h-5 rounded shrink-0" />
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>
      <Skeleton className="h-3 w-full mb-2 rounded-md" />
      <Skeleton className="h-3 w-2/3 rounded-md" />
    </div>
  );
}
