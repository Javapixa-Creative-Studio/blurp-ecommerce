export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: { name: string; value: string }[];
  sizes: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  description: string;
  specs: { label: string; value: string }[];
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "kemeja-linen-pria",
    name: "Kemeja Linen Pria",
    sku: "KL-CR-M",
    category: "Pakaian",
    categorySlug: "pakaian",
    price: 249000,
    originalPrice: 320000,
    images: ["/images/products/kemeja-1.jpg", "/images/products/kemeja-2.jpg"],
    colors: [
      { name: "Cream", value: "#f5f0e6" },
      { name: "Olive", value: "#6b7c5e" },
      { name: "Black", value: "#1a1a1a" },
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    rating: 4.8,
    reviewCount: 124,
    description: "Kemeja linen premium dengan bahan adem dan nyaman untuk cuaca tropis Indonesia.",
    specs: [
      { label: "Bahan", value: "100% Linen" },
      { label: "Fit", value: "Regular Fit" },
    ],
    isNew: true,
  },
  {
    id: "2",
    slug: "tas-tote-canvas",
    name: "Tas Tote Canvas",
    sku: "TT-BK",
    category: "Tas",
    categorySlug: "tas",
    price: 165000,
    images: ["/images/products/tote-1.jpg"],
    colors: [
      { name: "Black", value: "#1a1a1a" },
      { name: "Cream", value: "#f5f0e6" },
    ],
    sizes: [],
    stock: 1,
    rating: 4.6,
    reviewCount: 89,
    description: "Tas tote canvas tebal dengan kapasitas besar.",
    specs: [
      { label: "Bahan", value: "Canvas 12oz" },
      { label: "Dimensi", value: "40 x 35 x 12 cm" },
    ],
  },
  {
    id: "3",
    slug: "sneaker-putih-klasik",
    name: "Sneaker Putih Klasik",
    sku: "SN-WH-41",
    category: "Sepatu",
    categorySlug: "sepatu",
    price: 489000,
    originalPrice: 599000,
    images: ["/images/products/sneaker-1.jpg"],
    colors: [{ name: "White", value: "#ffffff" }],
    sizes: ["39", "40", "41", "42", "43"],
    stock: 2,
    rating: 4.9,
    reviewCount: 256,
    description: "Sneaker klasik dengan desain minimalis.",
    specs: [
      { label: "Upper", value: "Kulit sintetis premium" },
      { label: "Sol", value: "Rubber anti-slip" },
    ],
  },
  {
    id: "4",
    slug: "topi-bucket-olive",
    name: "Topi Bucket Olive",
    sku: "TP-OL",
    category: "Aksesoris",
    categorySlug: "aksesoris",
    price: 89000,
    images: ["/images/products/bucket-1.jpg"],
    colors: [
      { name: "Olive", value: "#6b7c5e" },
      { name: "Black", value: "#1a1a1a" },
    ],
    sizes: ["M", "L"],
    stock: 32,
    rating: 4.5,
    reviewCount: 67,
    description: "Topi bucket dengan bahan cotton twill yang nyaman.",
    specs: [
      { label: "Bahan", value: "Cotton Twill" },
      { label: "Lingkar Kepala", value: "M: 56-58cm, L: 58-60cm" },
    ],
  },
  {
    id: "5",
    slug: "lip-tint-set",
    name: "Lip Tint Set Rose Collection",
    sku: "LT-RS",
    category: "Kecantikan",
    categorySlug: "kecantikan",
    price: 159000,
    originalPrice: 199000,
    images: ["/images/products/liptint-1.jpg"],
    colors: [
      { name: "Rose", value: "#d4838f" },
      { name: "Coral", value: "#e07b54" },
      { name: "Berry", value: "#8b3a62" },
    ],
    sizes: [],
    stock: 45,
    rating: 4.7,
    reviewCount: 312,
    description: "Set lip tint dengan 3 warna populer.",
    specs: [
      { label: "Isi", value: "3 x 3.5ml" },
      { label: "Finish", value: "Velvet matte" },
    ],
    isNew: true,
  },
  {
    id: "6",
    slug: "facial-serum-vitamin-c",
    name: "Facial Serum Vitamin C",
    sku: "FS-VC",
    category: "Kecantikan",
    categorySlug: "kecantikan",
    price: 285000,
    images: ["/images/products/serum-1.jpg"],
    colors: [],
    sizes: [],
    stock: 28,
    rating: 4.8,
    reviewCount: 189,
    description: "Serum wajah dengan Vitamin C 15%.",
    specs: [
      { label: "Volume", value: "30ml" },
      { label: "Kandungan", value: "15% Vitamin C, Niacinamide" },
    ],
  },
  {
    id: "7",
    slug: "hand-cream-lavender",
    name: "Hand Cream Lavender",
    sku: "HC-LV",
    category: "Kecantikan",
    categorySlug: "kecantikan",
    price: 79000,
    images: ["/images/products/handcream-1.jpg"],
    colors: [],
    sizes: [],
    stock: 56,
    rating: 4.6,
    reviewCount: 98,
    description: "Krim tangan dengan aroma lavender.",
    specs: [
      { label: "Volume", value: "50ml" },
      { label: "Aroma", value: "Lavender" },
    ],
  },
  {
    id: "8",
    slug: "kaos-polos-cream",
    name: "Kaos Polos Premium Cream",
    sku: "KS-CR-L",
    category: "Pakaian",
    categorySlug: "pakaian",
    price: 119000,
    images: ["/images/products/kaos-1.jpg"],
    colors: [
      { name: "Cream", value: "#f5f0e6" },
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#1a1a1a" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 120,
    rating: 4.7,
    reviewCount: 445,
    description: "Kaos polos dengan bahan cotton combed 30s.",
    specs: [
      { label: "Bahan", value: "Cotton Combed 30s" },
      { label: "Berat", value: "180gsm" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.slice(0, limit);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}
