"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Upload,
  ShieldCheck,
  PackageSearch,
  ArrowLeft,
  Info,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { getUnitPriceForQuantity } from "@/lib/products";

type PaymentMethodId = "pagomovil" | "zelle" | "binance" | "transferencia";

const PAYMENT_METHODS: {
  id: PaymentMethodId;
  title: string;
  badge: string;
  instructions: string[];
}[] = [
  {
    id: "pagomovil",
    title: "📱 Pago Móvil (Bs - Tasa BCV / Promedio)",
    badge: "Aprobación Rápida",
    instructions: [
      "Banco: Banesco (0134)",
      "RIF: J-50123456-7 (Universo Imports C.A.)",
      "Teléfono: 0412-0000000",
      "Coloca el número de referencia de 6 u 8 dígitos abajo.",
    ],
  },
  {
    id: "zelle",
    title: "💵 Zelle (USD Directo)",
    badge: "Sin comisión extra",
    instructions: [
      "Correo Zelle: pagos@universoimports.com",
      "Titular: Universo Imports LLC",
      "Nota / Memo: Solo coloca tu nombre sin palabras como 'Venezuela' o 'Importación'.",
    ],
  },
  {
    id: "binance",
    title: "🟡 Binance Pay / USDT (TRC20)",
    badge: "1 USDT = 1 USD",
    instructions: [
      "Binance Pay ID: 294810552 (UniversoImportsVE)",
      "Correo Binance: binance@universoimports.com",
      "Envía el monto exacto en USDT y adjunta el Order ID.",
    ],
  },
  {
    id: "transferencia",
    title: "🏦 Transferencia Bancaria Nacional (Bs / Custodia USD)",
    badge: "Banesco / Mercantil",
    instructions: [
      "Cuenta Corriente Banesco: 0134-0031-88-0311099999",
      "Titular: Universo Imports C.A. · RIF: J-50123456-7",
      "Envía el comprobante bancario para validar tu orden.",
    ],
  },
];

