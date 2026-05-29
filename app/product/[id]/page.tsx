"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { use, useState } from "react";

import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";

import Navbar from "@/components/Navbar";

import toast from "react-hot-toast";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductPage({
  params,
}: Props) {
  const { addToCart } = useCart();

  const { products } = useProducts();

  const resolvedParams = use(params);

  const product = products.find(
    (p) => p.id === Number(resolvedParams.id)
  );

  if (!product) {
    notFound();
  }

  const [selectedSize, setSelectedSize] =
    useState(product.sizes[0]);

  const [selectedColor, setSelectedColor] =
    useState(product.colors[0]);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
    });

    toast.success(
      "Producto agregado al carrito"
    );
  };

  return (
    <main className="min-h-screen">
      
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-[36px] shadow-2xl overflow-hidden grid md:grid-cols-2">
          
          {/* Imagen */}
          <div className="relative w-full h-[450px] md:h-full min-h-[500px] overflow-hidden">
            
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          {/* Contenido */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            
            <p className="text-pink-500 font-semibold uppercase tracking-[0.2em] mb-3">
              MayStudio
            </p>

            <h1 className="text-5xl font-black text-[#4b2ca3] mb-5 leading-tight">
              {product.name}
            </h1>

            <p className="text-4xl font-black text-pink-500 mb-8">
              $
              {product.price.toLocaleString(
                "es-CO"
              )}
            </p>

            <div className="bg-[#f6f2ff] border border-[#ede9fe] rounded-3xl p-5 mb-8">
              <p className="text-gray-600 leading-relaxed">
                Producto premium de MayStudio.
                Diseñado para fans que quieren
                destacar con estilo, comodidad y
                una estética moderna.
              </p>
            </div>

            {/* Tallas */}
            <div className="mb-8">
              
              <h3 className="font-bold text-[#4b2ca3] mb-4 text-lg">
                Selecciona talla
              </h3>

              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSize(size)
                    }
                    className={`px-5 py-3 rounded-2xl font-semibold transition duration-300 border ${
                      selectedSize === size
                        ? "bg-[#4b2ca3] text-white border-[#4b2ca3] shadow-lg"
                        : "bg-white/80 text-gray-700 border-[#e9e3ff] hover:border-[#4b2ca3]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div className="mb-10">
              
              <h3 className="font-bold text-[#4b2ca3] mb-4 text-lg">
                Selecciona color
              </h3>

              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setSelectedColor(color)
                    }
                    className={`px-5 py-3 rounded-2xl font-semibold transition duration-300 border ${
                      selectedColor === color
                        ? "bg-pink-500 text-white border-pink-500 shadow-lg"
                        : "bg-white/80 text-gray-700 border-[#e9e3ff] hover:border-pink-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#4b2ca3] hover:bg-[#351f75] text-white py-5 rounded-3xl text-xl font-bold transition duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}