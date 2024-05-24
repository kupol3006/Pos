import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchWorkDayInfor = createAsyncThunk(
    'workDayInfor/fetchWorkDayInfor',
    async (type, { getState, rejectWithValue }) => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(API_BASE_URL + 'work_day');
            const data = response.data.data;
            return data
        } catch (error) {
            console.error("Error in fetchWorkDayInfor:", error);
            return rejectWithValue(error.message);
        }
    },
)


const initialState = {
    dataWorkdayInfor: [],
    dataShiftsOfDay: [],
    isLoading: false,
}

// Then, handle actions in your reducers:
export const workDaySlice = createSlice({
    name: 'workDayInfor',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkDayInfor.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchWorkDayInfor.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataWorkdayInfor = action.payload
                state.dataShiftsOfDay = action.payload.shifts
            })
            .addCase(fetchWorkDayInfor.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { } = workDaySlice.actions;

export default workDaySlice.reducer;