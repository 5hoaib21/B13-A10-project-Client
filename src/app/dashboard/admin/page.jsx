
import AnalyticsDashboardView from "@/components/dashboard/AnalyticsDashboardView";
import { getAdminAnalyticsAction } from "@/lib/api/analytics";
import React from "react";


const AdminAnalyticsPage = async () => {
  const analyticsData = await getAdminAnalyticsAction();

 const defaultStats = { totalUsers: 0, totalPrompts: 0, totalReviews: 0, totalCopies: 0, totalRevenue: 0 };
  const stats = analyticsData?.stats || defaultStats;
  const engineData = analyticsData?.engineData || [];

  return (
    <div className="w-full bg-white min-h-screen p-6 text-zinc-900">
      <div className="mb-8 bg-white">
        <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">Administrative Analytics</h1>
        <p className="text-sm text-zinc-400 mt-1">Real-time systems breakdown built dynamically from the database.</p>
      </div>
      <AnalyticsDashboardView stats={stats} engineData={engineData} />
    </div>
  );
};

export default AdminAnalyticsPage;