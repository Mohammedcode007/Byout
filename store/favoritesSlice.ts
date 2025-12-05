// import { addFavorite as apiAddFavorite, getFavorites as apiGetFavorites, removeFavorite as apiRemoveFavorite } from "@/services/favoriteService";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "./store";

// // ===== Types =====
// interface PropertyType {
//   _id: string;
//   title?: string;
//   price?: number;
//   [key: string]: any;
// }

// interface FavoritesState {
//   favorites: PropertyType[];
//   loading: boolean;
//   error: string | null;
// }

// // ===== Initial State =====
// const initialState: FavoritesState = {
//   favorites: [],
//   loading: false,
//   error: null,
// };

// // ===== Thunks =====

// // جلب المفضلة
// export const fetchFavorites = createAsyncThunk(
//   "favorites/fetch",
//   async (token: string, thunkAPI) => {
//     try {
//       const res = await apiGetFavorites(token);
//       console.log("[Favorites] Fetched favorites:", res.favorites);
//       return res.favorites || [];
//     } catch (e: any) {
//       console.error("[Favorites] Fetch error:", e.response?.data || e.message);
//       return thunkAPI.rejectWithValue(e.response?.data?.message || "Fetch Favorites Error");
//     }
//   }
// );

// // إضافة عقار للمفضلة
// export const addToFavorites = createAsyncThunk(
//   "favorites/add",
//   async ({ token, property }: { token: string; property: PropertyType }, thunkAPI) => {
//     try {
//       const state: any = thunkAPI.getState();
//       const exists = state.favorites?.favorites?.find((fav: PropertyType) => fav._id === property._id);
//       if (exists) {
//         console.log("[Favorites] Property already in favorites:", property._id);
//         return thunkAPI.rejectWithValue("العقار موجود بالفعل في المفضلة");
//       }

//       const res = await apiAddFavorite(token, property._id);
//       console.log("[Favorites] Added to favorites:", property._id, res.message);
//       return property;
//     } catch (e: any) {
//       console.error("[Favorites] Add error:", e.response?.data || e.message);
//       return thunkAPI.rejectWithValue(e.response?.data?.message || "Add Favorite Error");
//     }
//   }
// );

// // حذف عقار من المفضلة
// export const removeFromFavorites = createAsyncThunk(
//   "favorites/remove",
//   async ({ token, propertyId }: { token: string; propertyId: string }, thunkAPI) => {
//     try {
//       const res = await apiRemoveFavorite(token, propertyId);
//       console.log("[Favorites] Removed from favorites:", propertyId, res.message);
//       return propertyId;
//     } catch (e: any) {
//       console.error("[Favorites] Remove error:", e.response?.data || e.message);
//       return thunkAPI.rejectWithValue(e.response?.data?.message || "Remove Favorite Error");
//     }
//   }
// );

// // ===== Slice =====
// const favoritesSlice = createSlice({
//   name: "favorites",
//   initialState,
//   reducers: {
//     clearFavorites(state) {
//       state.favorites = [];
//       AsyncStorage.removeItem("favorites");
//       console.log("[Favorites] Cleared all favorites");
//     },
//   },
//   extraReducers: (builder) => {
//     // Fetch
//     builder.addCase(fetchFavorites.pending, (state) => { state.loading = true; state.error = null; });
//     builder.addCase(fetchFavorites.fulfilled, (state, action) => {
//       state.loading = false;
//       state.favorites = action.payload;
//     });
//     builder.addCase(fetchFavorites.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });

//     // Add
//     builder.addCase(addToFavorites.pending, (state) => { state.loading = true; state.error = null; });
//     builder.addCase(addToFavorites.fulfilled, (state, action) => {
//       state.loading = false;
//       // تحقق مرة أخرى قبل الإضافة لتجنب duplicates
//       if (!state.favorites.find(fav => fav._id === action.payload._id)) {
//         state.favorites.push(action.payload);
//       }
//     });
//     builder.addCase(addToFavorites.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });

