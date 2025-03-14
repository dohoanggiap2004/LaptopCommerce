// reducers/productSlice.js
import {createSlice} from '@reduxjs/toolkit';
import { getOrdersInfo, placeOrder} from "../actions/orderAction";

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        ordersInfo: [],
        // order: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            //place order
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                // state.order = action.payload;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getOrdersInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrdersInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.ordersInfo = action.payload;
            })
            .addCase(getOrdersInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default orderSlice.reducer;
