import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";

import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";

export const metadata: Metadata = {
  title: "Tienda Mayra",
  description: "Tienda de ropa moderna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ProductProvider>
          <CartProvider>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 2500,
                style: {
                  background: "rgba(255,255,255,0.92)",
                  color: "#1f1f1f",
                  border: "1px solid rgba(255,255,255,0.4)",
                  borderRadius: "20px",
                  padding: "16px",
                  backdropFilter: "blur(14px)",
                  boxShadow:
                    "0 10px 30px rgba(75,44,163,0.12)",
                  fontWeight: "600",
                },

                success: {
                  iconTheme: {
                    primary: "#4b2ca3",
                    secondary: "#ffffff",
                  },
                },
              }}
            />

            {children}

          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}