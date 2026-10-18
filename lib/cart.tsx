"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, getUnitPriceForQuantity } from "./products";
import { ShippingMethod, calculateShippingEstimate } from "./shipping";

export interface CartItem {
  product: Product;
  quantity: number;
  shippingMethod: ShippingMethod;
  notes?: string;
}

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, quantity: number, shippingMethod?: ShippingMethod, notes?: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateShippingMethod: (productId: string, method: ShippingMethod) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalUnits: number;
  alibabaSubtotalUsd: number;
  estimatedLogisticsUsd: number;
  grandTotalEstimatedUsd: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "universo_imports_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error leyendo carrito de localStorage", e);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Error guardando carrito en localStorage", e);
    }
  }, [items, hydrated]);

  const addItem = (
    product: Product,
    quantity: number,
    shippingMethod: ShippingMethod = "maritimo",
    notes?: string
  ) => {
    const validQty = Math.max(product.moq, quantity);
    setItems((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + validQty,
          shippingMethod,
          notes: notes || updated[idx].notes,
        };
        return updated;
      }
      return [...prev, { product, quantity: validQty, shippingMethod, notes }];
    });
    setIsDrawerOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;
        const clamped = Math.max(item.product.moq, quantity);
        return { ...item, quantity: clamped };
      })
    );
  };

  const updateShippingMethod = (productId: string, method: ShippingMethod) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, shippingMethod: method } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setItems([]);

  const totalUnits = items.reduce((acc, item) => acc + item.quantity, 0);

  const alibabaSubtotalUsd = Number(
    items
      .reduce((acc, item) => {
        const unitPrice = getUnitPriceForQuantity(item.product, item.quantity);
        return acc + unitPrice * item.quantity;
      }, 0)
      .toFixed(2)
  );

  const estimatedLogisticsUsd = Number(
    items
      .reduce((acc, item) => {
        const unitPrice = getUnitPriceForQuantity(item.product, item.quantity);
        const subtotal = unitPrice * item.quantity;
        const est = calculateShippingEstimate({
          unitWeightKg: item.product.weightKg,
          unitVolumeCbm: item.product.volumeCbm,
          quantity: item.quantity,
          productSubtotalUsd: subtotal,
          method: item.shippingMethod,
        });
        return acc + est.totalLogisticsUsd;
      }, 0)
      .toFixed(2)
  );

  const grandTotalEstimatedUsd = Number(
    (alibabaSubtotalUsd + estimatedLogisticsUsd).toFixed(2)
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addItem,
        updateQuantity,
        updateShippingMethod,
        removeItem,
        clearCart,
        totalUnits,
        alibabaSubtotalUsd,
        estimatedLogisticsUsd,
        grandTotalEstimatedUsd,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return ctx;
}
