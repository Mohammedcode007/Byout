import * as notificationAPI from "@/services/NotificationService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Notification = {
  _id: string;
  title: string;
  message: string;
  recipients: string[];
  relatedItem?: { _id: string; title: string; price: number };
  readBy: string[];
  createdAt: string;
};

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
};

// ===== Thunks =====

// جلب إشعارات المستخدم الحالي
export const fetchUserNotifications = createAsyncThunk(
  "notifications/fetchUserNotifications",
  async (token: string, thunkAPI) => {
    try {
      const data = await notificationAPI.getUserNotifications(token);
      return data.notifications;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch Notifications Error");
    }
  }
);

// إرسال إشعار (admin/owner)
export const sendNotification = createAsyncThunk(
  "notifications/sendNotification",
  async (
    { token, data }: { token: string; data: { title: string; message: string; recipientIds: string[]; relatedItemId?: string } },
    thunkAPI
  ) => {
    try {
      const res = await notificationAPI.sendNotification(token, data);
      return res.notification;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Send Notification Error");
    }
  }
);

// تعليم إشعار كمقروء
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async ({ token, id }: { token: string; id: string }, thunkAPI) => {
    try {
      const res = await notificationAPI.markNotificationAsRead(token, id);
      return res.notification;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Mark As Read Error");
    }
  }
);

// حذف إشعار
export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async ({ token, id }: { token: string; id: string }, thunkAPI) => {
    try {
      await notificationAPI.deleteNotification(token, id);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete Notification Error");
    }
  }
);

// ===== Slice =====
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications(state) {
      state.notifications = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserNotifications
      .addCase(fetchUserNotifications.pending, (state) => { state.loading = true; })
      .addCase(fetchUserNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchUserNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // sendNotification
      .addCase(sendNotification.pending, (state) => { state.loading = true; })
      .addCase(sendNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications.unshift(action.payload);
      })
      .addCase(sendNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // markNotificationAsRead
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n._id === action.payload._id);
        if (index >= 0) state.notifications[index] = action.payload;
      })

      // deleteNotification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(n => n._id !== action.payload);
      });
  },
});

export const { clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
