"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  ShoppingBag,
  MessageCircle,
  ArrowLeft,
  CheckCircle2,
  Box,
  Clock,
  Building2,
} from "lucide-react";
import {
  productProvider,
  getUnitPriceForQuantity,
} from "@/lib/products";
import { ShippingMethod } from "@/lib/shipping";
import { useCart } from "@/lib/cart";
import ShippingEstimator from "@/components/ShippingEstimator";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = productProvider.getById(params.id);
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState<number>(product ? product.moq : 10);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("maritimo");
  const [notes, setNotes] = useState("");

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-black text-brand-navy">Producto no encontrado</h1>
        <p className="text-sm text-slate-600">
          El artículo que buscas no está en el catálogo o puedes pedirlo bajo cotización personalizada.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/catalogo"
            className="bg-brand-navy text-white text-sm font-bold px-5 py-3 rounded-xl"
          >
            Volver al Catálogo
          </Link>
          <Link
            href="/cotizar"
            className="bg-brand-orange text-white text-sm font-bold px-5 py-3 rounded-xl"
          >
            Quiero traer otro producto
          </Link>
        </div>
      </div>
    );
  }

  const activeUnitPrice = getUnitPriceForQuantity(product, quantity);
  const alibabaSubtotal = Number((activeUnitPrice * quantity).toFixed(2));
  const relatedProducts = productProvider
    .getAll()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Migas de pan */}
      <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-1.5 font-bold text-brand-navy hover:text-brand-orange"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo Alibaba
        </Link>
        <span>
          Código Alibaba Ref: <strong className="text-slate-700">{product.id.toUpperCase()}</strong>
        </span>
      </div>

      {/* Bloque Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-xs">
        {/* Columna Izquierda: Galería + Datos del Proveedor Chino */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-brand-navy text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              Precio Directo Alibaba
            </span>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2.5">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${
                    selectedImage === i ? "border-brand-orange" : "border-slate-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Tarjeta de Proveedor Alibaba */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                ✓ Proveedor Verificado en Alibaba
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.supplier.rating} / 5.0
              </span>
            </div>
            <p className="font-extrabold text-sm text-brand-navy flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-brand-orange" />
              {product.supplier.name}
            </p>
            <p className="text-xs text-slate-600">
              Ubicación de fábrica: <strong>{product.supplier.city}</strong> · {product.supplier.years} años exportando en Alibaba.
            </p>
          </div>

          {/* Ficha logística */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 flex items-center gap-1">
                <Box className="w-3.5 h-3.5 text-brand-orange" /> Peso / Volumen ud.
              </span>
              <strong className="text-slate-800 block mt-0.5">
                {product.weightKg} kg · {product.volumeCbm} CBM
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-orange" /> Tiempo estimado
              </span>
              <strong className="text-slate-800 block mt-0.5 truncate" title={product.leadTimeDays}>
                {product.leadTimeDays}
              </strong>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Escalones de precio Alibaba + Calculadora de Flete */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-brand-navy mt-1 leading-snug">
              {product.title}
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Escalones de precios estilo Alibaba */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Tabla de Precios de Fábrica por Cantidad (USD)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {product.priceTiers.map((tier, idx) => {
                const isActive = activeUnitPrice === tier.price;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuantity(tier.minQty)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isActive
                        ? "border-brand-orange bg-amber-50/70 ring-2 ring-brand-orange/20"
                        : "border-slate-200 bg-slate-50 hover:bg-white"
                    }`}
                  >
                    <div className="text-lg sm:text-xl font-black text-brand-navy">
                      ${tier.price.toFixed(2)}
                    </div>
                    <div className="text-xs text-slate-600 font-semibold mt-0.5">
                      {tier.maxQty
                        ? `${tier.minQty} - ${tier.maxQty} ${product.unit}`
                        : `≥ ${tier.minQty} ${product.unit}`}
                    </div>
                    {isActive && (
                      <span className="inline-block mt-1 text-[10px] font-bold text-brand-orange">
                        ✓ Escala aplicada
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selector de Cantidad y Especificaciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cantidad a Importar (MOQ: {product.moq} {product.unit})
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(product.moq, quantity - 5))}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                >
                  -5
                </button>
                <input
                  type="number"
                  min={product.moq}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(product.moq, parseInt(e.target.value, 10) || product.moq))
                  }
                  className="w-full h-10 text-center font-black text-base border border-slate-300 rounded-xl bg-white"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 5)}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                >
                  +5
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Notas de color, talla o versión (Opcional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Mitad color negro, mitad blanco..."
                className="w-full h-10 px-3 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          {/* Calculadora de Flete y Comisión */}
          <ShippingEstimator
            unitWeightKg={product.weightKg}
            unitVolumeCbm={product.volumeCbm}
            quantity={quantity}
            productSubtotalUsd={alibabaSubtotal}
            selectedMethod={shippingMethod}
            onMethodChange={setShippingMethod}
          />

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => addItem(product, quantity, shippingMethod, notes)}
              className="flex-1 bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-sm py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Agregar a mi Orden (${alibabaSubtotal.toFixed(2)} USD Precio Alibaba)
            </button>

            <a
              href={`https://wa.me/584120000000?text=${encodeURIComponent(
                `Hola Universo Imports, me interesa importar ${quantity} ${product.unit} de "${product.title}" (Ref: ${product.id}) por vía ${shippingMethod}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-4 px-5 rounded-2xl flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Compra segura verificada en China
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Nacionalización puerta a puerta
            </span>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-black text-brand-navy mb-5">
            Otros Productos en {product.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
