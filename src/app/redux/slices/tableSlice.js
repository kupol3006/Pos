// import TableDetail from '@/app/Component/tableDetail';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { set } from 'date-fns';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchTable = createAsyncThunk(
    'table/fetchTable',
    async () => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(API_BASE_URL + 'table');
            const data = response.data.data;
            return data
        } catch (err) {
            console.log(err)
        }
    },
)


const initialState = {
    data: [],
    floorDetail: [],
    show: true,
    floorName: '',
    isLoading: false,
}

// Then, handle actions in your reducers:
export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setFloorDetail: (state, action) => {
            state.floorDetail = action.payload
        },
        setShow: (state, action) => {
            state.show = action.payload
        },
        setFloorName: (state, action) => {
            state.floorName = action.payload
        },
        resetStateTableSlice: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTable.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchTable.fulfilled, (state, action) => {
                state.isLoading = true
                state.data = action.payload
            })
            .addCase(fetchTable.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { setFloorDetail, resetStateTableSlice, setShow, setFloorName } = tableSlice.actions;

export default tableSlice.reducer;