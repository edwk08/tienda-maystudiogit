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

  addProduct: (
    product: Product
  ) => Promise<void>;

  updateProduct: (
    product: Product
  ) => Promise<void>;

  deleteProduct: (
    id: number
  ) => Promise<void>;
};

const ProductContext = createContext<
  ProductContextType | undefined
>(undefined);

export function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] =
    useState<Product[]>([]);

  // cargar productos desde supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } =
        await supabase
          .from("products")
          .select("*")
          .order("id", {
            ascending: false,
          });

      if (error) {
        console.error(error);
        return;
      }

      setProducts(data as Product[]);
    };

    fetchProducts();
  }, []);

  // agregar producto
  const addProduct = async (
    product: Product
  ) => {
    const {
      id,
      ...productWithoutId
    } = product;

    const { data, error } =
      await supabase
        .from("products")
        .insert([productWithoutId])
        .select();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setProducts((prev) => [
        ...data,
        ...prev,
      ]);
    }
  };

  // editar producto
  const updateProduct = async (
    updated: Product
  ) => {
    const {
      id,
      ...productWithoutId
    } = updated;

    const { data, error } =
      await supabase
        .from("products")
        .update(productWithoutId)
        .eq("id", id)
        .select();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id
            ? (data[0] as Product)
            : product
        )
      );
    }
  };

  // eliminar producto
  const deleteProduct = async (
    id: number
  ) => {
    const { error } =
      await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setProducts((prev) =>
      prev.filter((p) => p.id !== id)
    );
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