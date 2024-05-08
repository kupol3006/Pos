import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchTableList = createAsyncThunk(
    'tableList/fetchTableList',
    async () => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(API_BASE_URL + 'table/list?page=1&limit=10&tableId=1&channelId=1&status=1&diagram=true');
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

export const tableListSlice = createSlice({
    name: 'tableList',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTableList.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchTableList.fulfilled, (state, action) => {
                state.isLoading = true
                state.data = action.payload
            })
            .addCase(fetchTableList.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { } = tableListSlice.actions;

export default tableListSlice.reducer;