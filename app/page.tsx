import React from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ShieldCheck,
  Ship,
  Plane,
  PackageCheck,
  DollarSign,
  ArrowRight,
  Layers,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { productProvider } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featuredProducts = productProvider.getFeatured();
  const allProducts = productProvider.getAll().slice(0, 12);
  const categories = productProvider.getCategories();

  return (
    <div>
      {/* HERO PRINCIPAL */}
      <section className="bg-gradient-to-br from-brand-navy via-[#102A4E] to-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              Importación Directa China → Venezuela sin Intermediarios
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Compras a <span className="text-brand-orange">Precio de Alibaba</span>, nosotros lo traemos a Venezuela.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Elige productos directamente de fábricas verificadas en China o pídenos cualquier artículo que quieras importar. Pagas el producto a costo de Alibaba y luego liquidas el flete marítimo o aéreo con nacionalización incluida.
            </p>

            {/* Buscador Hero */}
            <form action="/catalogo" method="GET" className="max-w-xl pt-1">
              <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-2xl shadow-xl">
                <div className="flex items-center flex-1 px-3 gap-2">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    name="q"
                    placeholder="¿Qué quieres importar hoy? (ej. Smartwatch, Freidora, Franela...)"
                    className="w-full py-2 text-sm text-slate-800 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-orangeHover text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shrink-0"
                >
                  Buscar en Catálogo
                </button>
              </div>
            </form>

            {/* Botones rápidos */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/cotizar"
                className="bg-amber-400 hover:bg-amber-300 text-brand-navy font-extrabold text-xs sm:text-sm px-4 py-3 rounded-xl flex items-center gap-2 shadow-md transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                ¿No aparece tu producto? Pídelo aquí con link o foto
              </Link>
              <Link
                href="/seguimiento"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl transition-colors"
              >
                Ver ejemplo de Rastreo China → VE
              </Link>
            </div>
          </div>

          {/* Tarjeta visual explicativa derecha */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                    Ejemplo Real de Operación
                  </span>
                  <h2 className="text-lg font-extrabold text-brand-navy">
                    Transparencia Total en tus Costos
                  </h2>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  Ahorra hasta 60%
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">1. Pagas el Producto a Precio Alibaba</p>
                    <p className="text-slate-500">Ej: 30x Auriculares TWS ANC ($7.80 c/u)</p>
                  </div>
                  <span className="text-base font-black text-brand-navy">$234.00</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-amber-950">2. Nosotros compramos y recibimos en China</p>
                    <p className="text-amber-800">Verificación en almacén de Shenzhen/Guangzhou</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">3. Flete + Nacionalización + Comisión</p>
                    <p className="text-slate-500">Se liquida cuando tu carga sale a Venezuela</p>
                  </div>
                  <span className="text-sm font-extrabold text-brand-orange">Marítimo o Aéreo</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                <span>Aceptamos Zelle, Binance USDT, Pago Móvil</span>
                <Link href="/catalogo" className="text-brand-orange font-bold hover:underline flex items-center gap-1">
                  Simular pedido <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA EN 4 PASOS */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
            Modelo Simple y Seguro
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-navy mt-1">
            ¿Cómo funciona Universo Imports?
          </h2>
          <p className="text-sm text-slate-600 mt-1.5">
            Olvídate de tarjetas internacionales bloqueadas, proveedores dudosos o trámites aduanales complicados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              step: "Paso 1",
              icon: Search,
              title: "Elige o Cotiza tu Producto",
              desc: "Selecciona artículos de nuestro catálogo estilo Alibaba o envíanos el link/foto de lo que deseas traer.",
            },
            {
              step: "Paso 2",
              icon: DollarSign,
              title: "Compra a Precio Alibaba",
              desc: "Pagas el costo directo de los productos en Venezuela (Pago Móvil, Zelle, Binance Pay o Transferencia).",
            },
            {
              step: "Paso 3",
              icon: Ship,
              title: "Flete y Nacionalización",
              desc: "Recibimos tu carga en China, consolidamos y la enviamos por avión o barco con aduana incluida.",
            },
            {
              step: "Paso 4",
              icon: PackageCheck,
              title: "Liquidación y Entrega en VE",
              desc: "Pagas la comisión del flete al llegar y recibes tu mercancía lista para vender o usar.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-brand-orange bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                    {item.step}
                  </span>
                  <item.icon className="w-6 h-6 text-brand-navy" />
                </div>
                <h3 className="font-extrabold text-base text-brand-navy mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS RÁPIDAS */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-orange" />
            Categorías Más Importadas de Alibaba
          </h2>
          <Link href="/catalogo" className="text-xs font-bold text-brand-orange hover:underline">
            Ver todas ({productProvider.getAll().length} productos) →
          </Link>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/catalogo?categoria=${encodeURIComponent(cat)}`}
              className="bg-white hover:bg-brand-navy hover:text-white text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-2xs"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS ESTILO ALIBABA */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
              Precios por Escala y MOQ Real
            </span>
            <h2 className="text-2xl font-black text-brand-navy">
              Publicaciones Destacadas de Fábrica (Alibaba)
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="text-sm font-bold text-brand-navy hover:text-brand-orange flex items-center gap-1"
          >
            Explorar los 24 productos del catálogo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* BANNER "¿NO ENCUENTRAS TU PRODUCTO?" */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-brand-navy to-[#183766] rounded-3xl p-6 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-brand-orange text-white px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Búsqueda y Compra por Encargo en China
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              ¿Viste un producto en Alibaba, 1688 o Taobao que no aparece aquí?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Pega el enlace de Alibaba o dinos qué maquinaria, repuesto o lote quieres traer. Negociamos con el proveedor chino, verificamos calidad y te damos el costo exacto puesto en Venezuela.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
            <Link
              href="/cotizar"
              className="bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold text-sm px-6 py-4 rounded-xl text-center transition-colors shadow-lg"
            >
              Quiero Traer un Producto a Pedido
            </Link>
            <Link
              href="/contacto"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-4 rounded-xl text-center flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Consultar con Asesor
            </Link>
          </div>
        </div>
      </section>

      {/* MÁS PRODUCTOS DEL CATÁLOGO */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-brand-navy">
            Explora Más Productos listos para Importar
          </h2>
          <Link
            href="/catalogo"
            className="bg-brand-navy hover:bg-brand-navyLight text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
          >
            Ver Catálogo Completo (24)
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
