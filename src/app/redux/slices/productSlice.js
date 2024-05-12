import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';
// import { selectPosId } from './orderTypeSlice';
import { v4 as uuidv4 } from 'uuid';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;


export const fetchProduct = createAsyncThunk(
    'product/fetchbyid',
    async (_, { getState, rejectWithValue }) => {
        const token = parseCookies()['token'];
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const pos_id_tableDetail = getState().tableDetail.posId;
        const pos_id_orderById = getState().orderById.data.order_type_id;
        try {
            const response = await axios.get(API_BASE_URL + 'menu/' + (pos_id_orderById || pos_id_tableDetail));
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
    isLoading: false,
    productDetail: [],
    items: [],
    topping: [],
    toppingDetail: [],
    productId: '',
    toppingId: '',
    idCard: '',
    itemSelected: [],
}

// Then, handle actions in your reducers:
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductDetail: (state, action) => {
            state.productDetail = action.payload;
        },
        setToping: (state, action) => {
            state.topping = action.payload;
        },
        setItemSelected: (state, action) => {
            state.itemSelected = action.payload;
        },
        addItems: (state, action) => {
            const item = action.payload;
            const existItem = state.items.find((i) => i.id === item.id);
            const uniqueId = uuidv4();

            if (state.items.length === 0) {
                state.items.push({ ...item, quantity: 1, idCard: uniqueId });
            }
            else if (state.items.find((i) => i.idCard === state.itemSelected.idCard)) {
                const itemToUpdate = state.items.find((i) => i.id === item.id && i.idCard === state.itemSelected.idCard);
                if (itemToUpdate) {
                    itemToUpdate.quantity++;
                } else {
                    state.itemSelected = [];
                    state.items.push({ ...item, quantity: 1, idCard: uniqueId });
                }
            }
            else {
                if (state.items[state.items.length - 1].id === item.id) {
                    state.items[state.items.length - 1].quantity++;
                } else {
                    state.items.push({ ...item, quantity: 1, idCard: uniqueId });
                }
            }
        },
        setToppingDetail: (state, action) => {
            state.toppingDetail = action.payload;
        },
        setProductId: (state, action) => {
            state.productId = action.payload;
        },
        setStoreToppingSelected: (state, action) => {
            const topping = action.payload;
            if (state.items.length > 0) {
                state.items.map((item, index) => {
                    if (item.idCard === state.idCard) {
                        if (state.items[index].toppingDetail?.find((i) => i.toppingDetail.id === topping.id)) {
                            state.items[index].toppingDetail.find((i) => i.toppingDetail.id === topping.id).quantity++;
                        }
                        else if (!state.items[index].topping) {
                            state.items[index].topping = [];
                            // state.items[index].topping.quantity++;
                            state.items[index].topping.push({ topping, quantity: 1 });

                        }
                        else if (state.items[index].topping.find((i) => i.topping.id === topping.id)) {
                            state.items[index].topping.find((i) => i.topping.id === topping.id).quantity++;
                        } else {
                            // Thêm topping vào mảng topping hiện tại
                            state.items[index].topping.push({ topping, quantity: 1 });
                        }
                    }
                });
            }
        },
        setToppingId: (state, action) => {
            state.toppingId = action.payload;
        },
        addToppingDetail: (state, action) => {
            const toppingDetail = action.payload;
            if (state.items.length > 0) {
                state.items.map((item, index) => {
                    if (item.idCard === state.idCard) {
                        if (state.items[index].topping.find((i) => i.topping.id === toppingDetail.id)) {
                            state.items[index].topping.find((i) => i.topping.id === toppingDetail.id).quantity++;
                        }
                        else if (!state.items[index].toppingDetail) {
                            state.items[index].toppingDetail = [];
                            // state.items[index].topping.quantity++;
                            state.items[index].toppingDetail.push({ toppingDetail, quantity: 1 });
                        }
                        else if (state.items[index].toppingDetail.find((i) => i.toppingDetail.id === toppingDetail.id)) {
                            state.items[index].toppingDetail.find((i) => i.toppingDetail.id === toppingDetail.id).quantity++;
                        } else {
                            // Thêm topping vào mảng topping hiện tại
                            state.items[index].toppingDetail.push({ toppingDetail, quantity: 1 });
                        }
                    }
                });
            }

        },
        resetStateToppingSelected: (state) => {
            state.toppingSelected = initialState.toppingSelected;
        },
        resetStateProductSlice: (state) => {
            // Đặt lại state về giá trị ban đầu
            return initialState;
        },
        setIdCard: (state, action) => {
            state.idCard = action.payload;
        },
        updateQuantity: (state, action) => {
            const value = action.payload;
            const item = state.items.find((i) => i.idCard === state.itemSelected.idCard || i.idCard === state.idCard);
            if (value === 'plus') {
                if (item) {
                    item.quantity++;
                }
            } else if (value === 'minus') {
                if (item) {
                    if (item.quantity === 1) {
                        state.items.find((i) => i.idCard === state.itemSelected.idCard || i.idCard === state.idCard).quantity--
                        state.items = state.items.filter((i) => i.quantity > 0);
                    }
                    else if (item.quantity >= 1) {
                        state.items.find((i) => i.idCard === state.itemSelected.idCard || i.idCard === state.idCard).quantity--;
                    }
                }
            } else {
                if (item) {
                    item.quantity = value;
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchProduct.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { setProductDetail, addItems, setToping, setToppingDetail, setStoreToppingSelected, resetStateToppingSelected, resetStateProductSlice, setProductId, setToppingId, addToppingDetail, setIdCard, setItemSelected, updateQuantity } = productSlice.actions;

export default productSlice.reducer;