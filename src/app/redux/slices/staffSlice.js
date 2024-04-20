import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { store } from '../store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
const token = parseCookies()['token'];
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const fetchStaff = createAsyncThunk(
    'staff/fetchStaff',
    async () => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(API_BASE_URL + 'work_day/staff?type=in');
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
}

// Then, handle actions in your reducers:
export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStaff.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchStaff.fulfilled, (state, action) => {
                state.isLoading = true
                state.data = action.payload
            })
            .addCase(fetchStaff.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { } = staffSlice.actions;

export default staffSlice.reducer;