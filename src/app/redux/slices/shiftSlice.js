import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { data } from 'autoprefixer';
import axios from 'axios';
import { set } from 'date-fns';
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
export const fetchWorkDayShiftList = createAsyncThunk(
    'workDayShiftList/fetchWorkDayShiftList',
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
);
export const createShiftDay = createAsyncThunk(
    'createShift/createShiftDay',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post(API_BASE_URL + 'work_day/shift');
            return response.data.data;
        } catch (error) {
            console.error("Error in createOrder:", error);
            return rejectWithValue(error.message);
        }
    },
);
export const closeShiftDay = createAsyncThunk(
    'closeShift/closeShiftDay',
    async (_, { rejectWithValue }) => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.put(API_BASE_URL + 'work_day/shift');
            return response.data;
        } catch (error) {
            console.error("Error in updateShift:", error);
            return rejectWithValue(error.message);
        }
    },
);

const initialState = {
    dataShiftDetail: [],
    dataWorkDayShiftList: [],
    dataCreateShift: [],
    dataCloseShift: [],
    isCreateShift: false,
    isCloseShift: false,
    isLoading: false,
}

// Then, handle actions in your reducers:
export const shiftSlice = createSlice({
    name: 'shift',
    initialState,
    reducers: {
        setIsCreateShift: (state, action) => {
            state.isCreateShift = !state.isCreateShift
        },
        setCloseShift: (state, action) => {
            state.isCloseShift = !state.isCloseShift
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShift.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchShift.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataShiftDetail = action.payload
            })
            .addCase(fetchShift.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(fetchWorkDayShiftList.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchWorkDayShiftList.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataWorkDayShiftList = action.payload
            })
            .addCase(fetchWorkDayShiftList.rejected, (state) => {
                state.isLoading = false
            })

            .addCase(createShiftDay.pending, (state) => {
                state.isLoading = false
            })
            .addCase(createShiftDay.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataCreateShift = action.payload
            })
            .addCase(createShiftDay.rejected, (state) => {
                state.isLoading = false
            })

            .addCase(closeShiftDay.pending, (state) => {
                state.isLoading = false
            })
            .addCase(closeShiftDay.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataCloseShift = action.payload
            })
            .addCase(closeShiftDay.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { setIsCreateShift, setCloseShift } = shiftSlice.actions;

export default shiftSlice.reducer;