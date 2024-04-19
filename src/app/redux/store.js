import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/authSlice.js'
import orderReducer from './slices/orderSlice.js'
import productReducer from './slices/productSlice.js'
import orderTypeReducer from './slices/orderTypeSlice.js'
import staffReducer from './slices/staffSlice.js'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        order: orderReducer,
        product: productReducer,
        orderType: orderTypeReducer,
        staff: staffReducer,
    },
})