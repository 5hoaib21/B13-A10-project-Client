import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen mt-20">
    <div className="flex">

      <DashboardSidebar />
      <main className="m-10"> {children}</main>
    </div>
    </div>
  );
}
