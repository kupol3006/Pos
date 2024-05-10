import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { set } from 'date-fns';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchOrderById = createAsyncThunk(
    'OrderById/fetchOrderById',
    async (room, { getState, rejectWithValue }) => {
        const token = parseCookies()['token'];
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const bill_id = room.activeOrders[0].bill_id;

        try {
            const response = await axios.get(API_BASE_URL + 'order/' + `${bill_id}`);
            const data = response.data.data;
            return data
        } catch (error) {
            console.error("Error in fetchTableDetail:", error);
            return rejectWithValue(error.message);
        }
    },
)


const initialState = {
    data: [],
    dataPrimitive: [],
    orderUpdate: [],
    orderDelete: [],
    idUnique: '',
    isLoading: false,
}

export const orderByIdSlice = createSlice({
    name: 'OrderById',
    initialState,
    reducers: {
        setUniqueID: (state, action) => {
            state.idUnique = action.payload;
        },
        setOrderUpdate: (state, action) => {
            const dataOrderDetail = state.data.orderDetails;
            const dataPrimitiveOrderDetail = state.dataPrimitive.orderDetails;
            if (state.idUnique !== '') {
                const hasProductChanged = () => {
                    for (let i = 0; i < dataOrderDetail.length; i++) {
                        const itemA = dataOrderDetail[i];
                        const itemB = dataPrimitiveOrderDetail.find(item => item.id === itemA.id);
                        if (itemB) {
                            if (itemA.quantity > itemB.quantity) {
                                return { bool: true, item: itemA, topping: null };
                            } else if (itemA.quantity <= itemB.quantity) {
                                return { bool: true, item: itemA, topping: null };
                            }
                            for (let j = 0; j < (itemA.details ? itemA.details.length : 0); j++) {
                                const toppingA = itemA.details[j];
                                const toppingB = itemB.details.find(item => item.id === toppingA.id);
                                if (toppingB && toppingA.quantity !== toppingB.quantity) {
                                    return { bool: true, item: itemA, topping: toppingA };
                                }
                            }
                        }
                    }
                    return { bool: false, item: null, topping: null };
                }
                const productChange = hasProductChanged();
                if (productChange.bool) {
                    if (productChange.topping) {
                        productChange.item.details = productChange.item.details.map(detail =>
                            detail.id === productChange.topping.id ? productChange.topping : detail
                        );
                    }
                    const index = state.orderUpdate.findIndex(item => item.id === productChange.item.id);
                    if (index !== -1) {
                        state.orderUpdate[index].quantity = productChange.item.quantity;
                    } else if (productChange.item.quantity > 1) {
                        state.orderUpdate.push(productChange.item);
                    }
                }
            }
        },
        resetStateOrderByIdSlice: (state) => {
            return initialState
        },
        updateQuantityOrderById: (state, action) => {
            const value = action.payload;
            const item = state.data.orderDetails.find((i) => i.id === state.idUnique);
            if (value === 'plus') {
                if (item) {
                    item.quantity++;
                }
            }
            else if (value === 'minus') {
                if (item) {
                    if (item.quantity === 1) {
                        state.orderDelete.push(item);
                        state.data.orderDetails.find((i) => i.id === state.idUnique).quantity--;
                        state.data.orderDetails = state.data.orderDetails.filter((i) => i.quantity > 0);
                        state.orderUpdate.find((i) => i.id === state.idUnique).quantity--;
                        state.orderUpdate = state.orderUpdate.filter((i) => i.quantity > 0);
                    }
                    else if (item.quantity >= 1) {
                        state.data.orderDetails.find((i) => i.id === state.idUnique).quantity--;
                    }
                }
            }
            else {
                if (item) {
                    item.quantity = value;
                }
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderById.pending, (state) => {
                state.isLoading = false
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.isLoading = true
                state.data = action.payload
                state.dataPrimitive = action.payload
            })
            .addCase(fetchOrderById.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { resetStateOrderByIdSlice, setUniqueID, updateQuantityOrderById, setOrderUpdate } = orderByIdSlice.actions;

export default orderByIdSlice.reducer;