import { API_URL } from "@/config/api";
import axios from "axios";

// ==========================
// إنشاء مستخدم (Admin only)
// ==========================
export const createUser = async (
  token: string,
  data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: "user" | "admin" | "owner";
    country: string;
    city: string;
  }
) => {
  const response = await axios.post(`${API_URL}/users`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// ==========================
// جلب كل المستخدمين
// ==========================
export const getAllUsers = async (
  token: string,
  params?: {
    keyword?: string;
    role?: string;
    country?: string;
    city?: string;
    page?: number;
    limit?: number;
    lat?: number;
    lng?: number;
    radiusKm?: number;
  }
) => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return response.data;
};

// ==========================
// جلب مستخدم بالـ ID
// ==========================
export const getUserById = async (
  token: string,
  id: string
) => {
  const response = await axios.get(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ==========================
// تحديث بيانات مستخدم
// ==========================
export const updateUser = async (
  token: string,
  id: string,
  data: {
    name?: string;
    phone?: string;
    role?: "user" | "admin" | "owner";
    country?: string;
    city?: string;
    location?: {
      type: "Point";
      coordinates: [number, number];
    };
  }
) => {
  const response = await axios.put(`${API_URL}/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// ==========================
// حذف مستخدم
// ==========================
export const deleteUser = async (
  token: string,
  id: string
) => {
  const response = await axios.delete(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
