"use client";

import Link from "next/link";

import {
  ShoppingCart,
  Settings,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

import { useState } from "react";

import AdminLoginModal from "./AdminLoginModal";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { cart } = useCart();

  const [
    openAdminModal,
    setOpenAdminModal,
  ] = useState(false);

  const [
    openCart,
    setOpenCart,
  ] = useState(false);

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <>
      <header className="w-full sticky top-0 z-50 backdrop-blur-2xl bg-white/65 border-b border-white/20 shadow-[0_8px_30px_rgba(75,44,163,0.08)]">
        
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-4 group"
          >
            <div className="relative w-14 h-14">
              <img
                src="/logo-maystudio.png"
                alt="MayStudio"
                className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-[#4b2ca3]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
            </div>

            <div className="flex flex-col leading-none">
              
              <span className="text-3xl font-black text-[#4b2ca3] tracking-tight">
                MayStudio
              </span>

              <span className="text-sm text-pink-500 italic tracking-wide">
                a house for fans
              </span>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">

            {/* Admin */}
            <button
              onClick={() =>
                setOpenAdminModal(true)
              }
              className="w-12 h-12 rounded-2xl bg-white/70 border border-white/40 shadow-lg flex items-center justify-center text-gray-600 hover:text-[#4b2ca3] hover:scale-105 hover:bg-white transition duration-300"
            >
              <Settings size={22} />
            </button>

            {/* Cart */}
            <button
              onClick={() =>
                setOpenCart(true)
              }
              className="relative w-14 h-14 rounded-2xl bg-[#4b2ca3] text-white shadow-xl flex items-center justify-center hover:scale-105 hover:bg-[#351f75] transition duration-300"
            >
              <ShoppingCart size={26} />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs min-w-[24px] h-6 px-1 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>

      <AdminLoginModal
        isOpen={openAdminModal}
        onClose={() =>
          setOpenAdminModal(false)
        }
      />

      <CartDrawer
        open={openCart}
        onClose={() =>
          setOpenCart(false)
        }
      />
    </>
  );
}