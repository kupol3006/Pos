import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchShift = createAsyncThunk(
    'shift/fetchShift',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(API_BASE_URL + 'work_day/shift');
            return response.data.data;
        } catch (error) {
            console.error("Error in createOrder:", error);
            return rejectWithValue(error.message);
        }
    },
)


const initialState = {
    dataShift: [],
    isLoading: false,
}

// Then, handle actions in your reducers:
export const shiftSlice = createSlice({
    name: 'shift',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShift.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchShift.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataShift = action.payload
            })
            .addCase(fetchShift.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { } = shiftSlice.actions;

export default shiftSlice.reducer;