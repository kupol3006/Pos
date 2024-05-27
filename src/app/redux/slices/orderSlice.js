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
        const totalItem = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const totalTopping = items.reduce((total, item) => total + (item.topping?.reduce((total, item) => total + item.topping.price * item.quantity, 0) || 0), 0)
        const totalToppingDetail = items.reduce((total, item) => total + (item.toppingDetail?.reduce((total, item) => total + item.toppingDetail.price * item.quantity, 0) || 0), 0);
        const total = totalItem + totalTopping + totalToppingDetail;
        try {
            const data = {
                order_channel_id: getState().order.orderChannel,
                order_type_id: getState().order.orderType,
                table_id: getState().order.roomNum,
                waiter_code: getState().order.staff,
                cashier_code: getState().order.staff,
                total: total,
                sub_total: total,
                order_details: items.map((item) => ({
                    product_detail_id: item.id,
                    catalogue_id: item.catalogue_id,
                    quantity: item.quantity,
                    price: item.price,
                    price_sale: 0,
                    name: item.name,
                    type: item.type,
                    total: item.price,
                    sub_total: item.price,
                    details: (Array.isArray(item.topping) ? item.topping : [])
                        .concat(Array.isArray(item.toppingDetail) ? item.toppingDetail : [])
                        .map((detail) => ({
                            product_detail_id: detail.topping ? detail.topping.id : detail.toppingDetail ? detail.toppingDetail.id : null,
                            catalogue_id: item.catalogue_id,
                            quantity: detail.quantity,
                            price: detail.topping ? detail.topping.price : detail.toppingDetail ? detail.toppingDetail.price : null,
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
export const updateOrder = createAsyncThunk(
    'postOrderById/updateOrder',
    async (bill_id, { getState, rejectWithValue }) => {
        const token = parseCookies()['token'];
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const items = getState().product.items;
        const dataOrder = getState().orderById.data;
        const totalItem = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const totalTopping = items.reduce((total, item) => total + (item.topping?.reduce((total, item) => total + item.topping.price * item.quantity, 0) || 0), 0)
        const totalToppingDetail = items.reduce((total, item) => total + (item.toppingDetail?.reduce((total, item) => total + item.toppingDetail.price * item.quantity, 0) || 0), 0);
        const totalOrderByID = dataOrder.orderDetails?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
        const totalToppingOrderByID = dataOrder.orderDetails?.reduce((total, item) => total + (item.details?.reduce((total, item) => total + item.price * item.quantity, 0) || 0), 0);
        const total = totalItem + totalTopping + totalToppingDetail + (totalOrderByID || 0) + (totalToppingOrderByID || 0);
        // const order_id = getState().orderById.data.id;
        try {
            const data = {
                total: total,
                new_items: items.map((item) => ({
                    product_detail_id: item.id,
                    catalogue_id: item.catalogue_id,
                    quantity: item.quantity,
                    price: item.price,
                    price_sale: 0,
                    name: item.name,
                    type: item.type,
                    total: item.price,
                    sub_total: item.price,
                    details: (Array.isArray(item.topping) ? item.topping : [])
                        .concat(Array.isArray(item.toppingDetail) ? item.toppingDetail : [])
                        .map((detail) => ({
                            product_detail_id: detail.topping ? detail.topping.id : detail.toppingDetail ? detail.toppingDetail.id : null,
                            catalogue_id: item.catalogue_id,
                            quantity: detail.quantity,
                            price: detail.topping ? detail.topping.price : detail.toppingDetail ? detail.toppingDetail.price : null,
                            price_sale: 0,
                            name: detail.topping ? detail.topping.name : detail.toppingDetail ? detail.toppingDetail.name : null,
                            type: detail.topping ? detail.topping.type : detail.toppingDetail ? detail.toppingDetail.type : null,
                            total: detail.topping ? detail.topping.price * detail.quantity : detail.toppingDetail ? detail.toppingDetail.price * detail.quantity : null,
                            sub_total: detail.topping ? detail.topping.price * detail.quantity : detail.toppingDetail ? detail.toppingDetail.price * detail.quantity : null,
                        })),
                })),
                update_items: getState().orderById.orderUpdate.map((item) => ({
                    product_detail_id: item.product_detail_id,
                    catalogue_id: item.catalogue_id,
                    quantity: item.quantity,
                    price: item.price,
                    price_sale: 0,
                    name: item.name,
                    type: item.type,
                    total: item.price,
                    sub_total: item.price,
                    id: item.id,
                    details: item.details.map((detail) => ({
                        product_detail_id: detail.id || detail.product_detail_id,
                        catalogue_id: item.catalogue_id,
                        quantity: detail.quantity,
                        price: detail.price,
                        price_sale: 0,
                        name: detail.name,
                        type: detail.type,
                        total: detail.price,
                        sub_total: detail.price,
                    })),
                })),
                delete_items: getState().orderById.orderDelete.map((item) => ({
                    product_detail_id: item.product_detail_id,
                    catalogue_id: item.catalogue_id,
                    quantity: item.quantity,
                    price: item.price,
                    price_sale: 0,
                    name: item.name,
                    type: item.type,
                    total: item.price,
                    sub_total: item.price,
                    id: item.id,
                    details: item.details.map((detail) => ({
                        product_detail_id: detail.id || detail.product_detail_id,
                        catalogue_id: item.catalogue_id,
                        quantity: detail.quantity,
                        price: detail.price,
                        price_sale: 0,
                        name: detail.name,
                        type: detail.type,
                        total: detail.price,
                        sub_total: detail.price,
                    })),
                })),
            };
            const res = await axios.post(API_BASE_URL + 'order/' + `${bill_id}`, data);
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
    dataOrderUpdate: [],
    isLoading: false,
    cusType: '',
    cusQuan: '',
    phone: '',
    floorNum: '',
    roomNum: '',
    roomName: '',
    test: '',
    orderType: '',
    orderChannel: '',
    staff: '',
    staffName: '',
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
        updateRoomNumId: (state, action) => {
            state.roomNum = action.payload;
        },
        updateRoomName: (state, action) => {
            state.roomName = action.payload;
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
        updateStaffName: (state, action) => {
            state.staffName = action.payload;
        }

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
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.dataOrderUpdate = action.payload
            })
            .addCase(updateOrder.rejected, (state) => {
                state.isLoading = false
            })
    },
});

export const { updateCusType, updateCusQuan, updatePhone, updateFloorNum, updateRoomNumId, updateRoomName, updateTest, updateOrderType, updateOrderChannel, updateStaff, updateStaffName } = orderSlice.actions;
// export const selectForm = (state) => state.form;

export default orderSlice.reducer;

