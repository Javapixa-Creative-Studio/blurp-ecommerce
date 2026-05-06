import { mockImages } from "./mock-images";

export interface Category {
  id: string;
  slug: string;
  name: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  { 
    id: "1", 
    slug: "skincare", 
    name: "Skincare", 
    image: mockImages.category1, 
    productCount: 56 
  },
  { 
    id: "2", 
    slug: "makeup", 
    name: "Makeup", 
    image: mockImages.category2, 
    productCount: 48 
  },
  { 
    id: "3", 
    slug: "fragrance", 
    name: "Fragrance", 
    image: mockImages.category3, 
    productCount: 22 
  },
  { 
    id: "4", 
    slug: "hair", 
    name: "Hair", 
    image: mockImages.category4, 
    productCount: 18 
  },
  { 
    id: "5", 
    slug: "body", 
    name: "Body", 
    image: mockImages.category5, 
    productCount: 15 
  },
  { 
    id: "6", 
    slug: "tools", 
    name: "Tools", 
    image: mockImages.category6, 
    productCount: 12 
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}