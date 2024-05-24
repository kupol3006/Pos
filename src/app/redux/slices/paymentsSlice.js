import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchPaymentsMethod = createAsyncThunk(
    'paymentsMethod/fetchPaymentsMethod',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(API_BASE_URL + 'order/method_payments');
            const data = response.data;
            return data
        } catch (error) {
            console.error("Error in paymentsMethod:", error);
            return rejectWithValue(error.message);
        }
    },
)


const initialState = {
    dataPaymentsMethod: [],
    isLoading: false,
}

// Then, handle actions in your reducers:
export const paymentsSlice = createSlice({
    name: 'paymentsMethod',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentsMethod.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchPaymentsMethod.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataPaymentsMethod = action.payload
            })
            .addCase(fetchPaymentsMethod.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { } = paymentsSlice.actions;

export default paymentsSlice.reducer;