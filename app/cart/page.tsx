"use client";

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const whatsappMessage = encodeURIComponent(
    `Hola Mayra, quiero pedir:\n\n${cart
      .map(
        (item) =>
          `• ${item.name}
Talla: ${item.size}
Color: ${item.color}
Cantidad: ${item.quantity}
Subtotal: $${
            item.price * item.quantity
          }\n`
      )
      .join("\n")}\nTotal: $${total}`
  );

  const whatsappLink = `https://wa.me/573163712481?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen">
      
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-10">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-[#4b2ca3] mb-3">
            Tu carrito
          </h1>

          <p className="text-pink-500 italic text-lg">
            revisa tu pedido antes de enviarlo
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-[30px] p-12 text-center">
            
            <p className="text-gray-500 text-xl mb-8">
              Tu carrito está vacío
            </p>

            <Link
              href="/"
              className="inline-block bg-[#4b2ca3] hover:bg-[#351f75] text-white px-8 py-4 rounded-2xl transition duration-300 font-semibold shadow-lg"
            >
              Volver a la tienda
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}-${index}`}
                  className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-[30px] shadow-xl p-5 flex flex-col md:flex-row gap-6 hover:shadow-2xl transition duration-300"
                >
                  
                  <div className="relative w-full md:w-44 h-44 rounded-2xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 176px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    
                    <h2 className="text-3xl font-black text-[#4b2ca3]">
                      {item.name}
                    </h2>

                    <div className="mt-4 space-y-2">
                      <p className="text-gray-600">
                        Talla:
                        <span className="ml-2 font-bold text-black">
                          {item.size}
                        </span>
                      </p>

                      <p className="text-gray-600">
                        Color:
                        <span className="ml-2 font-bold text-black">
                          {item.color}
                        </span>
                      </p>
                    </div>

                    <p className="text-2xl font-black text-pink-500 mt-5">
                      $
                      {item.price.toLocaleString(
                        "es-CO"
                      )}
                    </p>

                    <div className="flex items-center gap-3 mt-6">
                      
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id,
                            item.size,
                            item.color
                          )
                        }
                        className="w-11 h-11 rounded-xl bg-[#ede9fe] hover:bg-[#ddd6fe] text-[#4b2ca3] text-xl font-bold transition"
                      >
                        -
                      </button>

                      <span className="text-xl font-black text-[#4b2ca3]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id,
                            item.size,
                            item.color
                          )
                        }
                        className="w-11 h-11 rounded-xl bg-[#ede9fe] hover:bg-[#ddd6fe] text-[#4b2ca3] text-xl font-bold transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    
                    <p className="text-3xl font-black text-[#4b2ca3]">
                      $
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString("es-CO")}
                    </p>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.size,
                          item.color
                        )
                      }
                      className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-2xl transition duration-300 font-semibold shadow-lg"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white/75 backdrop-blur-xl border border-white/30 shadow-2xl rounded-[30px] p-8">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                <div>
                  <p className="text-gray-500 mb-2">
                    Total del pedido
                  </p>

                  <h2 className="text-5xl font-black text-[#4b2ca3]">
                    $
                    {total.toLocaleString("es-CO")}
                  </h2>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl text-lg font-bold transition duration-300 shadow-xl"
                >
                  Pedir por WhatsApp
                </a>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}