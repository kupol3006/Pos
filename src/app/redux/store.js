import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/authSlice.js'
import orderReducer from './slices/orderSlice.js'
import productReducer from './slices/productSlice.js'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        order: orderReducer,
        product: productReducer,
    },
})