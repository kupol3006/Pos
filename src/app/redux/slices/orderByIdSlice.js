import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchOrderById = createAsyncThunk(
    'OrderById/fetchOrderById',
    async (room, { getState, rejectWithValue }) => {
        const token = parseCookies()['token'];
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let bill_id = '';
        if (typeof room === 'object') {
            bill_id = room.activeOrders[0].bill_id;
        } else {
            bill_id = room;
        }

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
    productName: '',
    idGeneral: '',
    isNew: true,
    isLoading: false,
}

export const orderByIdSlice = createSlice({
    name: 'OrderById',
    initialState,
    reducers: {
        setUniqueID: (state, action) => {
            state.idUnique = action.payload;
        },
        setProductName: (state, action) => {
            state.productName = action.payload;
        },
        setGeneralID: (state, action) => {
            state.idGeneral = action.payload;
        },
        setOrderUpdate: (state, action) => {
            const dataOrderDetail = state.data.orderDetails;
            const dataPrimitiveOrderDetail = state.dataPrimitive.orderDetails;
            if (state.idUnique !== '') {
                const hasProductChanged = () => {
                    const item = dataOrderDetail.find((i) => i.id === state.idUnique);
                    const itemPrimitive = dataPrimitiveOrderDetail.find((i) => i.id === state.idUnique);
                    if (item && itemPrimitive) {
                        if (item.quantity !== itemPrimitive.quantity) {
                            return { bool: true, item: item, topping: null };
                        }
                        if (item.quantity === itemPrimitive.quantity) {
                            return { bool: true, item: { item: item, delete: true }, topping: null };
                        }
                    }
                    return { bool: false, item: null, topping: null };
                }
                const productChange = hasProductChanged();
                if (productChange.bool) {
                    const item = dataOrderDetail.find((i) => i.id === state.idUnique);
                    const itemPrimitive = dataPrimitiveOrderDetail.find((i) => i.id === state.idUnique);
                    const index = state.orderUpdate.findIndex(item => item.id === productChange.item.id);
                    if (productChange.item.delete) {
                        state.orderUpdate = state.orderUpdate.filter((i) => i.id !== productChange.item.item.id);
                    }
                    else if (index !== -1) {
                        state.orderUpdate[index].quantity = productChange.item.quantity;
                    }
                    else if (item.quantity !== itemPrimitive.quantity) {
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
            const item = state.data.orderDetails?.find((i) => i.id === state.idUnique);
            const itemOfOrderUpdate = state.orderUpdate.find((i) => i.id === state.idUnique);
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
                        if (itemOfOrderUpdate) {
                            state.orderUpdate.find((i) => i.id === state.idUnique).quantity--;
                            state.orderUpdate = state.orderUpdate.filter((i) => i.quantity > 0);
                        }
                    }
                    else if (item.quantity >= 1) {
                        state.data.orderDetails.find((i) => i.id === state.idUnique).quantity--;
                    }
                }
            }
            else if (value === 'delete') {
                if (item) {
                    state.orderDelete.push(item);
                    state.data.orderDetails = state.data.orderDetails.filter((i) => i.id !== state.idUnique);
                    if (itemOfOrderUpdate) {
                        state.orderUpdate = state.orderUpdate.filter((i) => i.id !== state.idUnique);
                    }
                }
            }
            else if (value === state.productName) {
                if (item) {
                    item.quantity++;
                }
            }
            else {
                if (item) {
                    item.quantity = parseInt(value);
                }
            }
        },
        updateToppingOrderById: (state, action) => {
            const topping = { ...action.payload, quantity: 1 };
            const item = state.data.orderDetails.find((i) => i.id === state.idUnique);
            const itemOfOrderUpdate = state.orderUpdate.find((i) => i.id === state.idUnique);
            if (topping.type === 'topping') {
                if (item) {
                    const index = item.details.findIndex((i) => i.product_detail_id === topping.id);
                    if (index !== -1) {
                        item.details[index].quantity++;
                    } else {
                        const i = item.details.findIndex((i) => i.id === topping.id);
                        if (i !== -1) {
                            item.details[i].quantity++;
                        } else {
                            item.details.push(topping);
                        }
                    }
                }
                if (itemOfOrderUpdate) {
                    const index = itemOfOrderUpdate.details.findIndex((i) => i.product_detail_id === topping.id);
                    if (index !== -1) {
                        itemOfOrderUpdate.details[index].quantity++;
                    } else {
                        const i = itemOfOrderUpdate.details.findIndex((i) => i.id === topping.id);
                        if (i !== -1) {
                            itemOfOrderUpdate.details[i].quantity++;
                        } else {
                            itemOfOrderUpdate.details.push(topping);
                        }
                    }
                }
            }
        },
        setIsNew: (state, action) => {
            state.isNew = action.payload;
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

export const { resetStateOrderByIdSlice, setUniqueID, updateQuantityOrderById, setOrderUpdate, setProductName, setGeneralID, updateToppingOrderById, setIsNew } = orderByIdSlice.actions;

export default orderByIdSlice.reducer;