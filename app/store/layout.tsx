import { StorefrontLayout } from "@/src/components/storefront-layout";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StorefrontLayout>{children}</StorefrontLayout>;
}
