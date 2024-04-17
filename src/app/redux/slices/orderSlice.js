import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cusType: '',
    cusQuan: '',
    phone: '',
    bedNum: '',
    test: '',
    orderType: '',
    orderChannel: '',
    staff: '',
}

export const orderSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateCusType: (state, action) => {
            state.cusType = action.payload;
        },
        updateCusQuan: (state, action) => {
            state.cusQuan = action.payload;
        },
        updatePhone: (state, action) => {
            state.phone = action.payload;
        },
        updateBedNum: (state, action) => {
            state.bedNum = action.payload;
        },
        updateTest: (state, action) => {
            state.test = action.payload;
        },
        updateOrderType: (state, action) => {
            state.orderType = action.payload;
        },
        updateOrderChannel: (state, action) => {
            state.orderChannel = action.payload;
        },
        updateStaff: (state, action) => {
            state.staff = action.payload;
        },

    },
});

export const { updateCusType, updateCusQuan, updatePhone, updateBedNum, updateTest, updateOrderType, updateOrderChannel, updateStaff } = orderSlice.actions;
export const selectForm = (state) => state.form;

export default orderSlice.reducer;
