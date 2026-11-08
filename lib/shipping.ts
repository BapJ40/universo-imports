/**
 * Configuración centralizada de tarifas de flete, comisión y simulador de cuotas (Estilo Cashea).
 * En el futuro puedes ajustar estos valores en un solo lugar.
 */

export type ShippingMethod = "aereo" | "maritimo";

export const SHIPPING_CONFIG = {
  // Aéreo: tarifa referencial por kilogramo desde almacén en Guangzhou/Shenzhen/Miami hasta Venezuela
  airRatePerKgUsd: 16.5,
  airMinChargeUsd: 20.0,
  airEstimatedDays: "12 a 18 días hábiles",

  // Marítimo: tarifa referencial por metro cúbico (CBM) con nacionalización incluida puerta a puerta
  seaRatePerCbmUsd: 420.0,
  seaMinChargeUsd: 35.0,
  seaEstimatedDays: "35 a 45 días continuos",

  // Comisión de gestión de compra e inspección en China (porcentaje referencial sobre valor Alibaba/SHEIN)
  managementFeePercent: 8,

  // Configuración Financiamiento estilo Cashea (Aliado Comercial)
  installmentsMinOrderUsd: 20.0,
  installmentsCount: 3, // 3 cuotas cada 14 días
  financingProtectionPercent: 10, // Cobertura de comisión de plataforma / diferencial
};

export interface CasheaTier {
  id: string;
  name: string;
  badge: string;
  initialPercent: number; // Ej. 50, 40, 20, 0
}

export const CASHEA_TIERS: CasheaTier[] = [
  {
    id: "nivel-1-2",
    name: "Nivel 1 y 2",
    badge: "50% Inicial",
    initialPercent: 50,
  },
  {
    id: "nivel-3",
    name: "Nivel 3",
    badge: "40% Inicial",
    initialPercent: 40,
  },
  {
    id: "nivel-4-5",
    name: "Nivel 4 y 5",
    badge: "20% Inicial",
    initialPercent: 20,
  },
  {
    id: "nivel-6-promo",
    name: "Nivel 6 / Promo",
    badge: "0% Inicial 🔥",
    initialPercent: 0,
  },
];

export interface InstallmentPlanResult {
  eligible: boolean;
  minOrderUsd: number;
  baseTotalUsd: number;
  financedTotalUsd: number;
  initialPaymentUsd: number;
  remainingUsd: number;
  eachInstallmentUsd: number;
  installmentsCount: number;
}

export function calculateInstallmentPlan(
  baseTotalUsd: number,
  initialPercent: number
): InstallmentPlanResult {
  const eligible = baseTotalUsd >= SHIPPING_CONFIG.installmentsMinOrderUsd;
  const financedTotalUsd = Number(
    (
      baseTotalUsd *
      (1 + SHIPPING_CONFIG.financingProtectionPercent / 100)
    ).toFixed(2)
  );
  const initialPaymentUsd = Number(
    ((financedTotalUsd * initialPercent) / 100).toFixed(2)
  );
  const remainingUsd = Number((financedTotalUsd - initialPaymentUsd).toFixed(2));
  const eachInstallmentUsd = Number(
    (remainingUsd / SHIPPING_CONFIG.installmentsCount).toFixed(2)
  );

  return {
    eligible,
    minOrderUsd: SHIPPING_CONFIG.installmentsMinOrderUsd,
    baseTotalUsd,
    financedTotalUsd,
    initialPaymentUsd,
    remainingUsd,
    eachInstallmentUsd,
    installmentsCount: SHIPPING_CONFIG.installmentsCount,
  };
}

export interface ShippingEstimate {
  method: ShippingMethod;
  totalWeightKg: number;
  totalVolumeCbm: number;
  freightCostUsd: number;
  managementFeeUsd: number;
  totalLogisticsUsd: number;
  estimatedDays: string;
}

export function calculateShippingEstimate(params: {
  unitWeightKg: number;
  unitVolumeCbm: number;
  quantity: number;
  productSubtotalUsd: number;
  method: ShippingMethod;
}): ShippingEstimate {
  const totalWeightKg = Number((params.unitWeightKg * params.quantity).toFixed(2));
  const totalVolumeCbm = Number((params.unitVolumeCbm * params.quantity).toFixed(4));

  let freightCostUsd = 0;
  let estimatedDays = "";

  if (params.method === "aereo") {
    freightCostUsd = Math.max(
      SHIPPING_CONFIG.airMinChargeUsd,
      totalWeightKg * SHIPPING_CONFIG.airRatePerKgUsd
    );
    estimatedDays = SHIPPING_CONFIG.airEstimatedDays;
  } else {
    freightCostUsd = Math.max(
      SHIPPING_CONFIG.seaMinChargeUsd,
      totalVolumeCbm * SHIPPING_CONFIG.seaRatePerCbmUsd
    );
    estimatedDays = SHIPPING_CONFIG.seaEstimatedDays;
  }

  const managementFeeUsd = Number(
    ((params.productSubtotalUsd * SHIPPING_CONFIG.managementFeePercent) / 100).toFixed(2)
  );
  freightCostUsd = Number(freightCostUsd.toFixed(2));

  return {
    method: params.method,
    totalWeightKg,
    totalVolumeCbm,
    freightCostUsd,
    managementFeeUsd,
    totalLogisticsUsd: Number((freightCostUsd + managementFeeUsd).toFixed(2)),
    estimatedDays,
  };
}
