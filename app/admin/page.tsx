"use client";

import { supabase } from "@/lib/supabase";

import Image from "next/image";
import { useState } from "react";

import Navbar from "@/components/Navbar";

import {
  useProducts,
  Product,
} from "@/context/ProductContext";

import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const {
    products,
    addProduct,
    deleteProduct,
    updateProduct,
  } = useProducts();

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [form, setForm] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    image: "",
    sizes: [],
    colors: [],
  });

  const resetForm = () => {
    setEditingId(null);

    setForm({
      id: 0,
      name: "",
      price: 0,
      image: "",
      sizes: [],
      colors: [],
    });
  };

  const handleAddProduct = () => {
    if (
      !form.name.trim() ||
      !form.price ||
      !form.image ||
      form.sizes.length === 0 ||
      form.colors.length === 0
    ) {
      alert(
        "Completa todos los campos"
      );

      return;
    }

    addProduct({
      ...form,
    });

    resetForm();
  };

  const handleEdit = (
    product: Product
  ) => {
    setEditingId(product.id);

    setForm(product);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdate = () => {
    updateProduct(form);

    resetForm();
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          
          <div>
            <p className="text-pink-500 font-semibold uppercase tracking-[0.2em] mb-2">
              Dashboard
            </p>

            <h1 className="text-5xl font-black text-[#4b2ca3]">
              Panel Admin
            </h1>
          </div>

          <button
            onClick={() => {
              sessionStorage.removeItem(
                "admin"
              );

              router.push("/");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-2xl transition font-semibold shadow-lg"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Alert edición */}
        {editingId && (
          <div className="mb-8 bg-yellow-100/80 backdrop-blur-md border border-yellow-300 text-yellow-800 px-6 py-4 rounded-3xl shadow-md">
            Editando producto ID:
            <span className="font-bold ml-2">
              {editingId}
            </span>
          </div>
        )}

        {/* Formulario */}
        <div className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-[36px] shadow-2xl p-8 mb-12">
          
          <h2 className="text-3xl font-black text-[#4b2ca3] mb-8">
            {editingId
              ? "Editar producto"
              : "Agregar producto"}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Nombre */}
            <input
              type="text"
              placeholder="Nombre"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="bg-white/80 border border-[#e9e3ff] p-4 rounded-2xl outline-none focus:border-[#4b2ca3] transition"
            />

            {/* Precio */}
            <input
              type="number"
              placeholder="Precio"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: Number(
                    e.target.value
                  ),
                })
              }
              className="bg-white/80 border border-[#e9e3ff] p-4 rounded-2xl outline-none focus:border-[#4b2ca3] transition"
            />

            {/* Imagen */}
            <div className="md:col-span-2 flex flex-col gap-5">
              
              <label className="font-bold text-[#4b2ca3]">
                Imagen del producto
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file =
                    e.target.files?.[0];

                  if (!file) return;

                  try {
                    setUploading(true);

                    const fileName = `${Date.now()}-${file.name}`;

                    const {
                      error,
                    } =
                      await supabase.storage
                        .from(
                          "products"
                        )
                        .upload(
                          fileName,
                          file
                        );

                    if (error) {
                      console.error(
                        error
                      );

                      alert(
                        "Error subiendo imagen"
                      );

                      return;
                    }

                    const {
                      data:
                        publicUrlData,
                    } =
                      supabase.storage
                        .from(
                          "products"
                        )
                        .getPublicUrl(
                          fileName
                        );

                    setForm(
                      (
                        prev
                      ) => ({
                        ...prev,
                        image:
                          publicUrlData.publicUrl,
                      })
                    );
                  } catch (error) {
                    console.error(
                      error
                    );

                    alert(
                      "Error inesperado"
                    );
                  } finally {
                    setUploading(
                      false
                    );
                  }
                }}
                className="bg-white/80 border border-[#e9e3ff] p-4 rounded-2xl"
              />

              {uploading && (
                <p className="text-sm text-gray-500">
                  Subiendo imagen...
                </p>
              )}

              {form.image && (
                <div className="relative w-48 h-48 rounded-3xl overflow-hidden border border-white shadow-xl">
                  
                  <Image
                    src={form.image}
                    alt="Preview"
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Tallas */}
            <div className="md:col-span-2">
              
              <h3 className="font-bold text-[#4b2ca3] mb-4 text-lg">
                Tallas disponibles
              </h3>

              <div className="flex gap-3 flex-wrap">
                {[
                  "S",
                  "M",
                  "L",
                  "XL",
                  "No Aplica N/A",
                
                ].map((size) => {
                  const active =
                    form.sizes.includes(
                      size
                    );

                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        if (
                          active
                        ) {
                          setForm({
                            ...form,
                            sizes:
                              form.sizes.filter(
                                (
                                  s
                                ) =>
                                  s !==
                                  size
                              ),
                          });
                        } else {
                          setForm({
                            ...form,
                            sizes: [
                              ...form.sizes,
                              size,
                            ],
                          });
                        }
                      }}
                      className={`px-5 py-3 rounded-2xl font-semibold transition duration-300 border ${
                        active
                          ? "bg-[#4b2ca3] text-white border-[#4b2ca3] shadow-lg"
                          : "bg-white/80 text-gray-700 border-[#e9e3ff] hover:border-[#4b2ca3]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colores */}
            <div className="md:col-span-2">
              
              <h3 className="font-bold text-[#4b2ca3] mb-4 text-lg">
                Colores disponibles
              </h3>

              <div className="flex gap-3 flex-wrap">
                {[
                  "Negro",
                  "Blanco",
                  "Rojo",
                  "Azul",
                  "Gris",
                  "Beige",
                  "No Aplica N/A",
                ].map((color) => {
                  const active =
                    form.colors.includes(
                      color
                    );

                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        if (
                          active
                        ) {
                          setForm({
                            ...form,
                            colors:
                              form.colors.filter(
                                (
                                  c
                                ) =>
                                  c !==
                                  color
                              ),
                          });
                        } else {
                          setForm({
                            ...form,
                            colors: [
                              ...form.colors,
                              color,
                            ],
                          });
                        }
                      }}
                      className={`px-5 py-3 rounded-2xl font-semibold transition duration-300 border ${
                        active
                          ? "bg-pink-500 text-white border-pink-500 shadow-lg"
                          : "bg-white/80 text-gray-700 border-[#e9e3ff] hover:border-pink-400"
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex items-center flex-wrap gap-4 mt-8">
            
            <button
              disabled={uploading}
              onClick={
                editingId
                  ? handleUpdate
                  : handleAddProduct
              }
              className="bg-[#4b2ca3] hover:bg-[#351f75] disabled:opacity-50 text-white px-8 py-4 rounded-2xl transition font-bold shadow-xl"
            >
              {uploading
                ? "Subiendo..."
                : editingId
                ? "Guardar cambios"
                : "Agregar producto"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="bg-white/80 hover:bg-white text-gray-700 border border-[#e9e3ff] px-8 py-4 rounded-2xl transition font-semibold"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/75 backdrop-blur-xl border border-white/30 rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >
              
              <div className="relative w-full h-80 overflow-hidden">
                
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              <div className="p-6">
                
                <h2 className="text-3xl font-black text-[#4b2ca3]">
                  {product.name}
                </h2>

                <p className="text-2xl font-black text-pink-500 mt-3">
                  $
                  {product.price.toLocaleString(
                    "es-CO"
                  )}
                </p>

                <div className="mt-5 space-y-3">
                  
                  <p className="text-gray-600">
                    <span className="font-bold text-[#4b2ca3]">
                      Tallas:
                    </span>{" "}
                    {product.sizes.join(
                      ", "
                    )}
                  </p>

                  <p className="text-gray-600">
                    <span className="font-bold text-[#4b2ca3]">
                      Colores:
                    </span>{" "}
                    {product.colors.join(
                      ", "
                    )}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  
                  <button
                    onClick={() =>
                      handleEdit(
                        product
                      )
                    }
                    className="flex-1 bg-[#4b2ca3] hover:bg-[#351f75] text-white py-3 rounded-2xl transition font-semibold"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(
                        product.id
                      )
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition font-semibold"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}