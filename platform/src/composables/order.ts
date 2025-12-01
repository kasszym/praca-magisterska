import { ref } from "vue";
import { ElMessage } from "element-plus";
import API from "../config/api";
import { useAuth } from "./auth";
import type { Addon } from "../types";

export interface OrderData {
  car_id: number;
  car_name: string;
  car_version: string;
  color_id?: number;
  color_name?: string;
  car_price: number;
  addons?: Array<{ title: string; price: number; id?: number }>;
  addons_total?: number;
  delivery_method: string;
  delivery_method_label?: string;
  delivery_eta?: string;
  delivery_price: number;
  verification_method: string;
  verification_price: number;
  first_name: string;
  last_name: string;
  pesel: string;
  street: string;
  house_number: string;
  apartment_number?: string;
  post_code: string;
  city: string;
  email: string;
  phone: string;
  invoice_email?: string;
  correspondence_street?: string;
  correspondence_house_number?: string;
  correspondence_apartment_number?: string;
  correspondence_post_code?: string;
  correspondence_city?: string;
  total_price: number;
}

export interface Order {
  id: number;
  user_id: number;
  car_id: number;
  car_name: string;
  car_version: string;
  color_id?: number;
  color_name?: string;
  car_price: number;
  addons?: Addon[];
  addons_total: number;
  delivery_method: string;
  delivery_method_label?: string;
  delivery_eta?: string;
  delivery_price: number;
  verification_method: string;
  verification_price: number;
  first_name: string;
  last_name: string;
  pesel: string;
  street: string;
  house_number: string;
  apartment_number?: string;
  post_code: string;
  city: string;
  email: string;
  phone: string;
  invoice_email?: string;
  correspondence_street?: string;
  correspondence_house_number?: string;
  correspondence_apartment_number?: string;
  correspondence_post_code?: string;
  correspondence_city?: string;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useOrder = () => {
  const isLoading = ref(false);
  const { isAuthenticated } = useAuth();

  /**
   * Create a new order
   */
  const createOrder = async (orderData: OrderData): Promise<Order | null> => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      ElMessage({
        message: "Musisz być zalogowany, aby złożyć zamówienie",
        type: "warning",
        duration: 3000,
      });
      return null;
    }

    isLoading.value = true;
    try {
      const response = await API.post<{ message: string; order: Order }>("/orders", orderData);

      ElMessage({
        message: response.data.message || "Zamówienie zostało utworzone pomyślnie",
        type: "success",
        duration: 3000,
      });

      return response.data.order;
    } catch (error: any) {
      // Error message will be shown by interceptor
      if (error.response?.status === 401) {
        ElMessage({
          message: "Sesja wygasła. Zaloguj się ponownie.",
          type: "error",
          duration: 3000,
        });
      }
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Get all orders for current user
   */
  const getOrders = async (): Promise<Order[]> => {
    if (!isAuthenticated()) {
      return [];
    }

    isLoading.value = true;
    try {
      const response = await API.get<{ orders: Order[] }>("/orders");
      return response.data.orders;
    } catch (error) {
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Get a specific order by ID
   */
  const getOrder = async (id: number): Promise<Order | null> => {
    if (!isAuthenticated()) {
      return null;
    }

    isLoading.value = true;
    try {
      const response = await API.get<{ order: Order }>(`/orders/${id}`);
      return response.data.order;
    } catch (error) {
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    createOrder,
    getOrders,
    getOrder,
  };
};
