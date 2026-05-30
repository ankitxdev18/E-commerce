import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/config";

const PAGE_SIZE = 6;

export const loadProducts = createAsyncThunk(
    "products/loadProducts",
    async (page = 0, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/products?_limit=${PAGE_SIZE}&_start=${page * PAGE_SIZE}`);
            return { data: response.data, page };
        } catch (error) {
            return rejectWithValue(error?.message || "Unable to load products.");
        }
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.message || "Unable to load product details.");
        }
    }
);

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (product, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post("/products", product);
            await dispatch(loadProducts(0));
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.message || "Unable to create product.");
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, product }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.patch(`/products/${id}`, product);
            await dispatch(loadProducts(0));
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.message || "Unable to update product.");
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            await axios.delete(`/products/${id}`);
            await dispatch(loadProducts(0));
            return id;
        } catch (error) {
            return rejectWithValue(error?.message || "Unable to delete product.");
        }
    }
);

const initialState = {
    items: [],
    status: "idle",
    error: null,
    selectedProduct: null,
    selectedStatus: "idle",
    selectedError: null,
    page: 0,
    hasMore: true,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearSelectedProduct(state) {
            state.selectedProduct = null;
            state.selectedStatus = "idle";
            state.selectedError = null;
        },
        resetProducts(state) {
            state.items = [];
            state.page = 0;
            state.hasMore = true;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProducts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                const { data, page } = action.payload;
                state.status = "succeeded";
                state.error = null;
                if (page === 0) {
                    state.items = data;
                } else {
                    state.items = [...state.items, ...data];
                }
                state.page = page;
                state.hasMore = data.length === PAGE_SIZE;
            })
            .addCase(loadProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.selectedStatus = "loading";
                state.selectedError = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.selectedStatus = "succeeded";
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.selectedStatus = "failed";
                state.selectedError = action.payload || action.error.message;
            })
            .addCase(createProduct.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            .addCase(updateProduct.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            });
    },
});

export const { clearSelectedProduct, resetProducts } = productSlice.actions;
export default productSlice.reducer;
