
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authSlice";
import favoriteReducer from "./favoritesSlice";
import propertyReducer from "./propertieSlice";

// إعدادات persist الخاصة بـ auth فقط
const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["user", "token", "phone"],   // القيم التي نريد حفظها فقط
  blacklist: ["loading", "isLoggedIn"],    // عدم حفظ الحالة المتغيرة
};

// دمج الـ reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  property: propertyReducer,
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
