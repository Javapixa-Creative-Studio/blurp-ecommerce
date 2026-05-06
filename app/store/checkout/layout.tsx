export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0eee9] font-handwritten text-[#2a2520]">
      {children}
    </div>
  );
}