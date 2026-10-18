"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Link2,
  Send,
  CheckCircle2,
  Ship,
  Plane,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

function CotizarFormContent() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("producto") || "";

  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("Caracas");
  const [productNameOrUrl, setProductNameOrUrl] = useState(initialProduct);
  const [quantity, setQuantity] = useState("20");
  const [shippingPref, setShippingPref] = useState<"maritimo" | "aereo" | "asesoria">("maritimo");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [quoteCode, setQuoteCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = "COT-" + Math.floor(100000 + Math.random() * 900000);
    setQuoteCode(randomCode);
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Columna izquierda: Explicación */}
        <div className="lg:col-span-5 space-y-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-brand-orange" /> Servicio de Búsqueda y Compra en China
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy leading-tight">
            ¿No está en la página? <span className="text-brand-orange">¡Nosotros te lo traemos de Alibaba!</span>
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Si viste un producto en <strong>Alibaba, 1688, Taobao o AliExpress</strong>, o tienes una idea de negocio y quieres que busquemos la fábrica en China, llena este formulario.
          </p>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3.5 text-xs">
            <h3 className="font-extrabold text-sm text-brand-navy">
              ¿Qué hacemos cuando envías tu solicitud?
            </h3>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <p className="text-slate-600">
                <strong>Verificamos el proveedor en Alibaba:</strong> confirmamos precio real de fábrica, MOQ, peso y volumen de las cajas.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <p className="text-slate-600">
                <strong>Te enviamos la cotización a tu WhatsApp:</strong> verás por separado el costo del producto a precio Alibaba y el estimado de flete (marítimo o aéreo) a Venezuela.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <p className="text-slate-600">
                <strong>Compras sin complicaciones:</strong> pagas en Venezuela (Pago Móvil, Zelle, Binance Pay) y nosotros nos encargamos de todo.
              </p>
            </div>
          </div>

          <div className="bg-brand-navy text-white rounded-2xl p-4 text-xs flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-orange shrink-0" />
            <p className="text-slate-300">
              Inspeccionamos tu mercancía al llegar a nuestro almacén en <strong>Guangzhou / Shenzhen</strong> antes de embarcar hacia Venezuela.
            </p>
          </div>
        </div>

        {/* Columna derecha: Formulario */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                Solicitud Registrada: #{quoteCode}
              </span>
              <h2 className="text-2xl font-black text-brand-navy">
                ¡Recibimos tu solicitud de importación!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Nuestro equipo de compras revisará el producto <strong>&ldquo;{productNameOrUrl}&rdquo;</strong> ({quantity} uds) y te contactará al WhatsApp <strong>{whatsapp}</strong> con el precio de fábrica de Alibaba y el costo de envío a <strong>{city}</strong>.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/584120000000?text=${encodeURIComponent(
                    `Hola Universo Imports, acabo de registrar la cotización #${quoteCode}.\nProducto/Link: ${productNameOrUrl}\nCantidad: ${quantity}\nEnvío preferido: ${shippingPref}\nCiudad: ${city}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Acelerar por WhatsApp Ahora
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-5 py-3.5 rounded-xl"
                >
                  Cotizar otro producto
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5"
            >
              <h2 className="text-lg font-black text-brand-navy border-b border-slate-100 pb-3">
                Formulario: &ldquo;Quiero traer este producto&rdquo;
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tu Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Carlos Rodríguez"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tu WhatsApp en Venezuela *
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Ej. +58 412 1234567"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Link de Alibaba / 1688 o Nombre del Producto que buscas *
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={productNameOrUrl}
                    onChange={(e) => setProductNameOrUrl(e.target.value)}
                    placeholder="Pega el link de Alibaba.com o escribe ej. 'Máquina selladora de vasos'"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cantidad aproximada a traer *
                  </label>
                  <input
                    type="text"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Ej. 50 unidades / 2 cajas"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ciudad de entrega en Venezuela *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="Caracas">Caracas</option>
                    <option value="Valencia">Valencia</option>
                    <option value="Maracay">Maracay</option>
                    <option value="Barquisimeto">Barquisimeto</option>
                    <option value="Maracaibo">Maracaibo</option>
                    <option value="Puerto La Cruz / Lechería">Puerto La Cruz / Lechería</option>
                    <option value="Puerto Ordaz">Puerto Ordaz</option>
                    <option value="San Cristóbal">San Cristóbal</option>
                    <option value="Otra ciudad">Otra ciudad (especificar en notas)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ¿Cómo prefieres traerlo desde China?
                </label>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setShippingPref("maritimo")}
                    className={`p-3 rounded-xl border font-bold flex flex-col items-center gap-1 ${
                      shippingPref === "maritimo"
                        ? "border-brand-orange bg-amber-50 text-brand-navy"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <Ship className="w-4 h-4 text-brand-orange" />
                    Marítimo (Más económico)
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingPref("aereo")}
                    className={`p-3 rounded-xl border font-bold flex flex-col items-center gap-1 ${
                      shippingPref === "aereo"
                        ? "border-brand-orange bg-amber-50 text-brand-navy"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <Plane className="w-4 h-4 text-brand-orange" />
                    Aéreo (Más rápido)
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingPref("asesoria")}
                    className={`p-3 rounded-xl border font-bold flex flex-col items-center gap-1 ${
                      shippingPref === "asesoria"
                        ? "border-brand-orange bg-amber-50 text-brand-navy"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-brand-orange" />
                    Recomiéndenme
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Especificaciones, colores, voltaje o dudas adicionales
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Cuéntanos detalles del producto, si requieres logo propio (OEM), etc."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-brand-orange"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                Solicitar Cotización a Precio Alibaba
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CotizarPage() {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-12 text-center">Cargando formulario...</div>}>
      <CotizarFormContent />
    </Suspense>
  );
}
