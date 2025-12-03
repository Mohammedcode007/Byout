import {
    addProperty,
    deleteProperty,
    getProperties,
    getPropertyById,
    updateProperty,
} from "@/services/propertieService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ===== Types =====
export type PropertyData = {
  _id?: string;
  title: string;
  description?: string;
  type: "apartment" | "villa" | "room" | "student_housing";
  transactionType: "sale" | "rent";
  price: number;
  advancePayment?: number;
  location: {
    country: string;
    city: string;
    street?: string;
    neighborhood?: string;
    postalCode?: string;
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  suitableFor?: "male" | "female" | "mixed";
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  contact?: { phone?: string; email?: string };
  deliveryDate?: string;
  featured?: boolean;
  status?: "ready" | "under_construction";
  ownership?: "owned" | "rented" | "student_housing";
  amenities?: Record<string, boolean>;
  images?: string[];
};

interface PropertyState {
  properties: PropertyData[];
  property: PropertyData | null;
  loading: boolean;
  error: string | null;
}

// ===== Initial State =====
const initialState: PropertyState = {
  properties: [],
  property: null,
  loading: false,
  error: null,
};

// ===== Thunks =====

// جلب كل العقارات مع فلترة
export const fetchProperties = createAsyncThunk(
  "property/fetchProperties",
  async (params: Record<string, any> | undefined, thunkAPI) => {
    try {
      const res = await getProperties(params);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Fetch Properties Error");
    }
  }
);


// جلب عقار واحد
export const fetchProperty = createAsyncThunk(
  "property/fetchProperty",
  async (id: string, thunkAPI) => {
    try {
      const res = await getPropertyById(id);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Fetch Property Error");
    }
  }
);

// إضافة عقار
export const createProperty = createAsyncThunk(
  "property/createProperty",
  async ({ token, data }: { token: string; data: PropertyData }, thunkAPI) => {
    try {
      const res = await addProperty(token, data);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Create Property Error");
    }
  }
);

// تعديل عقار
export const editProperty = createAsyncThunk(
  "property/editProperty",
  async ({ token, id, data }: { token: string; id: string; data: Partial<PropertyData> }, thunkAPI) => {
    try {
      const res = await updateProperty(token, id, data);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Update Property Error");
    }
  }
);

// حذف عقار
export const removeProperty = createAsyncThunk(
  "property/removeProperty",
  async ({ token, id }: { token: string; id: string }, thunkAPI) => {
    try {
      const res = await deleteProperty(token, id);
      return { id, message: res.message };
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Delete Property Error");
    }
  }
);

// ===== Slice =====
const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    clearProperty(state) {
      state.property = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProperties
      .addCase(fetchProperties.pending, (state) => { state.loading = true; })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchProperty
      .addCase(fetchProperty.pending, (state) => { state.loading = true; })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload;
      })
      .addCase(fetchProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // createProperty
      .addCase(createProperty.pending, (state) => { state.loading = true; })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // editProperty
      .addCase(editProperty.pending, (state) => { state.loading = true; })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.properties.findIndex(p => p._id === action.payload._id);
        if (index >= 0) state.properties[index] = action.payload;
        if (state.property?._id === action.payload._id) state.property = action.payload;
      })
      .addCase(editProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // removeProperty
      .addCase(removeProperty.pending, (state) => { state.loading = true; })
      .addCase(removeProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter(p => p._id !== action.payload.id);
        if (state.property?._id === action.payload.id) state.property = null;
      })
      .addCase(removeProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProperty } = propertySlice.actions;
export default propertySlice.reducer;
