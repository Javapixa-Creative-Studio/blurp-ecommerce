import { products, Product } from "./products";

export interface CartItem {
  productId: string;
  product: Product;
  color: string;
  size: string;
  quantity: number;
}

// Mock cart data
export const cartItems: CartItem[] = [
  {
    productId: "1",
    product: products[0],
    color: "Cream",
    size: "M",
    quantity: 1,
  },
  {
    productId: "3",
    product: products[2],
    color: "White",
    size: "42",
    quantity: 1,
  },
];

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
