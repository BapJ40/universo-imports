"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  PackageSearch,
  Sparkles,
  Ship,
  Menu,
  X,
  PhoneCall,
  Globe,
} from "lucide-react";
import { useCart } from "@/lib/cart";

export default function Header() {
  const { totalUnits, items, openDrawer } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    } else {
      router.push("/catalogo");
    }
  };

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* Cintillo informativo superior */}
      <div className="bg-brand-navy text-white text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <Ship className="w-3.5 h-3.5" />
              Compras a Precio Directo de Alibaba · Flete China → Venezuela
            </span>
            <span className="hidden md:inline text-slate-300">
              | Almacén propio en Guangzhou y Shenzhen · Nacionalización incluida
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-slate-300">
              Pagos: Zelle · Binance Pay · Pago Móvil · Transferencia
            </span>
            <Link
              href="/seguimiento"
              className="hover:text-brand-orange transition-colors font-semibold underline underline-offset-2"
            >
              Rastrear mi carga
            </Link>
          </div>
        </div>
      </div>

      {/* Barra principal */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center text-brand-orange font-black text-xl shadow-sm border border-brand-orange/30">
              U
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-brand-navy block leading-none">
                UNIVERSO <span className="text-brand-orange">IMPORTS</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                <Globe className="w-3 h-3 text-brand-orange" /> Directo de Alibaba a Venezuela
              </span>
            </div>
          </Link>

          {/* Buscador estilo Alibaba */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-4"
          >
            <div className="flex w-full rounded-full border-2 border-brand-orange overflow-hidden bg-slate-50 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-orange/15 transition-all">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca productos estilo Alibaba (ej. auriculares TWS, freidora, taladro, termos...)"
                className="w-full px-5 py-2.5 text-sm text-slate-800 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="bg-brand-orange hover:bg-brand-orangeHover text-white font-semibold px-6 py-2.5 text-sm flex items-center gap-2 transition-colors shrink-0"
              >
                <Search className="w-4 h-4" />
                Buscar
              </button>
            </div>
          </form>

          {/* Acciones Derecha */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/cotizar"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-brand-navy border border-amber-300 px-3.5 py-2.5 rounded-xl transition-colors"
            >
              <Sparkles className="w-4 h-4 text-brand-orange" />
              ¿No está aquí? ¡Tráelo a pedido!
            </Link>

            <button
              onClick={openDrawer}
              className="relative flex items-center gap-2 bg-brand-navy hover:bg-brand-navyLight text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              aria-label="Abrir carrito de importación"
            >
              <ShoppingBag className="w-4 h-4 text-brand-orange" />
              <span className="hidden sm:inline">Mi Orden</span>
              {items.length > 0 && (
                <span className="bg-brand-orange text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.length} ({totalUnits})
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navegación secundaria */}
        <nav className="bg-slate-50 border-t border-slate-200/80 px-4 py-2 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-brand-orange transition-colors">
                Inicio
              </Link>
              <Link href="/catalogo" className="hover:text-brand-orange transition-colors">
                Catálogo Alibaba Directo
              </Link>
              <Link
                href="/cotizar"
                className="text-brand-orange hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Quiero traer un producto (Link / Foto)
              </Link>
              <Link href="/seguimiento" className="hover:text-brand-orange transition-colors flex items-center gap-1">
                <PackageSearch className="w-3.5 h-3.5" />
                Seguimiento China → VE
              </Link>
              <Link href="/carrito" className="hover:text-brand-orange transition-colors">
                Carrito y Costos
              </Link>
              <Link href="/contacto" className="hover:text-brand-orange transition-colors flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" />
                Asesoría y FAQ
              </Link>
            </div>
            <div className="text-slate-500">
              Moneda: <strong className="text-brand-navy">USD ($)</strong> · Tasa BCV / Paralelo / USDT aceptados
            </div>
          </div>
        </nav>

        {/* Menú Móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 border-t border-slate-200 bg-white space-y-3">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos de Alibaba..."
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-l-lg focus:outline-none focus:border-brand-orange"
              />
              <button
                type="submit"
                className="bg-brand-orange text-white px-4 py-2 rounded-r-lg text-sm font-semibold"
              >
                Buscar
              </button>
            </form>
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-slate-700 pt-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100"
              >
                Inicio
              </Link>
              <Link
                href="/catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100"
              >
                Catálogo Alibaba
              </Link>
              <Link
                href="/cotizar"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-amber-50 text-brand-orange border border-amber-200 col-span-2 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                Quiero traer un producto que no aparece
              </Link>
              <Link
                href="/seguimiento"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100"
              >
                Seguimiento
              </Link>
              <Link
                href="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100"
              >
                Contacto / WhatsApp
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
