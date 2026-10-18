import productsData from "@/data/products.json";

export interface PriceTier {
  minQty: number;
  maxQty: number | null;
  price: number;
}

export interface SupplierInfo {
  name: string;
  years: number;
  verified: boolean;
  rating: number;
  city: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  images: string[];
  supplier: SupplierInfo;
  moq: number;
  unit: string;
  priceTiers: PriceTier[];
  weightKg: number;
  volumeCbm: number;
  leadTimeDays: string;
  featured: boolean;
  description: string;
}

export interface ProductFilterOptions {
  query?: string;
  category?: string;
  maxMoq?: number;
  maxPrice?: number;
  sortBy?: "featured" | "price-asc" | "price-desc" | "moq-asc";
}

export interface ProductProvider {
  getAll(): Product[];
  getById(id: string): Product | undefined;
  getFeatured(): Product[];
  getCategories(): string[];
  search(options: ProductFilterOptions): Product[];
}

export function getUnitPriceForQuantity(product: Product, quantity: number): number {
  const sorted = [...product.priceTiers].sort((a, b) => b.minQty - a.minQty);
  for (const tier of sorted) {
    if (quantity >= tier.minQty) {
      return tier.price;
    }
  }
  return product.priceTiers[0].price;
}

export function getLowestPrice(product: Product): number {
  return Math.min(...product.priceTiers.map((t) => t.price));
}

export function getHighestPrice(product: Product): number {
  return Math.max(...product.priceTiers.map((t) => t.price));
}

class MockAlibabaProductProvider implements ProductProvider {
  private products: Product[] = productsData as Product[];

  getAll(): Product[] {
    return this.products;
  }

  getById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getFeatured(): Product[] {
    return this.products.filter((p) => p.featured);
  }

  getCategories(): string[] {
    return Array.from(new Set(this.products.map((p) => p.category)));
  }

  search(options: ProductFilterOptions): Product[] {
    let list = [...this.products];

    if (options.query && options.query.trim() !== "") {
      const q = options.query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.supplier.name.toLowerCase().includes(q)
      );
    }

    if (options.category && options.category !== "Todas") {
      list = list.filter((p) => p.category === options.category);
    }

    if (typeof options.maxMoq === "number" && options.maxMoq > 0) {
      list = list.filter((p) => p.moq <= options.maxMoq!);
    }

    if (typeof options.maxPrice === "number" && options.maxPrice > 0) {
      list = list.filter((p) => getLowestPrice(p) <= options.maxPrice!);
    }

    switch (options.sortBy) {
      case "price-asc":
        list.sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
        break;
      case "price-desc":
        list.sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
        break;
      case "moq-asc":
        list.sort((a, b) => a.moq - b.moq);
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return list;
  }
}

export const productProvider: ProductProvider = new MockAlibabaProductProvider();
