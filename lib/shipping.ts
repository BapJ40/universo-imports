/**
 * Configuración centralizada de tarifas de flete y comisión (Ejemplo configurable).
 * En el futuro puedes ajustar estos valores en un solo lugar.
 */

export type ShippingMethod = "aereo" | "maritimo";

export const SHIPPING_CONFIG = {
  // Aéreo: tarifa referencial por kilogramo desde almacén en Guangzhou/Shenzhen hasta Venezuela
  airRatePerKgUsd: 16.5,
  airMinChargeUsd: 25.0,
  airEstimatedDays: "12 a 18 días hábiles",

  // Marítimo: tarifa referencial por metro cúbico (CBM) con nacionalización incluida puerta a puerta
  seaRatePerCbmUsd: 420.0,
  seaMinChargeUsd: 35.0,
  seaEstimatedDays: "35 a 45 días continuos",

  // Comisión de gestión de compra e inspección en China (porcentaje referencial sobre valor Alibaba)
  managementFeePercent: 8,
};

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
