import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/authSlice.js'
import orderReducer from './slices/orderSlice.js'
import productReducer from './slices/productSlice.js'
import staffReducer from './slices/staffSlice.js'
import tableReducer from './slices/tableSlice.js'
import tableListReducer from './slices/tableListSlice.js'
import tableDetailReducer from './slices/tableDetailSlice.js'
import orderByIdReducer from './slices/orderByIdSlice.js'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        order: orderReducer,
        product: productReducer,
        staff: staffReducer,
        table: tableReducer,
        tableList: tableListReducer,
        tableDetail: tableDetailReducer,
        orderById: orderByIdReducer,
    },
})