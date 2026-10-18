"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  CheckCircle2,
  Clock,
  Ship,
  Plane,
  PackageCheck,
  Building2,
  FileCheck2,
  MapPin,
  DollarSign,
} from "lucide-react";

interface DemoOrder {
  code: string;
  customer: string;
  city: string;
  method: "Marítimo Consolidado" | "Aéreo Express";
  itemsSummary: string;
  alibabaPaidUsd: number;
  freightCommissionUsd: number;
  freightStatus: "Pendiente de liquidar al arribar" | "Pagado y liberado";
  currentStepIndex: number; // 0 to 5
  eta: string;
  steps: {
    title: string;
    location: string;
    date: string;
    description: string;
  }[];
}

const DEMO_ORDERS: Record<string, DemoOrder> = {
  "UI-VE-84920": {
    code: "UI-VE-84920",
    customer: "Comercializadora TecnoCaracas C.A.",
    city: "Caracas, Distrito Capital",
    method: "Aéreo Express",
    itemsSummary: "50x Auriculares TWS ANC Bluetooth 5.3 + 20x Smartwatch Ultra Series 9",
    alibabaPaidUsd: 516.0,
    freightCommissionUsd: 248.5,
    freightStatus: "Pendiente de liquidar al arribar",
    currentStepIndex: 3,
    eta: "Llegada estimada a Maiquetía: en 4 días",
    steps: [
      {
        title: "1. Pedido Recibido y Pago Alibaba Verificado",
        location: "Caracas, Venezuela",
        date: "10 Oct · 09:30 AM",
        description: "Recibimos tu pago a precio de Alibaba ($516.00 USD vía Binance Pay).",
      },
      {
        title: "2. Comprado Directamente en Alibaba China",
        location: "Shenzhen, China",
        date: "11 Oct · 02:15 PM",
        description: "Orden pagada a las fábricas Shenzhen Acoustics Tech y Dongguan SmartWear.",
      },
      {
        title: "3. Recibido y Consolidado en Almacén Universo Imports",
        location: "Almacén Guangzhou, China",
        date: "14 Oct · 06:00 PM",
        description: "Inspección de calidad aprobada. Peso real consolidado: 13.4 Kg.",
      },
      {
        title: "4. En Tránsito Internacional (China → Venezuela)",
        location: "Vuelo de Carga Hong Kong → Maiquetía",
        date: "16 Oct · 11:20 PM",
        description: "Valija aérea despachada. En ruta hacia Venezuela.",
      },
      {
        title: "5. Nacionalización en Aduana y Liquidación de Flete",
        location: "Aduana Aérea de Maiquetía, VE",
        date: "Próximo paso",
        description: "Desaduanamiento incluido y cobro de comisión/flete ($248.50 USD).",
      },
      {
        title: "6. En Venezuela · Listo para Entrega",
        location: "Sede Caracas, Venezuela",
        date: "Pendiente",
        description: "Entrega en oficina o despacho puerta a puerta.",
      },
    ],
  },
  "UI-VE-33105": {
    code: "UI-VE-33105",
    customer: "Ferretería Industrial El Tigre",
    city: "Valencia, Carabobo",
    method: "Marítimo Consolidado",
    itemsSummary: "30x Taladro Percutor Brushless 21V + 20x Caja Herramientas 108 Pzas",
    alibabaPaidUsd: 902.0,
    freightCommissionUsd: 265.2,
    freightStatus: "Pendiente de liquidar al arribar",
    currentStepIndex: 4,
    eta: "En puerto de La Guaira (Aduana en proceso)",
    steps: [
      {
        title: "1. Pedido Recibido y Pago Alibaba Verificado",
        location: "Valencia, Venezuela",
        date: "12 Sep · 10:15 AM",
        description: "Pago de productos a costo Alibaba ($902.00 USD vía Zelle) confirmado.",
      },
      {
        title: "2. Comprado Directamente en Alibaba China",
        location: "Yongkang / Hangzhou, China",
        date: "13 Sep · 04:00 PM",
        description: "Fábricas despacharon 50 cajas hacia nuestra bodega marítima.",
      },
      {
        title: "3. Recibido y Cubicaje en Almacén China",
        location: "Puerto de Ningbo / Yiwu, China",
        date: "18 Sep · 11:00 AM",
        description: "Volumen total medido: 0.455 CBM. Contenedor consolidado cerrado.",
      },
      {
        title: "4. En Tránsito Marítimo (China → Venezuela)",
        location: "Buque CMA CGM · Ruta Pacífico-Caribe",
        date: "22 Sep · 08:00 AM",
        description: "Tránsito marítimo internacional completado sin novedades.",
      },
      {
        title: "5. Nacionalización en Aduana y Liquidación de Flete",
        location: "Puerto de La Guaira, Venezuela",
        date: "Hoy · En proceso",
        description: "Trámite de nacionalización activo. Ya puedes abonar tu flete ($265.20 USD).",
      },
      {
        title: "6. En Venezuela · Listo para Entrega",
        location: "Valencia, Carabobo",
        date: "Estimado en 48h",
        description: "Despacho en camión hacia tu local en Valencia.",
      },
    ],
  },
};

function SeguimientoContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("codigo") || "UI-VE-84920";

  const [inputCode, setInputCode] = useState(initialCode);
  const [activeCode, setActiveCode] = useState(initialCode);

  const order: DemoOrder = DEMO_ORDERS[activeCode] || {
    ...DEMO_ORDERS["UI-VE-84920"],
    code: activeCode.toUpperCase(),
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      setActiveCode(inputCode.trim().toUpperCase());
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Cabecera y buscador de tracking */}
      <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
            Rastreo en Tiempo Real China → Venezuela
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-300">Probar códigos demo:</span>
            <button
              type="button"
              onClick={() => {
                setInputCode("UI-VE-84920");
                setActiveCode("UI-VE-84920");
              }}
              className={`px-2.5 py-1 rounded-lg font-bold ${
                activeCode === "UI-VE-84920"
                  ? "bg-brand-orange text-white"
                  : "bg-white/10 text-slate-200"
              }`}
            >
              UI-VE-84920 (Aéreo)
            </button>
            <button
              type="button"
              onClick={() => {
                setInputCode("UI-VE-33105");
                setActiveCode("UI-VE-33105");
              }}
              className={`px-2.5 py-1 rounded-lg font-bold ${
                activeCode === "UI-VE-33105"
                  ? "bg-brand-orange text-white"
                  : "bg-white/10 text-slate-200"
              }`}
            >
              UI-VE-33105 (Marítimo en Aduana)
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black">
          Seguimiento de tu Importación
        </h1>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Ingresa tu código de orden (ej. UI-VE-84920)"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-900 bg-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-sm px-6 py-3 rounded-xl"
          >
            Consultar Estado
          </button>
        </form>
      </div>

      {/* Tarjeta de estado actual */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black bg-brand-navy text-white px-3 py-1 rounded-full">
                Orden #{order.code}
              </span>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full flex items-center gap-1">
                {order.method.includes("Aéreo") ? (
                  <Plane className="w-3.5 h-3.5 text-brand-orange" />
                ) : (
                  <Ship className="w-3.5 h-3.5 text-brand-orange" />
                )}
                {order.method}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-brand-navy mt-2">
              {order.itemsSummary}
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-brand-orange" /> Destino final:{" "}
              <strong>{order.city}</strong> · Cliente: {order.customer}
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-right shrink-0">
            <span className="text-[11px] font-bold text-emerald-700 uppercase block">
              Tiempo Estimado (ETA)
            </span>
            <strong className="text-sm font-black text-emerald-950">{order.eta}</strong>
          </div>
        </div>

        {/* Estado Financiero de los 2 pagos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase">
                ✓ Pago 1 Completado (Costo Alibaba)
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                Mercancía pagada al proveedor en China
              </p>
            </div>
            <span className="text-lg font-black text-brand-navy">
              ${order.alibabaPaidUsd.toFixed(2)} USD
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-amber-900 uppercase">
                Pago 2: Flete + Nacionalización + Comisión
              </span>
              <p className="text-xs text-amber-800 mt-0.5">{order.freightStatus}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-black text-brand-orange block">
                ${order.freightCommissionUsd.toFixed(2)} USD
              </span>
              <a
                href={`https://wa.me/584120000000?text=Hola%20Universo%20Imports,%20quiero%20liquidar%20el%20flete%20de%20la%20orden%20${order.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-extrabold text-brand-navy underline"
              >
                Liquidar flete ahora →
              </a>
            </div>
          </div>
        </div>

        {/* Línea de tiempo de 6 etapas */}
        <div className="pt-2">
          <h3 className="text-sm font-extrabold text-brand-navy mb-5">
            Progreso Logístico Paso a Paso
          </h3>

          <div className="space-y-4">
            {order.steps.map((step, index) => {
              const isCompleted = index < order.currentStepIndex;
              const isCurrent = index === order.currentStepIndex;

              return (
                <div
                  key={index}
                  className={`flex gap-4 p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? "border-brand-orange bg-amber-50/40 ring-2 ring-brand-orange/15"
                      : isCompleted
                      ? "border-slate-200 bg-white"
                      : "border-slate-100 bg-slate-50/60 opacity-65"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center animate-pulse">
                        <Clock className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-extrabold text-sm text-brand-navy">
                        {step.title}
                      </h4>
                      <span className="text-xs font-semibold text-slate-500">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-brand-orange mt-0.5">
                      📍 {step.location}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SeguimientoPage() {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-12 text-center">Cargando rastreo...</div>}>
      <SeguimientoContent />
    </Suspense>
  );
}
