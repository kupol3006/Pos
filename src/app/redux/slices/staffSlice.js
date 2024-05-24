import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchStaff = createAsyncThunk(
    'staff/fetchStaff',
    async (type, { getState, rejectWithValue }) => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(API_BASE_URL + 'staff');
            const data = response.data;
            return data
        } catch (error) {
            console.error("Error in fetchStaff:", error);
            return rejectWithValue(error.message);
        }
    },
)
export const fetchStaffShift = createAsyncThunk(
    'staffShift/fetchStaffShift',
    async (type, { getState, rejectWithValue }) => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(API_BASE_URL + 'work_day/staff?type=' + `${type}`);
            const data = response.data.data;
            return data
        } catch (error) {
            console.error("Error in fetchStaffShift:", error);
            return rejectWithValue(error.message);
        }
    },
)
export const checkInOutStaff = createAsyncThunk(
    'checkInOut/checkInOutStaff',
    async (type, { getState, rejectWithValue }) => {
        const currentTime = new Date().toISOString();
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const data = {
                type: type,
                staff_id: getState().staff.staffPosId,
                time_start: currentTime,
                time_finish: null
            }
            const response = await axios.post(API_BASE_URL + 'work_day/staff', data);
            return response.data;
            // return data
        } catch (error) {
            console.error("Error in checkInOutStaff:", error);
            return rejectWithValue(error.message);
        }
    },
)


const initialState = {
    dataStaffList: [],
    data: [],
    dataCheckInOut: [],
    commonData: [],
    staffPosId: '',
    isLoading: false,
    render: false,
}

// Then, handle actions in your reducers:
export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setStaffPosId: (state, action) => {
            state.staffPosId = action.payload
        },
        checkStaffInshift: (state, action) => {
            for (let i = 0; i < state.data.length; i++) {
                const itemExist = state.dataStaffList.data.find(item => item.pos_id === state.data[i].staff_id);
                if (itemExist) {
                    if (state.commonData.length === 0) {
                        state.commonData.push(itemExist);
                    } else {
                        const itemExistInCommonData = state.commonData.find(item => item.pos_id === state.data[i].staff_id);
                        if (!itemExistInCommonData) {
                            state.commonData.push(itemExist);
                        }
                    }

                }
            }
        },
        setRender: (state) => {
            state.render = !state.render
        },
        resetStaffPosId: (state) => {
            state.staffPosId = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStaff.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchStaff.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataStaffList = action.payload
            })
            .addCase(fetchStaff.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(fetchStaffShift.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchStaffShift.fulfilled, (state, action) => {
                state.isLoading = true
                state.data = action.payload
            })
            .addCase(fetchStaffShift.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(checkInOutStaff.pending, (state) => {
                state.isLoading = false
            })
            .addCase(checkInOutStaff.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataCheckInOut = action.payload
            })
            .addCase(checkInOutStaff.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { setStaffPosId, checkStaffInshift, resetStaffPosId, setRender } = staffSlice.actions;

export default staffSlice.reducer;