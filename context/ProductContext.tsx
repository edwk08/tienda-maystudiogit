"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { initialProducts } from "@/lib/products";
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
    useState<Product[]>(initialProducts);

  // cargar productos desde supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } =
        await supabase
          .from("products")
          .select("*");

      if (error) {
        console.error(error);
        return;
      }

      if (data && data.length > 0) {
        setProducts(data as Product[]);
      }
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
    console.log(error);
    return;
  }

  setProducts((prev) => [
    ...prev,
    ...data,
  ]);
};

  // editar producto
  const updateProduct = async (
    updated: Product
  ) => {
    const { error } =
      await supabase
        .from("products")
        .update(updated)
        .eq("id", updated.id);

    if (error) {
      console.error(error);
      return;
    }

    setProducts((prev) =>
      prev.map((product) =>
        product.id === updated.id
          ? updated
          : product
      )
    );
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