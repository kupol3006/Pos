import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchPaymentsMethod = createAsyncThunk(
    'paymentsMethod/fetchPaymentsMethod',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(API_BASE_URL + 'order/method_payments');
            const data = response.data;
            return data
        } catch (error) {
            console.error("Error in paymentsMethod:", error);
            return rejectWithValue(error.message);
        }
    },
)
export const paymentOrder = createAsyncThunk(
    'payment/paymentOrder',
    async (_, { getState, rejectWithValue }) => {
        const items = getState().product.items;
        const dataOrder = getState().orderById.data;
        const totalItem = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const totalTopping = items.reduce((total, item) => total + (item.topping?.reduce((total, item) => total + item.topping.price * item.quantity, 0) || 0), 0)
        const totalToppingDetail = items.reduce((total, item) => total + (item.toppingDetail?.reduce((total, item) => total + item.toppingDetail.price * item.quantity, 0) || 0), 0);
        const totalOrderByID = dataOrder.orderDetails?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
        const totalToppingOrderByID = dataOrder.orderDetails?.reduce((total, item) => total + (item.details?.reduce((total, item) => total + item.price * item.quantity, 0) || 0), 0);
        const total = totalItem + totalTopping + totalToppingDetail + (totalOrderByID || 0) + (totalToppingOrderByID || 0);
        const bill_id = getState().orderById.dataPrimitive.id;
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const dataPayment = {
                method_payment_id: getState().payments.paymentsMethodDetail.pos_id,
                channel_payment_id: getState().payments.paymentChannel.channel_id,
                amount: total,
            }
            const response = await axios.post(API_BASE_URL + 'order/payment/' + bill_id, dataPayment);
            return response.data;
            // return dataPayment
        } catch (error) {
            console.error("Error in paymentOrder:", error);
            return rejectWithValue(error.message);
        }
    },
)
export const finalOrder = createAsyncThunk(
    'paymentFinal/finalOrder',
    async (_, { getState, rejectWithValue }) => {
        const bill_id = getState().orderById.dataPrimitive.id;
        try {
            const token = parseCookies()['token'];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.post(API_BASE_URL + 'order/final/order/' + bill_id);
            return response.data;
        } catch (error) {
            console.error("Error in finalOrder:", error);
            return rejectWithValue(error.message);
        }
    },
)

const initialState = {
    dataPaymentsMethod: [],
    dataPaymentOrder: [],
    dataFinalOrder: [],
    paymentsMethodDetail: [],
    paymentChannel: [],
    isLoading: false,
}

// Then, handle actions in your reducers:
export const paymentsSlice = createSlice({
    name: 'paymentsMethod',
    initialState,
    reducers: {
        setPaymentsMethodDetail: (state, action) => {
            state.paymentsMethodDetail = action.payload;
        },
        setPaymentChannel: (state, action) => {
            state.paymentChannel = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentsMethod.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchPaymentsMethod.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataPaymentsMethod = action.payload
            })
            .addCase(fetchPaymentsMethod.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(paymentOrder.pending, (state) => {
                state.isLoading = false
            })
            .addCase(paymentOrder.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataPaymentOrder = action.payload
            })
            .addCase(paymentOrder.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(finalOrder.pending, (state) => {
                state.isLoading = false
            })
            .addCase(finalOrder.fulfilled, (state, action) => {
                state.isLoading = true
                state.dataFinalOrder = action.payload
            })
            .addCase(finalOrder.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { setPaymentsMethodDetail, setPaymentChannel } = paymentsSlice.actions;

export default paymentsSlice.reducer;