import { API_URL } from "@/config/api";
import axios from "axios";

// إنشاء instance ثابت للاتصال بالسيرفر
const api = axios.create({
  baseURL: API_URL,
});

// =======================
// إشعارات المستخدم
// =======================

// جلب إشعارات المستخدم الحالي
export const getUserNotifications = async (token: string) => {
  const res = await api.get("/notifications/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { success: true, notifications: [...] }
};

// =======================
// إدارة الإشعارات (admin/owner)
// =======================

// إرسال إشعار لمستخدمين محددين
export const sendNotification = async (
  token: string,
  data: { title: string; message: string; recipientIds: string[]; relatedItemId?: string }
) => {
  const res = await api.post("/notifications/send", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { success: true, notification: {...} }
};

// حذف إشعار محدد
export const deleteNotification = async (token: string, notificationId: string) => {
  const res = await api.delete(`/notifications/${notificationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { success: true, message: "..." }
};

// تحديد إشعار كمقروء للمستخدم الحالي
export const markNotificationAsRead = async (token: string, notificationId: string) => {
  const res = await api.post(`/notifications/${notificationId}/read`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { success: true, notification: {...} }
};

// =======================
// جلب جميع الإشعارات (admin/owner)
// =======================
export const getAllNotifications = async (token: string) => {
  const res = await api.get("/notifications", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { success: true, notifications: [...] }
};
