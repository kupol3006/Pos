import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
const token = parseCookies()['token'];
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const fetchOrderType = createAsyncThunk(
    'orderType/fetchOrderType',
    async () => {
        try {
            const response = await axios.get(API_BASE_URL + 'order/types');
            const data = response.data.data;
            return data
        } catch (err) {
            console.log(err)
        }
    },
)


const initialState = {
    data: [],
    orderTypeDetail: [],
    pos_id: '',
    isLoading: false,
}

// Then, handle actions in your reducers:
export const orderTypetSlice = createSlice({
    name: 'orderType',
    initialState,
    reducers: {
        setOrderTypeDetail: (state, action) => {
            state.orderTypeDetail = action.payload;
        },
        setPosId: (state, action) => {
            state.pos_id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderType.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchOrderType.fulfilled, (state, action) => {
                state.isLoading = true
                state.data = action.payload
            })
            .addCase(fetchOrderType.rejected, (state) => {
                state.isLoading = false
            })
    },
})
export const selectPosId = (state) => state.orderType.pos_id;

export const { setOrderTypeDetail, setPosId } = orderTypetSlice.actions;

export default orderTypetSlice.reducer;