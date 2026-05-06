import Link from "next/link";
import { ArrowRight, Truck, CreditCard, RotateCcw, MessageCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { ProductCard } from "@/src/components/shared";
import { categories } from "@/src/data/categories";
import { getFeaturedProducts } from "@/src/data/products";

const uspItems = [
  { icon: Truck, text: "Pengiriman Nasional" },
  { icon: CreditCard, text: "Bayar VA / E-wallet" },
  { icon: RotateCcw, text: "Tukar 7 Hari" },
  { icon: MessageCircle, text: "Chat 09–21 WIB" },
];

export function DesktopHome() {
  const featuredProducts = getFeaturedProducts(4);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="relative rounded-2xl bg-gradient-to-br from-[hsl(var(--gold-light))] to-[hsl(var(--cream-dark))] p-8 flex flex-col justify-center min-h-[360px]">
            <Badge className="w-fit mb-4 bg-white/80 text-foreground hover:bg-white/90">
              KOLEKSI BARU
            </Badge>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Belanja cepat,
              <br />
              tanpa ribet daftar.
            </h1>
            <p className="text-muted-foreground mb-6 max-w-md">
              Temukan koleksi terbaik untuk gaya hidup Anda. Checkout mudah, pengiriman cepat ke seluruh Indonesia.
            </p>
            <div className="flex gap-3">
              <Button size="lg" asChild>
                <Link href="/store/catalog">
                  Belanja Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/store/catalog">Lihat Katalog</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-4">
            <div className="rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
              Banner Promo 1
            </div>
            <div className="rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
              Banner Promo 2
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Belanja per Kategori</h2>
          <Link
            href="/store/catalog"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            Lihat semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/store/catalog?category=${category.slug}`}
              className="group text-center"
            >
              <div className="aspect-square rounded-2xl bg-secondary mb-3 flex items-center justify-center text-muted-foreground text-sm group-hover:bg-secondary/80 transition-colors">
                {category.name}
              </div>
              <p className="text-sm font-medium group-hover:text-primary transition-colors">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Produk Pilihan</h2>
          <Link
            href="/store/catalog"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            Lihat semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* USP Strip */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6 p-6 bg-secondary/30 rounded-2xl">
          {uspItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
