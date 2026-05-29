"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const isAdmin =
      sessionStorage.getItem("admin");

    if (isAdmin === "true") {
      setAuthorized(true);
    } else {
      router.push("/");
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">
          Verificando acceso...
        </p>
      </div>
    );
  }

  return children;
}