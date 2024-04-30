import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { selectPosId } from './orderTypeSlice';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
const token = parseCookies()['token'];
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const fetchProduct = createAsyncThunk(
    'product/fetchbyid',
    async (_, { getState }) => {
        const pos_id = selectPosId(getState());
        try {
            const response = await axios.get(API_BASE_URL + 'menu/' + pos_id);
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
    productDetail: [],
    total: 0,
    items: [],
    topping: [],
    toppingDetail: [],
    toppingSelected: [],
    productId: '',
    toppingId: '',
}

// Then, handle actions in your reducers:
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setTotal: (state, action) => {
            let price = state.items.map((item) => {
                return item.price * item.quantity
            });
            state.total = price.reduce((a, b) => a + b, 0);
        },
        setProductDetail: (state, action) => {
            state.productDetail = action.payload;
        },
        setToping: (state, action) => {
            state.topping = action.payload;
        },
        addItems: (state, action) => {
            const item = action.payload;
            const existItem = state.items.find((i) => i.id === item.id);
            if (existItem) {
                // Nếu món hàng đã tồn tại, tăng số lượng lên 1
                existItem.quantity++;
            } else {
                // Nếu món hàng chưa tồn tại, thêm vào giỏ hàng với số lượng là 1
                state.items.push({ ...item, quantity: 1 });
            }
        },
        setToppingDetail: (state, action) => {
            state.toppingDetail = action.payload;
        },
        setToppingSelected: (state, action) => {
            state.toppingSelected = [...state.toppingSelected, action.payload];
            // state.storeToppingSelected.push([]);
        },
        setProductId: (state, action) => {
            state.productId = action.payload;
        },
        setStoreToppingSelected: (state, action) => {
            // state.storeToppingSelected[state.storeToppingSelected.length - 1].push(action.payload);
            const topping = action.payload;
            if (state.items.length > 0) {
                state.items.map((item, index) => {
                    if (item.id === state.productId) {
                        if (!state.items[index].topping) {
                            state.items[index].topping = [];
                            // state.items[index].topping.quantity++;
                            state.items[index].topping.push({ topping, quantity: 1 });

                        } else if (state.items[index].topping.find((i) => i.topping.id === topping.id)) {
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
            state.items.map((item, index) => {
                item.topping.map((topping, index) => {
                    if (topping.topping.id === state.toppingId) {
                        state.items[index].topping.details = [];
                        state.items[index].topping.details.push({ toppingDetail, quantity: 1 });
                    }
                })
            });

        },
        resetStateToppingSelected: (state) => {
            state.toppingSelected = initialState.toppingSelected;
        },
        resetState: (state) => {
            // Đặt lại state về giá trị ban đầu
            return initialState;
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

export const { setTotal, setProductDetail, addItems, setToping, setToppingDetail, setToppingSelected, setStoreToppingSelected, resetStateToppingSelected, resetState, setProductId, setToppingId, addToppingDetail } = productSlice.actions;

export default productSlice.reducer;