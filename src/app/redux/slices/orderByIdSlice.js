import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchOrderById = createAsyncThunk(
    'OrderById/fetchOrderById',
    async (room, { getState, rejectWithValue }) => {
        const token = parseCookies()['token'];
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const bill_id = room.activeOrders[0].bill_id;

        try {
            const response = await axios.get(API_BASE_URL + 'order/' + `${bill_id}`);
            const data = response.data.data;
            return data
        } catch (error) {
            console.error("Error in fetchTableDetail:", error);
            return rejectWithValue(error.message);
        }
    },
)


const initialState = {
    data: [],
    isLoading: false,
}

export const orderByIdSlice = createSlice({
    name: 'OrderById',
    initialState,
    reducers: {
        resetStateOrderByIdSlice: (state) => {
            return initialState
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderById.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.isLoading = true
                state.data = action.payload
            })
            .addCase(fetchOrderById.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { resetStateOrderByIdSlice } = orderByIdSlice.actions;

export default orderByIdSlice.reducer;