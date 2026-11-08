"use client";

import React, { useState } from "react";
import { Ship, Plane, Calculator, Info, Sparkles } from "lucide-react";
import {
  ShippingMethod,
  SHIPPING_CONFIG,
  CASHEA_TIERS,
  calculateShippingEstimate,
  calculateInstallmentPlan,
} from "@/lib/shipping";

interface Props {
  unitWeightKg: number;
  unitVolumeCbm: number;
  quantity: number;
  productSubtotalUsd: number;
  selectedMethod: ShippingMethod;
  onMethodChange: (m: ShippingMethod) => void;
}

export default function ShippingEstimator({
  unitWeightKg,
  unitVolumeCbm,
  quantity,
  productSubtotalUsd,
  selectedMethod,
  onMethodChange,
}: Props) {
  const [selectedTierId, setSelectedTierId] = useState<string>("nivel-6-promo");

  const seaEstimate = calculateShippingEstimate({
    unitWeightKg,
    unitVolumeCbm,
    quantity,
    productSubtotalUsd,
    method: "maritimo",
  });

  const airEstimate = calculateShippingEstimate({
    unitWeightKg,
    unitVolumeCbm,
    quantity,
    productSubtotalUsd,
    method: "aereo",
  });

  const activeEstimate = selectedMethod === "maritimo" ? seaEstimate : airEstimate;
  const totalInVenezuelaUsd = Number(
    (productSubtotalUsd + activeEstimate.totalLogisticsUsd).toFixed(2)
  );

  const activeTier =
    CASHEA_TIERS.find((t) => t.id === selectedTierId) || CASHEA_TIERS[0];
  const installmentPlan = calculateInstallmentPlan(
    totalInVenezuelaUsd,
    activeTier.initialPercent
  );

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-brand-orange" />
          <h3 className="font-bold text-sm text-brand-navy">
            Calculadora Estimada de Flete + Comisión (China → Venezuela)
          </h3>
        </div>
        <span className="text-[11px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">
          Estimado referencial
        </span>
      </div>

      {/* Selector Marítimo vs Aéreo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onMethodChange("maritimo")}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedMethod === "maritimo"
              ? "border-brand-orange bg-white ring-2 ring-brand-orange/20"
              : "border-slate-200 bg-white/60 hover:bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5 font-bold text-xs text-brand-navy">
              <Ship className="w-4 h-4 text-brand-orange" /> Marítimo Consolidado
            </span>
            <span className="text-sm font-black text-brand-orange">
              ~${seaEstimate.totalLogisticsUsd.toFixed(2)}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {SHIPPING_CONFIG.seaEstimatedDays} · Por volumen ({seaEstimate.totalVolumeCbm} CBM)
          </p>
        </button>

        <button
          type="button"
          onClick={() => onMethodChange("aereo")}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedMethod === "aereo"
              ? "border-brand-orange bg-white ring-2 ring-brand-orange/20"
              : "border-slate-200 bg-white/60 hover:bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5 font-bold text-xs text-brand-navy">
              <Plane className="w-4 h-4 text-brand-orange" /> Aéreo Express
            </span>
            <span className="text-sm font-black text-brand-orange">
              ~${airEstimate.totalLogisticsUsd.toFixed(2)}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {SHIPPING_CONFIG.airEstimatedDays} · Por peso ({airEstimate.totalWeightKg} Kg)
          </p>
        </button>
      </div>

      {/* Desglose transparente */}
      <div className="bg-white rounded-xl p-3 border border-slate-200/80 text-xs space-y-1.5">
        <div className="flex justify-between text-slate-600">
          <span>
            Peso total estimado ({quantity} uds): <strong>{activeEstimate.totalWeightKg} kg</strong>
          </span>
          <span>
            Volumen total: <strong>{activeEstimate.totalVolumeCbm} m³ (CBM)</strong>
          </span>
        </div>
        <div className="border-t border-slate-100 pt-1.5 flex justify-between">
          <span className="text-slate-600">Costo del Producto (Precio Alibaba):</span>
          <strong className="text-slate-900">${productSubtotalUsd.toFixed(2)} USD</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">
            Flete {selectedMethod === "maritimo" ? "Marítimo" : "Aéreo"} + Nacionalización (est.):
          </span>
          <strong className="text-slate-800">${activeEstimate.freightCostUsd.toFixed(2)} USD</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">
            Comisión de compra y consolidación ({SHIPPING_CONFIG.managementFeePercent}%):
          </span>
          <strong className="text-slate-800">${activeEstimate.managementFeeUsd.toFixed(2)} USD</strong>
        </div>
        <div className="border-t border-slate-200 pt-1.5 flex justify-between text-sm font-extrabold text-brand-navy">
          <span>Costo Total Estimado en Venezuela:</span>
          <span className="text-brand-orange">${totalInVenezuelaUsd.toFixed(2)} USD</span>
        </div>
      </div>

      {/* SIMULADOR DE CUOTAS ESTILO CASHEA */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50/80 to-amber-50 rounded-xl p-3.5 border border-amber-300 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span className="text-xs font-black text-brand-navy">
              Simulador de Cuotas (Alianza estilo Cashea · Mín. ${SHIPPING_CONFIG.installmentsMinOrderUsd} USD)
            </span>
          </div>
          <span className="text-[10px] font-extrabold bg-brand-navy text-amber-300 px-2 py-0.5 rounded-full">
            3 cuotas cada 14 días
          </span>
        </div>

        {/* Selector de Nivel 1 al 6 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {CASHEA_TIERS.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedTierId(tier.id)}
              className={`p-2 rounded-lg border text-center transition-all ${
                selectedTierId === tier.id
                  ? "bg-brand-navy text-white border-brand-navy shadow-xs"
                  : "bg-white text-slate-700 border-amber-200 hover:bg-amber-100/50"
              }`}
            >
              <div className="text-[11px] font-extrabold">{tier.name}</div>
              <div
                className={`text-[10px] font-bold ${
                  selectedTierId === tier.id ? "text-amber-300" : "text-brand-orange"
                }`}
              >
                {tier.badge}
              </div>
            </button>
          ))}
        </div>

        {installmentPlan.eligible ? (
          <div className="bg-white rounded-lg p-2.5 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">
                Pago Inicial Hoy ({activeTier.initialPercent}%):
              </span>
              <strong className="text-base font-black text-brand-navy">
                ${installmentPlan.initialPaymentUsd.toFixed(2)} USD
              </strong>
            </div>
            <div className="sm:text-right">
              <span className="text-slate-500 block text-[11px]">
                + {installmentPlan.installmentsCount} cuotas cada 14 días de:
              </span>
              <strong className="text-base font-black text-brand-orange">
                ${installmentPlan.eachInstallmentUsd.toFixed(2)} USD c/u
              </strong>
            </div>
          </div>
        ) : (
          <p className="text-xs text-red-700 font-semibold bg-white p-2 rounded-lg border border-red-200">
            El monto mínimo para financiar en cuotas es de ${SHIPPING_CONFIG.installmentsMinOrderUsd} USD. Sube la cantidad para activarlo.
          </p>
        )}
      </div>

      <p className="text-[11px] text-slate-500 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
        <span>
          Puedes pagar de contado (Zelle, Binance, Pago Móvil) o elegir financiamiento en cuotas en el Checkout.
        </span>
      </p>
    </div>
  );
}
