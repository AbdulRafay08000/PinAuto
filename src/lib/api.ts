import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface Product {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  productUrl?: string;
  etsyListingId?: string;
  source: 'manual' | 'etsy';
  category?: string;
  variants: Array<{
    size?: string;
    color?: string;
    price?: number;
    stock?: number;
  }>;
  targetBuyers?: string;
  painPoints?: string;
  images: string[];
  defaultImage?: string;
  videoUrl?: string;
  pinsPerDay: number;
  imagesPerDay: number;
  videosPerDay: number;
  automationMode: 'automatic' | 'manual';
  status: 'active' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    },
    getById: async (id: string): Promise<Product> => {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    },
    create: async (data: FormData): Promise<Product> => {
      try {
        console.log("API: Sending create request");
        console.log("FormData contents:");
        for (const [key, value] of data.entries()) {
          console.log(`${key}:`, value);
        }
        const response = await axios.post(`${API_BASE_URL}/products`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("API: Request successful");
        return response.data;
      } catch (error) {
        console.error("API: Request failed", error);
        throw error;
      }
    },
    update: async (id: string, data: FormData): Promise<Product> => {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    delete: async (id: string): Promise<void> => {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
    },
    duplicate: async (id: string): Promise<Product> => {
      try {
        console.log("API: Duplicating product", id);
        const response = await axios.post(`${API_BASE_URL}/products/${id}/duplicate`);
        console.log("API: Duplicate successful");
        return response.data;
      } catch (error) {
        console.error("API: Duplicate failed", error);
        throw error;
      }
    },
    
  },
  auth: {
  login: async (data: { email: string; password: string }) => {
    try {
      if (!data.email || !data.password) {
        throw new Error("Email and password are required");
      }

      const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
      console.log("API: Login successful");
      return response.data;
    } catch (error: any) {
      console.error("API: Login failed", error.response?.data || error.message);
      throw error;
    }
  },
  register: async (data: { name: string; email: string; password: string; business_name: string; timezone: string }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
      return response.data;
    } catch (error: any) {
      console.error("API: Registration failed", error.response?.data || error.message);
      throw error;
    }
  },
}
};