export default function CheckoutPage() {
  const {
    items,
    alibabaSubtotalUsd,
    estimatedLogisticsUsd,
    grandTotalEstimatedUsd,
    clearCart,
  } = useCart();

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId>("zelle");
  const [customerName, setCustomerName] = useState("");
  const [cedulaRif, setCedulaRif] = useState("");
  const [phone, setPhone] = useState("");
  const [stateCity, setStateCity] = useState("Caracas - Distrito Capital");
  const [address, setAddress] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [fileName, setFileName] = useState<string>("");
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");

  const activePaymentMethod = PAYMENT_METHODS.find((m) => m.id === selectedPayment)!;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "UI-VE-" + Math.floor(10000 + Math.random() * 90000);
    setGeneratedOrderId(id);
    setOrderCompleted(true);
    clearCart();
  };

  if (orderCompleted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center shadow-lg space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3.5 py-1 rounded-full">
            Orden de Importación Creada: #{generatedOrderId}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
            ¡Tu pedido a precio Alibaba está en marcha!
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Gracias, <strong>{customerName}</strong>. Validaremos tu pago por <strong>{activePaymentMethod.title}</strong> (Ref: {referenceCode}) y procederemos a comprar tu mercancía directamente al proveedor en China.
          </p>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-1.5 max-w-lg mx-auto">
            <p className="font-bold text-brand-navy">Próximos pasos de tu importación:</p>
            <p className="text-slate-600">1. Compramos tu pedido en Alibaba y lo recibimos en nuestro almacén de Guangzhou/Shenzhen.</p>
            <p className="text-slate-600">2. Pesamos/cubicamos tu carga y la embarcamos hacia <strong>{stateCity}</strong>.</p>
            <p className="text-slate-600">3. Al llegar a Venezuela, liquidas el flete/nacionalización y recibes tus productos.</p>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/seguimiento?codigo=${generatedOrderId}`}
              className="bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2"
            >
              <PackageSearch className="w-4 h-4" />
              Ver Seguimiento de mi Pedido (#{generatedOrderId})
            </Link>
            <Link
              href="/catalogo"
              className="bg-brand-navy text-white font-bold text-sm px-6 py-3.5 rounded-xl"
            >
              Seguir Explorando Catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/carrito"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-orange mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a mi orden
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Formulario Checkout */}
        <form onSubmit={handleConfirmOrder} className="lg:col-span-8 space-y-6">
          {/* Paso 1: Datos de entrega en Venezuela */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-black text-brand-navy">
              1. Datos del Importador y Entrega en Venezuela
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre Completo o Empresa *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej. Inversiones El Sol / María Pérez"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cédula o RIF *
                </label>
                <input
                  type="text"
                  required
                  value={cedulaRif}
                  onChange={(e) => setCedulaRif(e.target.value)}
                  placeholder="V-12345678 / J-50000000-0"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp de Contacto *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+58 414 0000000"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estado y Ciudad de Destino *
                </label>
                <select
                  value={stateCity}
                  onChange={(e) => setStateCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white"
                >
                  <option>Caracas - Distrito Capital</option>
                  <option>Valencia - Carabobo</option>
                  <option>Maracay - Aragua</option>
                  <option>Barquisimeto - Lara</option>
                  <option>Maracaibo - Zulia</option>
                  <option>Lechería / Puerto La Cruz - Anzoátegui</option>
                  <option>Puerto Ordaz - Bolívar</option>
                  <option>San Cristóbal - Táchira</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dirección exacta o Agencia Zoom / MRW / Tealca de retiro *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. Av. Bolívar Norte, CC Camoruco, Local 12 o Retiro en sede Universo Imports"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          {/* Paso 2: Selección de Método de Pago en Venezuela */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-black text-brand-navy">
              2. Método de Pago (Pago 1: Compra de Mercancía a Precio Alibaba)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedPayment(m.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedPayment === m.id
                      ? "border-brand-orange bg-amber-50/70 ring-2 ring-brand-orange/20"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-brand-navy">{m.title}</span>
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-bold bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                    {m.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Datos bancarios del método elegido */}
            <div className="bg-brand-navy text-white rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300">
                  Instrucciones para {activePaymentMethod.title}
                </span>
                <span className="font-black text-sm">
                  Monto a abonar hoy: ${(alibabaSubtotalUsd || 156.0).toFixed(2)} USD
                </span>
              </div>
              <ul className="space-y-1 text-slate-200 list-disc list-inside">
                {activePaymentMethod.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>

            {/* Comprobante simulado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Número de Referencia / Confirmación *
                </label>
                <input
                  type="text"
                  required
                  value={referenceCode}
                  onChange={(e) => setReferenceCode(e.target.value)}
                  placeholder="Ej. 94827104"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subir Captura o Comprobante (Simulado)
                </label>
                <label className="flex items-center justify-center gap-2 px-3.5 py-2.5 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-brand-orange text-xs text-slate-600 bg-slate-50">
                  <Upload className="w-4 h-4 text-brand-orange" />
                  <span className="truncate">
                    {fileName || "Seleccionar imagen del comprobante..."}
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-sm py-4 rounded-2xl shadow-lg transition-colors"
            >
              Confirmar Pago de Mercancía (${(alibabaSubtotalUsd || 156.0).toFixed(2)} USD) y Procesar Compra en Alibaba
            </button>
          </div>
        </form>

        {/* Resumen lateral */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sticky top-28 space-y-4">
            <h3 className="font-black text-base text-brand-navy border-b border-slate-100 pb-3">
              Resumen de tu Orden ({items.length || 1} ítems)
            </h3>

            {items.length > 0 ? (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 text-xs">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="text-slate-700 line-clamp-1 font-medium">
                      {item.quantity}x {item.product.title}
                    </span>
                    <strong className="text-slate-900 shrink-0">
                      ${(getUnitPriceForQuantity(item.product, item.quantity) * item.quantity).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Modo demostración: Orden de ejemplo lista para probar el flujo visual.
              </p>
            )}

            <div className="space-y-2 text-xs pt-2 border-t border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-600 font-semibold">1. Pago Hoy (Costo Alibaba):</span>
                <strong className="text-base text-brand-navy">
                  ${(alibabaSubtotalUsd || 156.0).toFixed(2)} USD
                </strong>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>2. Flete + Aduana (Se paga al llegar):</span>
                <strong>~${(estimatedLogisticsUsd || 47.48).toFixed(2)} USD</strong>
              </div>
              <div className="flex justify-between font-black text-sm text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Estimado Final:</span>
                <span className="text-brand-orange">
                  ${(grandTotalEstimatedUsd || 203.48).toFixed(2)} USD
                </span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-[11px] text-emerald-900 flex gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Garantía Universo Imports:</strong> Si el proveedor en Alibaba no tiene stock, te reembolsamos el 100% o buscamos otra fábrica equivalente.
              </span>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 flex gap-2">
              <Info className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span>
                El flete y nacionalización se calculan con el peso/volumen real al recibir tu carga en nuestro almacén de China.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
