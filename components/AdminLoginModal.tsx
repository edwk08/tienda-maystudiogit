"use client";

import {
  useEffect,
  useState,
} from "react";

import { X } from "lucide-react";

import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;

  onClose: () => void;
};

export default function AdminLoginModal({
  isOpen,
  onClose,
}: Props) {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    const handleEsc = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEsc
      );
  }, [onClose]);

  if (!isOpen) return null;

  const handleLogin = () => {
    if (password === "mayra123") {
      sessionStorage.setItem(
        "admin",
        "true"
      );

      router.push("/admin");

      onClose();

      setPassword("");

      return;
    }

    setError(
      "Contraseña incorrecta"
    );
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-md flex items-center justify-center p-5"
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="w-full max-w-md rounded-[32px] border border-white/30 bg-white/80 backdrop-blur-2xl p-8 shadow-[0_15px_40px_rgba(75,44,163,0.18)] animate-in fade-in zoom-in duration-300"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-[#4b2ca3]">
              Admin
            </h2>

            <p className="text-sm text-pink-500 italic mt-1">
              acceso privado
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#4b2ca3] transition"
          >
            <X size={28} />
          </button>
        </div>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
            setPassword(
              e.target.value
            );

            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          className="w-full rounded-2xl border border-[#d8d1f0] bg-white/80 px-5 py-4 outline-none transition focus:border-[#4b2ca3] focus:ring-4 focus:ring-[#4b2ca3]/15"
        />

        {error && (
          <p className="text-pink-500 mt-3 font-medium">
            {error}
          </p>
        )}

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-[#d8d1f0] hover:bg-[#f6f2ff] text-gray-700 transition py-3 rounded-2xl font-semibold"
          >
            Cancelar
          </button>

          <button
            onClick={handleLogin}
            className="flex-1 bg-[#4b2ca3] hover:bg-[#351f75] transition text-white py-3 rounded-2xl font-semibold shadow-lg"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}