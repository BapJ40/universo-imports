"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Star, ShoppingBag, ArrowUpRight, Box } from "lucide-react";
import { Product, getLowestPrice, getHighestPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const minPrice = getLowestPrice(product);
  const maxPrice = getHighestPrice(product);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-brand-orange/60 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Imagen con badge estilo Alibaba */}
      <Link href={`/producto/${product.id}`} className="relative aspect-[4/3] bg-slate-100 overflow-hidden block">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-brand-navy/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
          Precio Alibaba Directo
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
          {product.category}
        </div>
      </Link>

      {/* Cuerpo */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/producto/${product.id}`}
            className="text-sm font-bold text-slate-800 hover:text-brand-orange line-clamp-2 leading-snug transition-colors"
          >
            {product.title}
          </Link>

          {/* Rango de precios por volumen */}
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-lg font-black text-brand-navy">
              ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500 font-medium">USD / {product.unit.slice(0, -1) || "ud"}</span>
          </div>

          {/* Escala rápida de precios Alibaba */}
          <div className="mt-2 grid grid-cols-3 gap-1 bg-slate-50 p-1.5 rounded-lg border border-slate-100 text-center">
            {product.priceTiers.map((tier, i) => (
              <div key={i} className="px-1">
                <div className="text-xs font-extrabold text-brand-orange">
                  ${tier.price.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-500">
                  {tier.maxQty ? `${tier.minQty}-${tier.maxQty}` : `≥${tier.minQty}`}
                </div>
              </div>
            ))}
          </div>

          {/* MOQ + Peso/Volumen */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-slate-800">
              MOQ: {product.moq} {product.unit}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <Box className="w-3 h-3" /> {product.weightKg}kg · {product.volumeCbm}m³
            </span>
          </div>
        </div>

        {/* Proveedor verificado y botones */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
            <span className="truncate font-medium">
              <strong className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mr-1">
                Verified {product.supplier.years} yrs
              </strong>
              {product.supplier.city}
            </span>
            <span className="flex items-center gap-0.5 font-bold text-amber-600 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {product.supplier.rating}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addItem(product, product.moq, "maritimo")}
              className="flex-1 bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Agregar MOQ ({product.moq})
            </button>
            <Link
              href={`/producto/${product.id}`}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 transition-colors"
              title="Ver detalle y calcular flete"
            >
              Flete
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
