import {StaticImageData} from "next/image";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  color: string;
  size: string;
  image: StaticImageData | string;
  quantity: number;
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToCart(item: Omit<CartItem, "quantity">): void {
  const cart = getCart();
  const existing = cart.findIndex(
    (c) =>
      c.productId === item.productId &&
      c.color === item.color &&
      c.size === item.size
  );
  if (existing >= 0) {
    cart[existing].quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  // Dispatch event so other components can react
  window.dispatchEvent(new Event("cartUpdated"));
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
