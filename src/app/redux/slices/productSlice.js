import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
const token = parseCookies()['token'];
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const fetchProduct = createAsyncThunk(
    'product/fetchbyid',
    async () => {
        try {
            const response = await axios.get(API_BASE_URL + 'products?page=1&limit=2');
            const data = response.data.items;
            return data
        } catch (err) {
            console.log(err)
        }
    },
)


const initialState = {
    data: [],
    isLoading: false,
    productDetail: {},
    listProduct: [],
    total: 0,
}

// Then, handle actions in your reducers:
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setListProduct: (state, action) => {
            state.listProduct = [...state.listProduct, action.payload];
            state.total = state.total + action.payload.price;
        },
        setTotal: (state, action) => {
            state.total = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.isLoading = true
                state.data = action.payload
            })
            .addCase(fetchProduct.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { setListProduct, setTotal } = productSlice.actions;

export default productSlice.reducer;