export type Product = {
  id: number;

  name: string;

  price: number;

  image: string;

  sizes: string[];

  colors: string[];
};

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Camiseta básica",
    price: 50000,
    image: "/camiseta.png",

    sizes: ["S", "M", "L", "XL"],

    colors: ["Negro", "Blanco", "Azul"],
  },

  {
    id: 2,
    name: "Hoodie negro",
    price: 90000,
    image: "/hoodie.png",

    sizes: ["S", "M", "L", "XL"],

    colors: ["Negro", "Gris", "Beige"],
  },

  {
    id: 3,
    name: "Camiseta personalizada",
    price: 70000,
    image: "/camiseta2.png",

    sizes: ["S", "M", "L", "XL"],

    colors: ["Blanco", "Negro", "Rojo"],
  },
];