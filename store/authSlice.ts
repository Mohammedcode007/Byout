
// import { loginUser, registerUser, updateProfile } from "@/services/authService";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // ===== Types =====
// interface UserType {
//   name?: string;
//   email?: string;
//   phone?: string;
//   [key: string]: any;
// }

// interface AuthState {
//   user: UserType | null;
//   token: string | null;
//   phone: string | null;
//   loading: boolean;
//   isLoggedIn: boolean;
//   role?: string | null;
// }

// // ===== Initial State =====
// const initialState: AuthState = {
//   user: null,
//   token: null,
//   phone: null,
//   loading: false,
//   isLoggedIn: false,
//   role: null,
// };

// // ===== Thunks =====

// // Register
// export const register = createAsyncThunk(
//   "auth/register",
//   async (data: { name: string; email: string; phone: string; password: string }, thunkAPI) => {
//     try {
//       const res = await registerUser(data);
//       return res;
//     } catch (e: any) {
//       return thunkAPI.rejectWithValue(e.response?.data?.message || "Register Error");
//     }
//   }
// );

// // Login
// export const login = createAsyncThunk(
//   "auth/login",
//   async (data: { email: string; password: string }, thunkAPI) => {
//     try {
//       const res = await loginUser(data);
//       return res;
//     } catch (e: any) {
//       return thunkAPI.rejectWithValue(e.response?.data?.message || "Login Error");
//     }
//   }
// );

// // Update Profile
// export const updateUser = createAsyncThunk(
//   "auth/updateUser",
//   async ({ token, data }: { token: string; data: { name?: string; phone?: string; oldPassword?: string; newPassword?: string } }, thunkAPI) => {
//     try {
//       const res = await updateProfile(token, data);
//       return res;
//     } catch (e: any) {
//       return thunkAPI.rejectWithValue(e.response?.data?.message || "Update Error");
//     }
//   }
// );

// // ===== Slice =====
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout(state) {
//       state.user = null;
//       state.token = null;
//       state.phone = null;
//       state.role = null;
//       state.isLoggedIn = false;
//       AsyncStorage.removeItem("auth");
//     },

//     // هنا يتم تحميل البيانات من AsyncStorage عند بدء التطبيق
//     setAuth(state, action) {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.phone = action.payload.phone || action.payload.user?.phone || null;
//       state.role = action.payload.role || action.payload.user?.role || null;
//       state.isLoggedIn = true;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(register.pending, (state) => { state.loading = true; })
//       .addCase(register.fulfilled, (state) => { state.loading = false; })
//       .addCase(register.rejected, (state) => { state.loading = false; })

//       // Login
//       .addCase(login.pending, (state) => { state.loading = true; })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.token = action.payload.token;
//         state.phone = action.payload.phone || action.payload.user?.phone || null;
//         state.isLoggedIn = true;

//         // استخراج role
//         const role = action.payload.role || action.payload.user?.role || "user";

//         // حفظ في AsyncStorage
//         AsyncStorage.setItem(
//           "auth",
//           JSON.stringify({
//             user: state.user,
//             token: state.token,
//             phone: state.phone,
//             role: role,
//           })
//         );

//         // تخزينه داخل state
//         state.role = role;
//       })
//       .addCase(login.rejected, (state) => { state.loading = false; })

//       // Update User
//       .addCase(updateUser.pending, (state) => { state.loading = true; })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.loading = false;
//         const payload = action.payload || {};

//         state.user = { ...(state.user || {}), ...payload };
//         state.phone = payload.phone || state.phone;

//         // الاحتفاظ بالروول كما هو دون تغيير
//         AsyncStorage.setItem(
//           "auth",
//           JSON.stringify({
//             user: state.user,
//             token: state.token,
//             phone: state.phone,
//             role: state.role, // لا نفقده بعد تحديث البيانات
//           })
//         );
//       })
//       .addCase(updateUser.rejected, (state) => { state.loading = false; });
//   },
// });

// export const { logout, setAuth } = authSlice.actions;
// export default authSlice.reducer;

import { loginUser, registerUser, updateProfile } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ===== Types =====
interface UserType {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  [key: string]: any;
}

interface AuthState {
  user: UserType | null;
  token: string | null;
  phone: string | null;
  loading: boolean;
  isLoggedIn: boolean;
  role?: string | null;
}

// ===== Initial State =====
const initialState: AuthState = {
  user: null,
  token: null,
  phone: null,
  loading: false,
  isLoggedIn: false,
  role: null,
};

// ===== Thunks =====

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (data: { name: string; email: string; phone: string; password: string }, thunkAPI) => {
    try {
      const res = await registerUser(data);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Register Error");
    }
  }
);

// Login مع دعم الموقع والدولة والمدينة
export const login = createAsyncThunk(
  "auth/login",
  async (
    data: {
      email: string;
      password: string;
      latitude?: number;
      longitude?: number;
      country?: string;
      city?: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await loginUser(data);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Login Error");
    }
  }
);

// Update Profile
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (
    { token, data }: { token: string; data: { name?: string; phone?: string; oldPassword?: string; newPassword?: string; country?: string; city?: string } },
    thunkAPI
  ) => {
    try {
      const res = await updateProfile(token, data);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Update Error");
    }
  }
);

// ===== Slice =====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.phone = null;
      state.role = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem("auth");
    },

    // تحميل البيانات من AsyncStorage عند بدء التطبيق
    setAuth(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.phone = action.payload.phone || action.payload.user?.phone || null;
      state.role = action.payload.role || action.payload.user?.role || null;
      state.isLoggedIn = true;
    },
  },

  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => { state.loading = true; })
      .addCase(register.fulfilled, (state) => { state.loading = false; })
      .addCase(register.rejected, (state) => { state.loading = false; })

      // Login
      .addCase(login.pending, (state) => { state.loading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.phone = action.payload.phone || action.payload.user?.phone || null;
        state.isLoggedIn = true;

        // استخراج role
        const role = action.payload.role || action.payload.user?.role || "user";
        state.role = role;

        // استخراج الدولة والمدينة
        const country = action.payload.country || action.payload.user?.country || null;
        const city = action.payload.city || action.payload.user?.city || null;
        state.user = { ...state.user, country, city };

        // حفظ كل البيانات في AsyncStorage
        AsyncStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.user,
            token: state.token,
            phone: state.phone,
            role: state.role,
            country,
            city,
          })
        );
      })
      .addCase(login.rejected, (state) => { state.loading = false; })

      // Update User
      .addCase(updateUser.pending, (state) => { state.loading = true; })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};

        // تحديث بيانات المستخدم بما في ذلك الدولة والمدينة
        state.user = { ...(state.user || {}), ...payload };
        state.phone = payload.phone || state.phone;

        // الاحتفاظ بالروول كما هو دون تغيير
        AsyncStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.user,
            token: state.token,
            phone: state.phone,
            role: state.role,
          })
        );
      })
      .addCase(updateUser.rejected, (state) => { state.loading = false; });
  },
});

export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
