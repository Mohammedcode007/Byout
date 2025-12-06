import { API_URL } from "@/config/api";
import axios from "axios";

export const registerUser = async (data: { name: string; email: string; phone: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};

// export const loginUser = async (data: { email: string; password: string }) => {
//   const response = await axios.post(`${API_URL}/auth/login`, data);
//   return response.data;
// };
export const loginUser = async (data: {
  email: string;
  password: string;
  latitude?: number;
  longitude?: number;
  country?: string;
  city?: string;
}) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};


// 🔥 دالة تحديث بيانات المستخدم
// تحديث بيانات المستخدم
export const updateProfile = async (
  token: string,
  data: {
    name?: string;
    phone?: string;
    oldPassword?: string;
    newPassword?: string;
  }
) => {
  const response = await axios.put(`${API_URL}/auth/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};