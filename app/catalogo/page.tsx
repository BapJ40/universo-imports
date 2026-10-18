"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, Sparkles, RotateCcw } from "lucide-react";
import { productProvider } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

function CatalogoContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("categoria") || "Todas";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [maxMoq, setMaxMoq] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "moq-asc">("featured");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setCategory(searchParams.get("categoria") || "Todas");
  }, [searchParams]);

  const categories = ["Todas", ...productProvider.getCategories()];

  const filteredProducts = productProvider.search({
    query,
    category,
    maxMoq: maxMoq > 0 ? maxMoq : undefined,
    maxPrice: maxPrice > 0 ? maxPrice : undefined,
    sortBy,
  });

  const resetFilters = () => {
    setQuery("");
    setCategory("Todas");
    setMaxMoq(0);
    setMaxPrice(0);
    setSortBy("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
            Catálogo Mayorista y Detal Directo de Fábrica
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            Publicaciones Estilo Alibaba listas para Venezuela
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Precios reales por escala (MOQ). Selecciona tu producto, calcula el flete marítimo o aéreo y agrégalo a tu orden.
          </p>
        </div>
        <Link
          href="/cotizar"
          className="bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl flex items-center gap-2 shrink-0 shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          ¿No encuentras lo que buscas? Pídelo aquí
        </Link>
      </div>

      {/* Barra de filtros */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Búsqueda */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar por nombre, categoría o ciudad en China..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-brand-orange"
            />
          </div>

          {/* Categoría */}
          <div className="md:col-span-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-brand-orange"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  Categoría: {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenar */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-brand-orange"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Menor Precio USD</option>
              <option value="price-desc">Mayor Precio USD</option>
              <option value="moq-asc">Menor MOQ (Cantidad Mín.)</option>
            </select>
          </div>

          {/* Limpiar */}
          <div className="md:col-span-2">
            <button
              onClick={resetFilters}
              className="w-full py-2.5 px-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Limpiar filtros
            </button>
          </div>
        </div>

        {/* Segunda fila: Filtros rápidos de MOQ y Precio */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-orange" /> MOQ máximo:
            </span>
            {[0, 5, 10, 20, 30].map((val) => (
              <button
                key={val}
                onClick={() => setMaxMoq(val)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  maxMoq === val
                    ? "bg-brand-navy text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {val === 0 ? "Todos" : `≤ ${val} uds`}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-700">Precio unitario máx:</span>
            {[0, 5, 10, 20, 35].map((price) => (
              <button
                key={price}
                onClick={() => setMaxPrice(price)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  maxPrice === price
                    ? "bg-brand-orange text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {price === 0 ? "Cualquier precio" : `≤ $${price} USD`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="flex items-center justify-between mb-4 text-xs text-slate-600">
        <span>
          Mostrando <strong className="text-brand-navy">{filteredProducts.length}</strong> publicaciones de Alibaba disponibles
        </span>
        <span>Precios en USD a costo de fábrica (flete se calcula por separado)</span>
      </div>

      {/* Grid de productos o Estado Vacío con enlace a Cotizar */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center max-w-xl mx-auto my-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-brand-orange flex items-center justify-center mx-auto">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-brand-navy">
            No encontramos &ldquo;{query}&rdquo; en el catálogo base
          </h2>
          <p className="text-sm text-slate-600">
            ¡No te preocupes! En <strong>Universo Imports</strong> buscamos y compramos cualquier producto directamente en Alibaba China por ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href={`/cotizar?producto=${encodeURIComponent(query)}`}
              className="bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-sm px-6 py-3 rounded-xl"
            >
              Solicitar &ldquo;{query || "este producto"}&rdquo; a Pedido
            </Link>
            <button
              onClick={resetFilters}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-5 py-3 rounded-xl"
            >
              Ver todos los productos
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center">Cargando catálogo...</div>}>
      <CatalogoContent />
    </Suspense>
  );
}
