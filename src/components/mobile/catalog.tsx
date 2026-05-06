"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/src/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Separator } from "@/src/components/ui/separator";
import { ProductCard } from "@/src/components/shared";
import { products } from "@/src/data/products";
import { categories } from "@/src/data/categories";

const sortOptions = [
  { value: "popular", label: "Terpopuler" },
  { value: "newest", label: "Terbaru" },
  { value: "price-asc", label: "Harga ↑" },
  { value: "price-desc", label: "Harga ↓" },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

interface MobileCatalogProps {
  category?: string;
}

export function MobileCatalog({ category }: MobileCatalogProps) {
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    category ? [category] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.categorySlug)) {
      return false;
    }
    if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) {
      return false;
    }
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) {
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

  const activeFilterCount = selectedCategories.length + selectedSizes.length;

  return (
    <div className="bg-background">
      {/* Search Bar */}
      <div className="px-4 py-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-transparent"
          />
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {activeFilterCount > 0 && (
                <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Filter</SheetTitle>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div>
                <h4 className="font-medium mb-3">Kategori</h4>
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
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Ukuran</h4>
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
            </div>

            <SheetFooter className="flex-row gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedSizes([]);
                }}
              >
                Reset
              </Button>
              <SheetClose asChild>
                <Button className="flex-1">Terapkan</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[130px] h-9">
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
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="px-4 py-2 flex flex-wrap gap-2 border-b">
          {selectedCategories.map((slug) => {
            const cat = categories.find((c) => c.slug === slug);
            return (
              <Button
                key={slug}
                variant="secondary"
                size="sm"
                className="h-7 gap-1 text-xs"
                onClick={() => toggleCategory(slug)}
              >
                {cat?.name}
                <X className="h-3 w-3" />
              </Button>
            );
          })}
          {selectedSizes.map((size) => (
            <Button
              key={size}
              variant="secondary"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => toggleSize(size)}
            >
              {size}
              <X className="h-3 w-3" />
            </Button>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="px-4 py-2 text-xs text-muted-foreground">
        {filteredProducts.length} produk
      </div>

      {/* Product Grid */}
      <div className="px-4 pb-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">
              Tidak ada produk yang sesuai.
            </p>
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setSelectedCategories([]);
                setSelectedSizes([]);
                setSearchQuery("");
              }}
            >
              Reset filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
