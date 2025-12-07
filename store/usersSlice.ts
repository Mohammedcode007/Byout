import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser as updateUserService
} from "@/services/userService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ===== Types =====
interface UserType {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  country?: string;
  city?: string;
  [key: string]: any;
}

interface UsersState {
  users: UserType[];
  selectedUser: UserType | null;
  loading: boolean;
  error: string | null;
  total: number;
  pages: number;
  page: number;
}

// ===== Initial State =====
const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  total: 0,
  pages: 0,
  page: 1,
};

// ===============================
// Thunks
// ===============================

// Create User
export const addUser = createAsyncThunk(
  "users/create",
  async (
    { token, data }: { token: string; data: any },
    thunkAPI
  ) => {
    try {
      const res = await createUser(token, data);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Create User Error");
    }
  }
);

// Get All Users
export const fetchUsers = createAsyncThunk(
  "users/getAll",
  async (
    { token, params }: { token: string; params?: any },
    thunkAPI
  ) => {
    try {
      const res = await getAllUsers(token, params);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Fetch Users Error");
    }
  }
);

// Get User by ID
export const fetchUserById = createAsyncThunk(
  "users/getById",
  async (
    { token, id }: { token: string; id: string },
    thunkAPI
  ) => {
    try {
      const res = await getUserById(token, id);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Fetch User Error");
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "users/update",
  async (
    { token, id, data }: { token: string; id: string; data: any },
    thunkAPI
  ) => {
    try {
      const res = await updateUserService(token, id, data);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Update User Error");
    }
  }
);

// Delete User
export const removeUser = createAsyncThunk(
  "users/delete",
  async (
    { token, id }: { token: string; id: string },
    thunkAPI
  ) => {
    try {
      await deleteUser(token, id);
      return id;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Delete User Error");
    }
  }
);

// ===============================
// Slice
// ===============================
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(addUser.pending, (state) => { state.loading = true; })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get All
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.results || action.payload.users || [];
        state.total = action.payload.total || 0;
        state.pages = action.payload.pages || 0;
        state.page = action.payload.page || 1;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get By ID
      .addCase(fetchUserById.pending, (state) => { state.loading = true; })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateUser.pending, (state) => { state.loading = true; })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.user || action.payload;

        state.users = state.users.map((u) =>
          u._id === updated._id ? updated : u
        );

        if (state.selectedUser?._id === updated._id) {
          state.selectedUser = updated;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(removeUser.pending, (state) => { state.loading = true; })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
