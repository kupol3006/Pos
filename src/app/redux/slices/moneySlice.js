import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchMoney = createAsyncThunk(
    'money/fetchMoney',
    async (type, { getState, rejectWithValue }) => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(API_BASE_URL + 'money/' + `${type}`);
            const data = response.data.data;
            return data
        } catch (error) {
            console.error("Error in createOrder:", error);
            return rejectWithValue(error.message);
        }
    },
)
export const postMoney = createAsyncThunk(
    'money/postMoney',
    async (type, amount, { getState, rejectWithValue }) => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const money = {
                type: type,
                amount: amount
            };
            const response = await axios.post(API_BASE_URL + 'money', money);
            const data = response.data.data;
            return data
        } catch (error) {
            console.error("Error in createOrder:", error);
            return rejectWithValue(error.message);
        }
    },
)


const initialState = {
    data: [],
    dataPostMoney: [],
    isLoading: false,
}

// Then, handle actions in your reducers:
export const moneySlice = createSlice({
    name: 'money',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoney.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchMoney.fulfilled, (state, action) => {
                state.isLoading = true
                state.data = action.payload
            })
            .addCase(fetchMoney.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { } = moneySlice.actions;

export default moneySlice.reducer;