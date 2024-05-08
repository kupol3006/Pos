import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchTableDetail = createAsyncThunk(
    'tableDetail/fetchTableDetail',
    async (roomDetail, { getState, rejectWithValue }) => {
        const token = parseCookies()['token'];
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const room_id = roomDetail.id;
        try {
            const response = await axios.get(API_BASE_URL + 'table/details/' + `${room_id}`);
            const data = response.data
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
    posId: '',
}

export const tableDetailSlice = createSlice({
    name: 'tableDetail',
    initialState,
    reducers: {
        setPosId: (state, action) => {
            state.posId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTableDetail.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchTableDetail.fulfilled, (state, action) => {
                state.isLoading = true
                state.data = action.payload
            })
            .addCase(fetchTableDetail.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { setPosId } = tableDetailSlice.actions;

export default tableDetailSlice.reducer;