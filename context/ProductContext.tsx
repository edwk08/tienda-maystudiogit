"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  colors: string[];
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
};

const ProductContext = createContext<
  ProductContextType | undefined
>(undefined);

export function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  // 🔁 FUNCIÓN CENTRAL: siempre trae datos reales
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error cargando productos:", error);
      return;
    }

    setProducts(data as Product[]);
  };

  // 📦 Cargar al iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  // ➕ AGREGAR
  const addProduct = async (product: Product) => {
    const { id, ...productWithoutId } = product;

    const { error } = await supabase
      .from("products")
      .insert([productWithoutId]);

    if (error) {
      console.error("Error agregando producto:", error);
      return;
    }

    await fetchProducts();
  };

  // ✏️ ACTUALIZAR
  const updateProduct = async (updated: Product) => {
    const { id, ...productWithoutId } = updated;

    const { error } = await supabase
      .from("products")
      .update(productWithoutId)
      .eq("id", id);

    if (error) {
      console.error("Error actualizando producto:", error);
      return;
    }

    await fetchProducts();
  };

  // 🗑️ ELIMINAR
  const deleteProduct = async (id: number) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error eliminando producto:", error);
      return;
    }

    await fetchProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProducts debe usarse dentro de ProductProvider"
    );
  }

  return context;
}