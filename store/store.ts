
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authSlice";
import favoriteReducer from "./favoritesSlice";
import notificationsReducer from "./notificationsSlice"; // ← إضافة slice الإشعارات
import propertyReducer from "./propertieSlice";
import usersReducer from "./usersSlice"; // ✅ إضافة users slice

const notificationsPersistConfig = {
  key: "notifications",
  storage: AsyncStorage,
  whitelist: ["notifications"], // حفظ الإشعارات فقط
};
// إعدادات persist الخاصة بـ auth فقط
const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["user", "token", "phone", "role"],
  blacklist: ["loading", "isLoggedIn"],    // عدم حفظ الحالة المتغيرة
};

// دمج الـ reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  property: propertyReducer,
  notifications: persistReducer(notificationsPersistConfig, notificationsReducer), // ← إضافة persist للإشعارات
  users: usersReducer, // ✅ إضافة users reducer

  favorites: favoriteReducer,     // ← إضافة المفضلة

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
