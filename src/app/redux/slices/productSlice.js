import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { selectPosId } from './orderTypeSlice';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
const token = parseCookies()['token'];
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const fetchProduct = createAsyncThunk(
    'product/fetchbyid',
    async (_, { getState }) => {
        const pos_id = selectPosId(getState());
        try {
            const response = await axios.get(API_BASE_URL + 'menu/' + pos_id);
            const data = response.data.data;
            return data
        } catch (err) {
            console.log(err)
        }
    },
)


const initialState = {
    data: [],
    isLoading: false,
    productDetail: [],
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
        setProductDetail: (state, action) => {
            state.productDetail = action.payload;
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

export const { setListProduct, setTotal, setProductDetail } = productSlice.actions;

export default productSlice.reducer;