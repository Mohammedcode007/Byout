import { API_URL } from "@/config/api";
import axios from "axios";

type PropertyData = {
  title: string;
  description?: string;
  type: "apartment" | "villa" | "room" | "student_housing";
  transactionType: "للبيع" | "للايجار";
  price: number;
  advancePayment?: number;
  location: {
    country: string;
    city: string;
    street?: string;
    neighborhood?: string;
    postalCode?: string;
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  suitableFor?: "male" | "female" | "mixed";
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  contact?: { phone?: string; email?: string };
  deliveryDate?: string;
  featured?: boolean;
status?: "ready" | "under_construction" | "مكتمل" | "قيد الانشاء";
  ownership?: "owned" | "rented" | "student_housing";
  amenities?: Record<string, boolean>;
  images?: string[];
};

// 🔥 جلب كل العقارات مع فلترة
export const getProperties = async (params?: {
  type?: string;
  transactionType?: string;
  city?: string;
  featured?: boolean;
  status?: string;
   isStudentHousing?: boolean; // <-- جديد: فلتر العقارات الطلابية
  search?: string; // <-- جديد: البحث النصي في العنوان
}) => {
    
  const response = await axios.get(`${API_URL}/properties`, { params });
  return response.data;
};

// 🔥 جلب عقار واحد حسب ID
export const getPropertyById = async (id: string) => {
  const response = await axios.get(`${API_URL}/properties/${id}`);
  return response.data;
};

// 🔥 إضافة عقار جديد
export const addProperty = async (token: string, data: PropertyData) => {
  const response = await axios.post(`${API_URL}/properties`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 🔥 تعديل عقار
export const updateProperty = async (token: string, id: string, data: Partial<PropertyData>) => {
  const response = await axios.put(`${API_URL}/properties/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 🔥 حذف عقار
export const deleteProperty = async (token: string, id: string) => {
  const response = await axios.delete(`${API_URL}/properties/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
