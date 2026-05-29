"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;

  size: string;
  color: string;

  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (
    product: Omit<CartItem, "quantity">
  ) => void;

  removeFromCart: (
    id: number,
    size: string,
    color: string
  ) => void;

  increaseQuantity: (
    id: number,
    size: string,
    color: string
  ) => void;

  decreaseQuantity: (
    id: number,
    size: string,
    color: string
  ) => void;
};

const CartContext = createContext<
  CartContextType | undefined
>(undefined);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // Agregar producto
  const addToCart = (
    product: Omit<CartItem, "quantity">
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // ❌ FIX IMPORTANTE: ahora usa size + color
  const removeFromCart = (
    id: number,
    size: string,
    color: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  // Aumentar cantidad
  const increaseQuantity = (
    id: number,
    size: string,
    color: string
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.size === size &&
        item.color === color
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Disminuir cantidad
  const decreaseQuantity = (
    id: number,
    size: string,
    color: string
  ) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id &&
          item.size === size &&
          item.color === color
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart debe usarse dentro de CartProvider"
    );
  }

  return context;
}