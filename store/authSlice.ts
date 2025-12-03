// import { loginUser, registerUser } from "@/services/authService";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // ====== Register Thunk ======
// export const register = createAsyncThunk(
//   "auth/register",
//   async (data: any, thunkAPI) => {
//     console.log("Register payload:", data); // طباعه البيانات اللي هتبعت للسيرفر
//     try {
//       const res = await registerUser(data);
//       console.log("Register response:", res); // طباعه الرد من السيرفر
//       return res;
//     } catch (e: any) {
//       console.log("Register error:", e.response?.data?.message || e.message); // طباعه الخطأ
//       return thunkAPI.rejectWithValue(e.response?.data?.message || "Error");
//     }
//   }
// );

// // ====== Login Thunk ======
// export const login = createAsyncThunk(
//   "auth/login",
//   async (data: any, thunkAPI) => {
//     console.log("Login payload:", data); // طباعه البيانات اللي هتبعت للسيرفر
//     try {
//       const res = await loginUser(data);
//       console.log("Login response:", res); // طباعه الرد من السيرفر
//       return res;
//     } catch (e: any) {
//       console.log("Login error:", e.response?.data?.message || e.message); // طباعه الخطأ
//       return thunkAPI.rejectWithValue(e.response?.data?.message || "Error");
//     }
//   }
// );

// // ====== Slice ======
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     token: null,
//     phone: null,
//     loading: false,
//     isLoggedIn: false,
//   },
//   reducers: {
//     logout(state) {
//       console.log("User logout"); // طباعه عند تسجيل الخروج
//       state.user = null;
//       state.token = null;
//       state.phone = null;
//       state.isLoggedIn = false;
//       AsyncStorage.removeItem("auth");
//     },
//     setAuth(state, action) {
//       console.log("Set auth:", action.payload); // طباعه البيانات عند تعيين الauth
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.phone = action.payload.phone;
//       state.isLoggedIn = true;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         console.log("Register pending");
//         state.loading = true;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         console.log("Register fulfilled:", action.payload);
//         state.loading = false;
//       })
//       .addCase(register.rejected, (state, action) => {
//         console.log("Register rejected:", action.payload);
//         state.loading = false;
//       })
//       .addCase(login.pending, (state) => {
//         console.log("Login pending");
//         state.loading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         console.log("Login fulfilled:", action.payload);
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.phone = action.payload.user?.phone;
//         state.isLoggedIn = true;
//         AsyncStorage.setItem(
//           "auth",
//           JSON.stringify({
//             user: state.user,
//             token: state.token,
//             phone: state.phone,
//           })
//         );
//       })
//       .addCase(login.rejected, (state, action) => {
//         console.log("Login rejected:", action.payload);
//         state.loading = false;
//       });
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
  [key: string]: any;
}

interface AuthState {
  user: UserType | null;
  token: string | null;
  phone: string | null;
  loading: boolean;
  isLoggedIn: boolean;
}

// ===== Initial State =====
const initialState: AuthState = {
  user: null,
  token: null,
  phone: null,
  loading: false,
  isLoggedIn: false,
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

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
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
  async ({ token, data }: { token: string; data: { name?: string; phone?: string; oldPassword?: string; newPassword?: string } }, thunkAPI) => {
    try {
      const res = await updateProfile(token, data);
      return res; // يجب أن يرجع بيانات المستخدم المحدثة
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
      state.isLoggedIn = false;
      AsyncStorage.removeItem("auth");
    },
    setAuth(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.phone = action.payload.user?.phone || null;
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

        AsyncStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.user,
            token: state.token,
            phone: state.phone,
          })
        );
      })
      .addCase(login.rejected, (state) => { state.loading = false; })

      // Update User
      .addCase(updateUser.pending, (state) => { state.loading = true; })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        // دمج البيانات الجديدة مع القديمة
        state.user = { ...(state.user || {}), ...payload };
        state.phone = payload.phone || state.phone;

        AsyncStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.user,
            token: state.token,
            phone: state.phone,
          })
        );
      })
      .addCase(updateUser.rejected, (state) => { state.loading = false; });
  },
});

export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
