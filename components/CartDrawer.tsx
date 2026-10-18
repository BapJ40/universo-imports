"use client";

import React from "react";
import Link from "next/link";
import { X, Trash2, Ship, Plane, ArrowRight, ShoppingBag, Info } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getUnitPriceForQuantity } from "@/lib/products";
import { calculateShippingEstimate } from "@/lib/shipping";

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    updateShippingMethod,
    removeItem,
    alibabaSubtotalUsd,
    estimatedLogisticsUsd,
    grandTotalEstimatedUsd,
  } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
      />

      {/* Panel lateral */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Cabecera */}
        <div className="p-4 bg-brand-navy text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-orange" />
            <div>
              <h2 className="font-bold text-base">Tu Orden de Importación</h2>
              <p className="text-[11px] text-slate-300">
                Compras a precio Alibaba + Flete China → Venezuela
              </p>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-14 space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="text-slate-700 font-bold">Tu carrito está vacío</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explora los productos directos de Alibaba o solicita una cotización personalizada si buscas otro artículo.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/catalogo"
                  onClick={closeDrawer}
                  className="bg-brand-orange text-white text-xs font-bold py-2.5 px-4 rounded-xl inline-block mx-auto"
                >
                  Explorar Catálogo Alibaba
                </Link>
                <Link
                  href="/cotizar"
                  onClick={closeDrawer}
                  className="text-brand-navy underline text-xs font-semibold"
                >
                  ¿No encuentras tu producto? Solicítalo aquí
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = getUnitPriceForQuantity(item.product, item.quantity);
              const productTotal = unitPrice * item.quantity;
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
                  className="border border-slate-200 rounded-xl p-3 bg-slate-50/60 space-y-2.5"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/producto/${item.product.id}`}
                        onClick={closeDrawer}
                        className="text-xs font-bold text-slate-800 hover:text-brand-orange line-clamp-2"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Precio Alibaba:{" "}
                        <strong className="text-brand-navy">${unitPrice.toFixed(2)}</strong> / ud (MOQ: {item.product.moq})
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-slate-400 hover:text-red-500 self-start p-1"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Controles de cantidad y método de envío */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/70">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-600 font-medium">Cant:</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 5)}
                        className="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={item.product.moq}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.product.id, parseInt(e.target.value, 10) || item.product.moq)
                        }
                        className="w-14 text-center text-xs font-bold border border-slate-300 rounded py-1 bg-white"
                      />
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 5)}
                        className="w-6 h-6 rounded bg-white border border-slate-300 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex rounded-lg border border-slate-300 overflow-hidden text-[11px] font-semibold">
                      <button
                        onClick={() => updateShippingMethod(item.product.id, "maritimo")}
                        className={`px-2 py-1 flex items-center gap-1 ${
                          item.shippingMethod === "maritimo"
                            ? "bg-brand-navy text-white"
                            : "bg-white text-slate-600"
                        }`}
                      >
                        <Ship className="w-3 h-3" /> Mar
                      </button>
                      <button
                        onClick={() => updateShippingMethod(item.product.id, "aereo")}
                        className={`px-2 py-1 flex items-center gap-1 ${
                          item.shippingMethod === "aereo"
                            ? "bg-brand-navy text-white"
                            : "bg-white text-slate-600"
                        }`}
                      >
                        <Plane className="w-3 h-3" /> Aéreo
                      </button>
                    </div>
                  </div>

                  {/* Subtotal ítem */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-600">
                      Producto: <strong className="text-slate-900">${productTotal.toFixed(2)}</strong>
                    </span>
                    <span className="text-amber-700 font-semibold">
                      + Flete/Comisión est.: ${shippingEst.totalLogisticsUsd.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pie con desglose de modelo de negocio */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>1. Subtotal Productos (Precio Alibaba):</span>
                <strong className="text-sm text-brand-navy">${alibabaSubtotalUsd.toFixed(2)} USD</strong>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>2. Estimado Flete + Nacionalización + Gestión:</span>
                <strong>~${estimatedLogisticsUsd.toFixed(2)} USD</strong>
              </div>
              <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-1.5 border-t border-slate-200">
                <span>Total Estimado Puesto en Venezuela:</span>
                <span className="text-brand-orange">${grandTotalEstimatedUsd.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-[11px] text-amber-900 flex gap-2">
              <Info className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span>
                <strong>¿Cómo funciona el pago?</strong> Primero abonas el valor de tus productos a precio Alibaba (<strong>${alibabaSubtotalUsd.toFixed(2)}</strong>) para comprarlos en fábrica. El flete y nacionalización se liquidan al despachar a Venezuela.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/carrito"
                onClick={closeDrawer}
                className="text-center py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700"
              >
                Ver Detalle Completo
              </Link>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="text-center py-2.5 px-3 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-xs font-bold text-white flex items-center justify-center gap-1"
              >
                Ir a Pagar <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
