import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { ProductCard } from "@/src/components/shared";
import { categories } from "@/src/data/categories";
import { getFeaturedProducts } from "@/src/data/products";

export function MobileHome() {
  const featuredProducts = getFeaturedProducts(4);

  return (
    <div className="bg-background">
      {/* Search Bar */}
      <div className="px-4 py-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari produk..."
            className="pl-10 bg-secondary/50 border-transparent"
          />
        </div>
      </div>

      {/* Hero Banner */}
      <section className="p-4">
        <div className="rounded-xl bg-gradient-to-br from-[hsl(var(--gold-light))] to-[hsl(var(--cream-dark))] p-5">
          <Badge className="mb-3 bg-white/80 text-foreground text-xs">
            KOLEKSI BARU
          </Badge>
          <h1 className="text-xl font-bold leading-tight mb-3">
            Belanja cepat,
            <br />
            tanpa daftar.
          </h1>
          <Button size="sm" asChild>
            <Link href="/store/catalog">
              Belanja
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-4">
        <h2 className="font-semibold mb-3">Kategori</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.id}
              href={`/store/catalog?category=${category.slug}`}
              className="text-center"
            >
              <div className="aspect-square rounded-xl bg-secondary mb-2 flex items-center justify-center text-muted-foreground text-xs">
                {category.name.slice(0, 3)}
              </div>
              <p className="text-xs">{category.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Produk Pilihan</h2>
          <Link
            href="/store/catalog"
            className="text-xs text-muted-foreground flex items-center gap-1"
          >
            Semua
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
