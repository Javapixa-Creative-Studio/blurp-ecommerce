export interface Category {
  id: string;
  slug: string;
  name: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  { id: "1", slug: "pakaian", name: "Pakaian", image: "/images/categories/pakaian.jpg", productCount: 45 },
  { id: "2", slug: "aksesoris", name: "Aksesoris", image: "/images/categories/aksesoris.jpg", productCount: 32 },
  { id: "3", slug: "sepatu", name: "Sepatu", image: "/images/categories/sepatu.jpg", productCount: 28 },
  { id: "4", slug: "tas", name: "Tas", image: "/images/categories/tas.jpg", productCount: 24 },
  { id: "5", slug: "kecantikan", name: "Kecantikan", image: "/images/categories/kecantikan.jpg", productCount: 56 },
  { id: "6", slug: "hadiah", name: "Hadiah", image: "/images/categories/hadiah.jpg", productCount: 18 },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
