import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { sub } from 'date-fns';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

export const createOrder = createAsyncThunk(
    'postOrder/createOrder',
    async (_, { getState, rejectWithValue }) => {
        const token = parseCookies()['token'];
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const items = getState().product.items;
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        try {
            const data = {
                order_channel_id: getState().order.orderChannel,
                order_type_id: getState().order.orderType,
                table_id: getState().order.roomNum,
                total: total,
                sub_total: total,
                order_details: items.map((item) => ({
                    product_detail_id: item.id,
                    catalogue_id: item.catalogue_id,
                    quantity: item.quantity,
                    price: 0,
                    price_sale: 0,
                    name: item.name,
                    type: item.type,
                    total: item.price,
                    sub_total: item.price,
                    details: (Array.isArray(item.topping) ? item.topping : [])
                        .concat(Array.isArray(item.toppingDetail) ? item.toppingDetail : [])
                        .map((detail) => ({
                            product_detail_id: detail.topping ? detail.topping.id : detail.toppingDetail ? detail.toppingDetail.id : null,
                            catalogue_id: detail.topping ? detail.topping.catalogue_id : detail.toppingDetail ? detail.toppingDetail.catalogue_id : null,
                            quantity: detail.quantity,
                            price: 0,
                            price_sale: 0,
                            name: detail.topping ? detail.topping.name : detail.toppingDetail ? detail.toppingDetail.name : null,
                            type: detail.topping ? detail.topping.type : detail.toppingDetail ? detail.toppingDetail.type : null,
                            total: detail.topping ? detail.topping.price * detail.quantity : detail.toppingDetail ? detail.toppingDetail.price * detail.quantity : null,
                            sub_total: detail.topping ? detail.topping.price * detail.quantity : detail.toppingDetail ? detail.toppingDetail.price * detail.quantity : null,
                        })),
                })),
            };

            const res = await axios.post(API_BASE_URL + 'order', data);
            return res.data;
            // return data;
        } catch (error) {
            console.error("Error in createOrder:", error);
            return rejectWithValue(error.message);
        }
    },
)



const initialState = {
    data: [],
    isLoading: false,
    cusType: '',
    cusQuan: '',
    phone: '',
    floorNum: '',
    roomNum: '',
    test: '',
    orderType: '',
    orderChannel: '',
    staff: '',
}

export const orderSlice = createSlice({
    name: 'postOrder',
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
        updateFloorNum: (state, action) => {
            state.floorNum = action.payload;
        },
        updateRoomNum: (state, action) => {
            state.roomNum = action.payload;
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
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(createOrder.rejected, (state) => {
                state.isLoading = false
            })
    },
});

export const { updateCusType, updateCusQuan, updatePhone, updateFloorNum, updateRoomNum, updateTest, updateOrderType, updateOrderChannel, updateStaff } = orderSlice.actions;
// export const selectForm = (state) => state.form;

export default orderSlice.reducer;
