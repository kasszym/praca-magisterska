import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../config/api';
import { useAuth } from './useAuth';

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
  addons?: any[];
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
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const createOrder = async (orderData: OrderData): Promise<Order | null> => {
    if (!isAuthenticated()) {
      toast.warning('Musisz być zalogowany, aby złożyć zamówienie', {
        autoClose: 3000,
      });
      return null;
    }

    setIsLoading(true);
    try {
      const response = await api.post<{ message: string; order: Order }>('/orders', orderData);

      toast.success(response.data.message || 'Zamówienie zostało utworzone pomyślnie', {
        autoClose: 3000,
      });

      return response.data.order;
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Sesja wygasła. Zaloguj się ponownie.', {
          autoClose: 3000,
        });
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrders = async (): Promise<Order[]> => {
    if (!isAuthenticated()) {
      return [];
    }

    setIsLoading(true);
    try {
      const response = await api.get<{ orders: Order[] }>('/orders');
      return response.data.orders;
    } catch (error) {
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getOrder = async (id: number): Promise<Order | null> => {
    if (!isAuthenticated()) {
      return null;
    }

    setIsLoading(true);
    try {
      const response = await api.get<{ order: Order }>(`/orders/${id}`);
      return response.data.order;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createOrder,
    getOrders,
    getOrder,
  };
};
