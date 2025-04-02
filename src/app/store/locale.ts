"use client";

import { Locales } from "@/types/products";
import { useParams } from "next/navigation";

export const useLocale = (fallback?: Locales) => {
  const params = useParams();
  return (params.locale as Locales) || fallback || Locales.EN;
};
