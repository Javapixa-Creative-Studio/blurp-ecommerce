export type StorefrontMegaCategoryId =
  | "skincare"
  | "makeup"
  | "fragrance"
  | "hair"
  | "body"
  | "tools";

export interface StorefrontMegaLink {
  label: string;
  href: string;
}

export interface StorefrontMegaCategory {
  id: StorefrontMegaCategoryId;
  label: string;
  description: string;
  imageSeed: string;
  links: StorefrontMegaLink[];
}

function buildLinks(slug: StorefrontMegaCategoryId): StorefrontMegaLink[] {
  const base = `/store/catalog?category=${slug}`;
  return [
    { label: "Best Sellers", href: base },
    { label: "New Drops", href: base },
    { label: "Bundles", href: base },
    { label: "Under Rp 150k", href: base },
  ];
}

export const storefrontMegaCategories: StorefrontMegaCategory[] = [
  {
    id: "skincare",
    label: "Skincare",
    description: "Cleanse, treat, hydrate, protect.",
    imageSeed: "mega-skincare",
    links: buildLinks("skincare"),
  },
  {
    id: "makeup",
    label: "Makeup",
    description: "Everyday tint to soft matte.",
    imageSeed: "mega-makeup",
    links: buildLinks("makeup"),
  },
  {
    id: "fragrance",
    label: "Fragrance",
    description: "Warm vanilla to clean musk.",
    imageSeed: "mega-fragrance",
    links: buildLinks("fragrance"),
  },
  {
    id: "hair",
    label: "Hair",
    description: "Repair, shine, volume.",
    imageSeed: "mega-hair",
    links: buildLinks("hair"),
  },
  {
    id: "body",
    label: "Body",
    description: "Soft, hydrated, scented.",
    imageSeed: "mega-body",
    links: buildLinks("body"),
  },
  {
    id: "tools",
    label: "Tools",
    description: "Brushes, sponges, essentials.",
    imageSeed: "mega-tools",
    links: buildLinks("tools"),
  },
];
