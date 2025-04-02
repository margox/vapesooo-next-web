import productsData from "./products.json";
import type { Products } from "@/types/products";

export const products = productsData as unknown as Products;
