import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  image?: string;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    minRating: number | null;
    searchQuery: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    minRating: null,
    searchQuery: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { products } = getState() as { products: ProductsState };
      const { page, limit } = products.pagination;
      const response = await api.get(`/products?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/products', productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/products/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = state.items.filter((product) => {
        const matchesCategory = !state.filters.category || product.category === state.filters.category;
        const matchesPrice =
          (!state.filters.minPrice || product.price >= state.filters.minPrice) &&
          (!state.filters.maxPrice || product.price <= state.filters.maxPrice);
        const matchesRating = !state.filters.minRating || product.rating >= state.filters.minRating;
        const matchesSearch =
          !state.filters.searchQuery ||
          product.name.toLowerCase().includes(state.filters.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.filters.searchQuery.toLowerCase());

        return matchesCategory && matchesPrice && matchesRating && matchesSearch;
      });
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredItems = state.items;
    },
    sortProducts: (state, action) => {
      const { field, direction } = action.payload;
      state.filteredItems = [...state.filteredItems].sort((a, b) => {
        if (direction === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        }
        return a[field] < b[field] ? 1 : -1;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.filteredItems = action.payload.products;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.filteredItems = state.items;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.filteredItems = state.items;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.filteredItems = state.items;
      });
  },
});

export const { setFilters, setPage, clearFilters, sortProducts } = productSlice.actions;
export default productSlice.reducer;