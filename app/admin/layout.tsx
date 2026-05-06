import { AdminSidebar } from "./sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f0eee9] font-handwritten text-[#2a2520]">
      <AdminSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}