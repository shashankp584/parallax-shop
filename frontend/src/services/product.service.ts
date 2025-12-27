import api from "./api";

export interface ProductImage {
  id: number;
  url: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  images: ProductImage[];
  createdAt: string;
}

export interface PaginatedProducts {
  items: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export const productService = {
  async getProducts(page = 1, limit = 12): Promise<PaginatedProducts> {
    const res = await api.get<PaginatedProducts>(
      `/products?page=${page}&limit=${limit}`
    );
    return res.data;
  },

  async getProductById(id: number): Promise<Product> {
    const res = await api.get<Product>(`/products/${id}`);
    return res.data;
  },

  async createProduct(data: FormData): Promise<Product> {
    const res = await api.post<Product>("/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async updateProduct(id: number, data: FormData): Promise<Product> {
    const res = await api.put<Product>(`/products/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};
