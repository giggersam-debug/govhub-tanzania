"use client";

import { useMemo } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type DownloadRow = { created_at: string; form_id: string; forms: { title: string } | { title: string }[] | null };

export default function AnalyticsCharts({ downloads }: { downloads: DownloadRow[] }) {
  const byDay = useMemo(() => {
    const map: Record<string, number> = {};
    downloads.forEach((d) => {
      const day = d.created_at.slice(0, 10);
      map[day] = (map[day] ?? 0) + 1;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date: date.slice(5), count }));
  }, [downloads]);

  const byForm = useMemo(() => {
    const map: Record<string, number> = {};
    downloads.forEach((d) => {
      const formsField = d.forms;
      const title = Array.isArray(formsField) ? formsField[0]?.title : formsField?.title;
      const key = title ?? "Unknown form";
      map[key] = (map[key] ?? 0) + 1;
    });
    return Object.entries(map)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([title, count]) => ({ title, count }));
  }, [downloads]);

  return (
    <div className="space-y-6">
      <div className="bg-paper border border-line rounded-card p-5">
        <h2 className="font-display text-base mb-4">Downloads — last 14 days</h2>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <LineChart data={byDay}>
              <CartesianGrid stroke="#DBE3D6" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#0B6E4F" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-paper border border-line rounded-card p-5">
        <h2 className="font-display text-base mb-4">Most downloaded forms</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={byForm} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid stroke="#DBE3D6" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="title" width={160} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#F0B429" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {byForm.length === 0 && <p className="text-inksoft text-sm mt-2">No downloads recorded in this window yet.</p>}
      </div>
    </div>
  );
}
