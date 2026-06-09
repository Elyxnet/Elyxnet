"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Demo data — 7 days
const data = [
  { day: "Mon", points: 210 },
  { day: "Tue", points: 348 },
  { day: "Wed", points: 520 },
  { day: "Thu", points: 467 },
  { day: "Fri", points: 680 },
  { day: "Sat", points: 742 },
  { day: "Sun", points: 891 },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[--color-bg-surface] border border-[--color-border-subtle] rounded-lg px-3 py-2">
        <p className="text-[11px] text-[--color-text-muted]">{label}</p>
        <p className="text-sm font-semibold text-[--color-yellow-400]">
          +{payload[0].value} pts
        </p>
      </div>
    );
  }
  return null;
}

export default function RewardChart() {
  return (
    <div className="bg-[--color-bg-surface] border border-[--color-border-default] rounded-xl p-5">
      <h3 className="text-base font-medium text-[--color-text-primary] mb-1">
        Reward Growth
      </h3>
      <p className="text-[11px] text-[--color-text-muted] mb-4">
        Points accrued over the last 7 days
      </p>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1C1C1E"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#52525B", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#52525B", fontSize: 11 }}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="points"
              stroke="#E6B93C"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: "#E6B93C",
                stroke: "#2A2008",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
