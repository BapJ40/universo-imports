"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  MapPin,
  Clock,
  HelpCircle,
  CheckCircle2,
  Send,
  Building2,
} from "lucide-react";

const FAQS = [
  {
    q: "¿De verdad compro a precio de Alibaba?",
    a: "Sí. Tú pagas el valor de los productos al mismo precio publicado por la fábrica en Alibaba. Nosotros hacemos la compra por ti en China y nuestro negocio consiste en encargarnos de la logística, consolidación, flete (marítimo o aéreo) y nacionalización hacia Venezuela.",
  },
  {
    q: "¿Cuándo pago el envío y la comisión?",
    a: "Primero abonas el costo de tus productos para comprarlos al proveedor chino. Una vez que la mercancía llega a nuestro almacén en Guangzhou/Shenzhen y se mide su peso (Kg) o volumen (CBM) real, se liquida el flete con nacionalización incluida para entregarlo en Venezuela.",
  },
  {
    q: "¿Qué pasa si el producto que quiero traer no aparece en la web?",
    a: "Puedes ir a la sección 'Quiero traer un producto' y pegarnos el link de Alibaba, 1688, Taobao o enviarnos fotos por WhatsApp. Nosotros buscamos el fabricante en China y te cotizamos sin compromiso.",
  },
  {
    q: "¿Cuáles son los métodos de pago en Venezuela?",
    a: "Aceptamos Pago Móvil en Bolívares, Zelle (USD), Binance Pay (USDT) y Transferencia Bancaria nacional.",
  },
  {
    q: "¿Cuál es la diferencia entre envío Marítimo y Aéreo?",
    a: "El envío Aéreo tarda de 12 a 18 días hábiles y se cobra por kilogramo (ideal para electrónica, relojes, repuestos urgentes). El envío Marítimo tarda de 35 a 45 días y se cobra por metro cúbico CBM (mucho más económico para mercancía pesada o de mayor volumen).",
  },
];

export default function ContactoPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Encabezado */}
      <div className="bg-brand-navy text-white rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
            Atención Directa en Venezuela y China
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Habla con nuestros Asesores de Importación
          </h1>
          <p className="text-sm text-slate-300">
            Resolvemos tus dudas sobre proveedores de Alibaba, cálculo de fletes marítimos o aéreos, compras al mayor y entregas en toda Venezuela.
          </p>
        </div>

        <a
          href="https://wa.me/584120000000?text=Hola%20Universo%20Imports,%20quiero%20asesor%C3%ADa%20sobre%20importaciones%20de%20Alibaba"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm px-6 py-4 rounded-2xl flex items-center gap-2.5 shrink-0 shadow-lg"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          Chatear por WhatsApp Ahora
        </a>
      </div>

      {/* Sedes + Formulario */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
            <span className="text-xs font-extrabold text-brand-orange uppercase">
              Sede Principal Venezuela
            </span>
            <h3 className="font-black text-base text-brand-navy flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-orange" /> Caracas y Valencia
            </h3>
            <p className="text-xs text-slate-600">
              Entregas personales en Caracas (Las Mercedes) y Valencia (Zona Industrial), más envíos asegurados a todo el país.
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1 pt-1">
              <Clock className="w-3.5 h-3.5" /> Lunes a Sábado: 8:30 AM – 6:00 PM
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
            <span className="text-xs font-extrabold text-brand-orange uppercase">
              Almacén Receptor en China
            </span>
            <h3 className="font-black text-base text-brand-navy flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-brand-orange" /> Guangzhou & Shenzhen Warehouse
            </h3>
            <p className="text-xs text-slate-600">
              Baiyun District, Guangzhou, Guangdong Province, China. Recepción diaria de paquetes de Alibaba, 1688 y fábricas locales.
            </p>
          </div>
        </div>

        {/* Formulario rápido */}
        <div className="lg:col-span-7">
          {sent ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="text-xl font-black text-brand-navy">
                ¡Mensaje enviado con éxito!
              </h2>
              <p className="text-sm text-slate-600">
                Uno de nuestros asesores te escribirá en breve a tu WhatsApp.
              </p>
              <button
                onClick={() => setSent(false)}
                className="bg-slate-100 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4"
            >
              <h2 className="text-lg font-black text-brand-navy">
                Déjanos tu consulta
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Tu nombre *"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
                <input
                  type="tel"
                  required
                  placeholder="Tu WhatsApp *"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
                />
              </div>
              <textarea
                rows={4}
                required
                placeholder="¿En qué podemos ayudarte? (Dudas sobre fletes, compras por contenedor o bulto, etc.)"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
              <button
                type="submit"
                className="bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-sm px-6 py-3.5 rounded-xl flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Enviar Mensaje
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Preguntas Frecuentes */}
      <div>
        <h2 className="text-2xl font-black text-brand-navy mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-brand-orange" />
          Preguntas Frecuentes sobre el Modelo de Importación
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2"
            >
              <h3 className="font-extrabold text-sm text-brand-navy">{item.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
