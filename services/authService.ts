import { API_URL } from "@/config/api";
import axios from "axios";

export const registerUser = async (data: { name: string; email: string; phone: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};
