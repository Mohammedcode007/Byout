import { API_URL } from "@/config/api";
import axios from "axios";

// إنشاء instance ثابت للاتصال بالسيرفر
const api = axios.create({
  baseURL: API_URL,
});

// جلب قائمة المفضلة
export const getFavorites = async (token: string) => {
    console.log(token,'token');
    
  const res = await api.get("/favorites", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// إضافة عقار إلى المفضلة
export const addFavorite = async (token: string, propertyId: string) => {
  const res = await api.post(
    "/favorites/add",
    { propertyId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// إزالة عقار من المفضلة
export const removeFavorite = async (token: string, propertyId: string) => {
  const res = await api.post(
    "/favorites/remove",
    { propertyId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