//     // Remove
//     builder.addCase(removeFromFavorites.pending, (state) => { state.loading = true; state.error = null; });
//     builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
//       state.loading = false;
//       state.favorites = state.favorites.filter(fav => fav._id !== action.payload);
//     });
//     builder.addCase(removeFromFavorites.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });
//   },
// });

// // ===== Memoized Selector =====
// export const selectFavorites = createSelector(
//   (state: RootState) => state.favorites,
//   (favoritesState) => favoritesState?.favorites || []
// );

// export const { clearFavorites } = favoritesSlice.actions;
// export default favoritesSlice.reducer;


// store/favoritesSlice.ts
import { addFavorite as apiAddFavorite, getFavorites as apiGetFavorites, removeFavorite as apiRemoveFavorite } from "@/services/favoriteService";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

// ===== Types =====
interface PropertyType {
  _id: string;
  title?: string;
  price?: number;
  [key: string]: any;
}

interface FavoritesState {
  favorites: PropertyType[];
  loading: boolean;
  error: string | null;
}

// ===== Initial State =====
const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

// ===== Thunks =====

// جلب المفضلة
export const fetchFavorites = createAsyncThunk(
  "favorites/fetch",
  async (token: string, thunkAPI) => {
    try {
      const res = await apiGetFavorites(token);
      console.log("[Favorites] Fetched favorites:", res.favorites);
      return res.favorites || [];
    } catch (e: any) {
      console.error("[Favorites] Fetch error:", e.response?.data || e.message);
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Fetch Favorites Error");
    }
  }
);

// إضافة عقار للمفضلة
export const addToFavorites = createAsyncThunk(
  "favorites/add",
  async ({ token, property }: { token: string; property: PropertyType }, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const exists = state.favorites?.favorites?.find((fav: PropertyType) => fav._id === property._id);
      if (exists) {
        console.log("[Favorites] Property already in favorites:", property._id);
        return thunkAPI.rejectWithValue("العقار موجود بالفعل في المفضلة");
      }

      const res = await apiAddFavorite(token, property._id);
      console.log("[Favorites] Added to favorites:", property._id, res.message);
      return property;
    } catch (e: any) {
      console.error("[Favorites] Add error:", e.response?.data || e.message);
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Add Favorite Error");
    }
  }
);

// حذف عقار من المفضلة
export const removeFromFavorites = createAsyncThunk(
  "favorites/remove",
  async ({ token, propertyId }: { token: string; propertyId: string }, thunkAPI) => {
    try {
      const res = await apiRemoveFavorite(token, propertyId);
      console.log("[Favorites] Removed from favorites:", propertyId, res.message);
      return propertyId;
    } catch (e: any) {
      console.error("[Favorites] Remove error:", e.response?.data || e.message);
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Remove Favorite Error");
    }
  }
);

// ===== Slice =====
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // تفريغ قائمة المفضلة عند تسجيل الخروج (بدون حذف أي بيانات من الـ backend)
    clearFavoritesState(state) {
      state.favorites = [];
      state.loading = false;
      state.error = null;
      console.log("[Favorites] Cleared favorites state only");
    },
  },
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchFavorites.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites = action.payload;
    });
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add
    builder.addCase(addToFavorites.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.favorites.find(fav => fav._id === action.payload._id)) {
        state.favorites.push(action.payload);
      }
    });
    builder.addCase(addToFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Remove
    builder.addCase(removeFromFavorites.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites = state.favorites.filter(fav => fav._id !== action.payload);
    });
    builder.addCase(removeFromFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// ===== Selector =====
export const selectFavorites = createSelector(
  (state: RootState) => state.favorites,
  (favoritesState) => favoritesState?.favorites || []
);

export const { clearFavoritesState } = favoritesSlice.actions;
export default favoritesSlice.reducer;
