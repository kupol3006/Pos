import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { selectPosId } from './orderTypeSlice';
import { v4 as uuidv4 } from 'uuid';

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

            function generateUniqueId() {
                return uuidv4();
            }
            const idCard = generateUniqueId();
            const existItem = state.items.find((i) => i.idCard === item.idCard);
            // if (existItem) {
            //     // Nếu món hàng đã tồn tại, tăng số lượng lên 1
            //     existItem.quantity++;
            // } else {
            //     // Nếu món hàng chưa tồn tại, thêm vào giỏ hàng với số lượng là 1
            //     state.items.push({ ...item, quantity: 1, idCard: generateUniqueId() });
            // }
            switch (key) {
                case (state.items.length === 0):
                    state.items.push({ ...item, quantity: 1, idCard: idCard });
                    break;
                case (existItem):
                    existItem.quantity++;
                    break;
                default:
                    break;
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
            if (state.items.length > 0) {
                state.items.map((item, index) => {
                    if (item.id === state.productId) {
                        if (!state.items[index].toppingDetail) {
                            state.items[index].toppingDetail = [];
                            // state.items[index].topping.quantity++;
                            state.items[index].toppingDetail.push({ toppingDetail, quantity: 1 });
                        } else if (state.items[index].toppingDetail.find((i) => i.toppingDetail.id === toppingDetail.id)) {
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

export const { setTotal, setProductDetail, addItems, setToping, setToppingDetail, setStoreToppingSelected, resetStateToppingSelected, resetState, setProductId, setToppingId, addToppingDetail } = productSlice.actions;

export default productSlice.reducer;