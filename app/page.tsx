"use client";

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import IntroOverlay from "@/components/IntroOverlay";

import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

import toast from "react-hot-toast";

export default function Home() {
  const { addToCart } = useCart();

  const { products } = useProducts();

  return (
    <main className="min-h-screen">
      
      <IntroOverlay />

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-[#4b2ca3] mb-3">
            MayStudio
          </h1>

          <p className="text-pink-500 text-lg italic">
            a house for fans
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300 border border-white"
            >
              <Link href={`/product/${product.id}`}>
                <div>
                  
                  <div className="overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500}
                      height={500}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="w-full h-80 object-cover hover:scale-105 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>

                  <div className="p-5">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                      {product.name}
                    </h2>

                    <p className="text-2xl font-black text-[#4b2ca3]">
                      $
                      {product.price.toLocaleString(
                        "es-CO"
                      )}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="px-5 pb-5">
                <button
                  onClick={() => {
                    addToCart({
                      ...product,
                      size:
                        product.sizes[0],
                      color:
                        product.colors[0],
                    });

                    toast.success(
                      `${product.name} agregado al carrito`
                    );
                  }}
                  className="w-full bg-[#4b2ca3] hover:bg-[#351f75] text-white py-3 rounded-2xl transition duration-300 font-semibold shadow-lg"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}