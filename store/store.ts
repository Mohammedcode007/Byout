// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { persistReducer, persistStore } from "redux-persist";
// import authReducer from "./authSlice";
// import propertyReducer from "./propertieSlice"; // مسار الملف عندك


// const persistConfig = { key: "root", storage: AsyncStorage, whitelist: ["auth"] };
// const rootReducer = combineReducers({
//   auth: authReducer,       // مخزن auth مع persist
//   property: propertyReducer, // مخزن property بدون persist
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authSlice";
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
