"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({
  open,
  onClose,
}: Props) {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

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
Subtotal: $${item.price * item.quantity}\n`
      )
      .join("\n")}\nTotal: $${total}`
  );

  const whatsappLink = `https://wa.me/573163712481?text=${whatsappMessage}`;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-white/80 backdrop-blur-2xl border-l border-white/30 z-50 shadow-[0_10px_40px_rgba(75,44,163,0.18)] transition-transform duration-500 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/30">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-pink-500 font-semibold mb-1">
              Shopping Bag
            </p>
            <h2 className="text-3xl font-black text-[#4b2ca3]">
              Tu carrito
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-white/80 hover:bg-white text-gray-700 hover:text-[#4b2ca3] transition flex items-center justify-center shadow-lg"
          >
            <X size={28} />
          </button>
        </div>

        {/* Productos */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-28 h-28 rounded-full bg-[#4b2ca3]/10 flex items-center justify-center mb-6">
                <span className="text-5xl">🛍️</span>
              </div>

              <h3 className="text-2xl font-black text-[#4b2ca3] mb-3">
                Tu carrito está vacío
              </h3>

              <p className="text-gray-500">
                Agrega productos y arma tu outfit perfecto ✨
              </p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.id}-${item.size}-${item.color}-${index}`}
                className="bg-white/70 border border-white/40 rounded-3xl p-4 shadow-lg flex gap-4"
              >
                {/* Imagen */}
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-black text-lg text-[#4b2ca3] leading-tight">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Talla:{" "}
                    <span className="font-semibold">
                      {item.size}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Color:{" "}
                    <span className="font-semibold">
                      {item.color}
                    </span>
                  </p>

                  <p className="font-black text-pink-500 text-lg mt-2">
                    ${item.price.toLocaleString("es-CO")}
                  </p>

                  {/* Cantidad */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.id,
                          item.size,
                          item.color
                        )
                      }
                      className="w-9 h-9 rounded-xl bg-[#ede8ff] hover:bg-[#dcd1ff] text-[#4b2ca3] font-bold transition"
                    >
                      -
                    </button>

                    <span className="font-black text-lg min-w-[20px] text-center">
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
                      className="w-9 h-9 rounded-xl bg-[#ede8ff] hover:bg-[#dcd1ff] text-[#4b2ca3] font-bold transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() =>
                    removeFromCart(
                      item.id,
                      item.size,
                      item.color
                    )
                  }
                  className="text-red-400 hover:text-red-600 transition font-semibold self-start"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/30 p-6 bg-white/70 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-gray-700">
              Total
            </span>

            <span className="text-3xl font-black text-[#4b2ca3]">
              ${total.toLocaleString("es-CO")}
            </span>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            className="block w-full text-center bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-lg transition shadow-xl"
          >
            Pedir por WhatsApp
          </a>

          <Link
            href="/cart"
            onClick={onClose}
            className="block text-center mt-4 text-[#4b2ca3] hover:text-pink-500 font-semibold transition"
          >
            Ver carrito completo
          </Link>
        </div>
      </div>
    </>
  );
}