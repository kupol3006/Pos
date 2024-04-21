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
    items: [],
    topping: [],
    toppingDetail: [],
    toppingSelected: [],
    storeToppingSelected: [],
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
        setToping: (state, action) => {
            state.topping = action.payload;
        },
        addItems: (state, action) => {
            const item = action.payload;
            const existItem = state.items.find((i) => i.id === item.id);
            if (existItem) {
                // Nếu món hàng đã tồn tại, tăng số lượng lên 1
                existItem.quantity++;
            } else {
                // Nếu món hàng chưa tồn tại, thêm vào giỏ hàng với số lượng là 1
                state.items.push({ ...item, quantity: 1 });
            }
        },
        setToppingDetail: (state, action) => {
            state.toppingDetail = action.payload;
        },
        setToppingSelected: (state, action) => {
            state.toppingSelected = [...state.toppingSelected, action.payload];
        },
        setStoreToppingSelected: (state, action) => {
            state.storeToppingSelected = [...state.storeToppingSelected, state.toppingSelected];
        },
        resetStateToppingSelected: (state) => {
            state.toppingSelected = initialState.toppingSelected;
        },
        resetState: (state) => {
            // Đặt lại state về giá trị ban đầu
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchProduct.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { setListProduct, setTotal, setProductDetail, addItems, setToping, setToppingDetail, setToppingSelected, setStoreToppingSelected, resetStateToppingSelected, resetState } = productSlice.actions;

export default productSlice.reducer;