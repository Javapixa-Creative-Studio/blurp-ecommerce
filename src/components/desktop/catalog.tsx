"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Separator } from "@/src/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ProductCard } from "@/src/components/shared";
import { products } from "@/src/data/products";
import { categories } from "@/src/data/categories";

const sortOptions = [
  { value: "popular", label: "Terpopuler" },
  { value: "newest", label: "Terbaru" },
  { value: "price-asc", label: "Harga: Rendah ke Tinggi" },
  { value: "price-desc", label: "Harga: Tinggi ke Rendah" },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

interface DesktopCatalogProps {
  category?: string;
}

export function DesktopCatalog({ category }: DesktopCatalogProps) {
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    category ? [category] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const filteredProducts = products.filter((p) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.categorySlug)) {
      return false;
    }
    if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) {
      return false;
    }
    return true;
  });

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Beranda
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium">Katalog</span>
        </nav>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-[240px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Kategori</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(cat.slug)}
                      onCheckedChange={() => toggleCategory(cat.slug)}
                    />
                    <span className="text-sm">{cat.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      ({cat.productCount})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Ukuran</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSizes.includes(size) ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-10"
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Harga</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox />
                  <span>Di bawah Rp 100rb</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox />
                  <span>Rp 100rb - 300rb</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox />
                  <span>Rp 300rb - 500rb</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox />
                  <span>Di atas Rp 500rb</span>
                </label>
              </div>
            </div>

            <Separator />

            <Button variant="outline" className="w-full" onClick={() => {
              setSelectedCategories([]);
              setSelectedSizes([]);
            }}>
              Reset Filter
            </Button>
          </aside>

          {/* Product Grid */}
          <main>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} produk ditemukan
              </p>
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="rounded-none rounded-l-md"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="rounded-none rounded-r-md"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-3 gap-6"
                    : "grid grid-cols-1 gap-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Tidak ada produk yang sesuai filter.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedSizes([]);
                  }}
                >
                  Reset filter
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button variant="outline" size="sm" disabled>
                  ‹
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  ›
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
