import React from "react";
import Link from "next/link";
import { Globe, ShieldCheck, Ship, Plane, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="bg-brand-navy text-slate-300 pt-14 pb-10 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Columna 1: Marca */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-orange flex items-center justify-center text-white font-black text-lg">
                U
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                UNIVERSO <span className="text-brand-orange">IMPORTS</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Tu puente directo entre las fábricas de Alibaba en China y tu negocio o casa en Venezuela. Compras a precio de fábrica y nosotros nos encargamos de la compra, consolidación, flete y nacionalización.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Proveedores verificados en Shenzhen, Guangzhou y Yiwu
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Plataforma
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/catalogo" className="hover:text-brand-orange transition-colors">
                  Catálogo Directo Alibaba
                </Link>
              </li>
              <li>
                <Link href="/cotizar" className="hover:text-brand-orange transition-colors">
                  Quiero traer un producto a pedido
                </Link>
              </li>
              <li>
                <Link href="/seguimiento" className="hover:text-brand-orange transition-colors">
                  Rastreo de Carga (China → VE)
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="hover:text-brand-orange transition-colors">
                  Mi Orden y Calculadora de Flete
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-brand-orange transition-colors">
                  Preguntas Frecuentes y WhatsApp
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Logística y Pagos */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Modalidades de Envío
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Plane className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">Flete Aéreo Express</p>
                  <p className="text-xs text-slate-400">12 a 18 días hábiles · Ideal para electrónica y paquetes ligeros (por Kg).</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Ship className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold">Flete Marítimo Consolidado</p>
                  <p className="text-xs text-slate-400">35 a 45 días · Máximo ahorro por volumen (CBM) con aduana incluida.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 4: Venezuela & Métodos de Pago */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Pagos y Entregas en Venezuela
            </h3>
            <p className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
              Caracas, Valencia, Maracay, Barquisimeto, Maracaibo, Puerto Ordaz y envíos nacionales.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-white">
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                📱 Pago Móvil (Bs)
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                💵 Zelle (USD)
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                🟡 Binance Pay (USDT)
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                🏦 Transferencia
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} Universo Imports Venezuela. Prototipo Visual de E-Commerce de Importaciones.</p>
          <p className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-brand-orange" /> Precios de producto expresados a costo Alibaba en USD.
          </p>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp siempre visible */}
      <a
        href="https://wa.me/584120000000?text=Hola%20Universo%20Imports,%20quiero%20asesor%C3%ADa%20para%20traer%20mercanc%C3%ADa%20de%20Alibaba%20a%20Venezuela"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold text-sm transition-transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">Asesor en WhatsApp</span>
      </a>
    </>
  );
}
