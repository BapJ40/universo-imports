"use client";

import React from "react";
import { Ship, Plane, Calculator, Info } from "lucide-react";
import {
  ShippingMethod,
  SHIPPING_CONFIG,
  calculateShippingEstimate,
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
          <span className="text-brand-orange">
            ${(productSubtotalUsd + activeEstimate.totalLogisticsUsd).toFixed(2)} USD
          </span>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
        <span>
          Pagas primero <strong>${productSubtotalUsd.toFixed(2)} USD</strong> para comprar tu mercancía en Alibaba. El flete y nacionalización (~${activeEstimate.totalLogisticsUsd.toFixed(2)} USD) se cobran al medir y despachar tu carga a Venezuela.
        </span>
      </p>
    </div>
  );
}
