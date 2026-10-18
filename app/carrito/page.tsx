"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Ship,
  Plane,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { getUnitPriceForQuantity } from "@/lib/products";
import { calculateShippingEstimate, SHIPPING_CONFIG } from "@/lib/shipping";

export default function CarritoPage() {
  const {
    items,
    updateQuantity,
    updateShippingMethod,
    removeItem,
    clearCart,
    alibabaSubtotalUsd,
    estimatedLogisticsUsd,
    grandTotalEstimatedUsd,
  } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
            Resumen de Importación China → Venezuela
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
            Mi Orden y Desglose de Costos
          </h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-bold text-red-600 hover:underline self-start sm:self-auto"
          >
            Vaciar toda la orden
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-brand-navy">
            Aún no has agregado productos de Alibaba
          </h2>
          <p className="text-sm text-slate-600">
            Agrega productos de nuestro catálogo a precio de fábrica o solicita una cotización personalizada si buscas un artículo específico.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/catalogo"
              className="bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-sm px-6 py-3 rounded-xl"
            >
              Ir al Catálogo Alibaba
            </Link>
            <Link
              href="/cotizar"
              className="bg-brand-navy hover:bg-brand-navyLight text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-brand-orange" /> Quiero traer otro producto
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Lista de ítems */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => {
              const unitPrice = getUnitPriceForQuantity(item.product, item.quantity);
              const productTotal = Number((unitPrice * item.quantity).toFixed(2));
              const shippingEst = calculateShippingEstimate({
                unitWeightKg: item.product.weightKg,
                unitVolumeCbm: item.product.volumeCbm,
                quantity: item.quantity,
                productSubtotalUsd: productTotal,
                method: item.shippingMethod,
              });

              return (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-24 h-24 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/producto/${item.product.id}`}
                          className="font-extrabold text-base text-brand-navy hover:text-brand-orange"
                        >
                          {item.product.title}
                        </Link>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Proveedor: <strong>{item.product.supplier.name}</strong> ({item.product.supplier.city})
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs">
                        <span className="bg-amber-50 border border-amber-200 text-brand-navy font-bold px-2.5 py-1 rounded-lg">
                          Precio Unitario Alibaba: ${unitPrice.toFixed(2)} USD
                        </span>
                        <span className="text-slate-500">
                          MOQ: {item.product.moq} {item.product.unit} · Peso total: {shippingEst.totalWeightKg}kg · Vol: {shippingEst.totalVolumeCbm}m³
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Controles inferiores */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">Cantidad:</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 5)}
                        className="w-8 h-8 rounded-lg bg-slate-100 font-bold text-xs"
                      >
                        -5
                      </button>
                      <input
                        type="number"
                        min={item.product.moq}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.product.id,
                            parseInt(e.target.value, 10) || item.product.moq
                          )
                        }
                        className="w-16 h-8 text-center font-bold text-xs border border-slate-300 rounded-lg"
                      />
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 5)}
                        className="w-8 h-8 rounded-lg bg-slate-100 font-bold text-xs"
                      >
                        +5
                      </button>
                    </div>

                    {/* Vía de envío */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">Vía de Flete:</span>
                      <button
                        onClick={() => updateShippingMethod(item.product.id, "maritimo")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 border ${
                          item.shippingMethod === "maritimo"
                            ? "bg-brand-navy text-white border-brand-navy"
                            : "bg-white text-slate-600 border-slate-300"
                        }`}
                      >
                        <Ship className="w-3.5 h-3.5" /> Marítimo
                      </button>
                      <button
                        onClick={() => updateShippingMethod(item.product.id, "aereo")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 border ${
                          item.shippingMethod === "aereo"
                            ? "bg-brand-navy text-white border-brand-navy"
                            : "bg-white text-slate-600 border-slate-300"
                        }`}
                      >
                        <Plane className="w-3.5 h-3.5" /> Aéreo
                      </button>
                    </div>

                    {/* Subtotales del ítem */}
                    <div className="text-right">
                      <div className="text-sm font-black text-brand-navy">
                        Producto: ${productTotal.toFixed(2)} USD
                      </div>
                      <div className="text-xs font-semibold text-amber-700">
                        + Flete/Comisión est.: ~${shippingEst.totalLogisticsUsd.toFixed(2)} USD
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resumen financiero derecha */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md sticky top-28 space-y-5">
              <h2 className="text-lg font-black text-brand-navy border-b border-slate-100 pb-3">
                Desglose de tu Importación
              </h2>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-brand-navy text-white space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-300">PAGO 1 (HOY): Compra Alibaba</span>
                    <span className="text-lg font-black">${alibabaSubtotalUsd.toFixed(2)} USD</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Se utiliza para comprar tus productos directamente al proveedor en China a precio de fábrica.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-amber-950">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">PAGO 2 (AL DESPACHAR): Flete + Comisión</span>
                    <span className="text-base font-black text-brand-orange">
                      ~${estimatedLogisticsUsd.toFixed(2)} USD
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Incluye flete internacional, nacionalización aduanal en Venezuela y {SHIPPING_CONFIG.managementFeePercent}% de gestión.
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                  <span className="font-extrabold text-sm text-slate-800">
                    Total Estimado Puesto en VE:
                  </span>
                  <span className="text-xl font-black text-brand-navy">
                    ${grandTotalEstimatedUsd.toFixed(2)} USD
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex gap-2">
                <Info className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>
                  En el siguiente paso solo abonas el <strong>Pago 1 (${alibabaSubtotalUsd.toFixed(2)} USD)</strong> mediante Pago Móvil, Zelle, Binance Pay o Transferencia.
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                Continuar al Pago de Productos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
