import {instanceAxios8000} from "../../config/axiosConfig";
import {createAsyncThunk} from "@reduxjs/toolkit";

// export const getOrders = createAsyncThunk('orders/fetchOrders', async (_, thunkAPI) => {
//     try {
//         const response = await instanceAxios8000.get('/api/orders');
//         console.log(response);
//         return response.data.data;
//     } catch (error) {
//         thunkAPI.rejectWithValue(error.response.data);
//     }
// });
//
// export const getOrderById = createAsyncThunk('orders/fetchOrderById', async (payload, thunkAPI) => {
//     try {
//         const response = await instanceAxios8000.get(`/api/orders/${payload}`);
//         return response.data;
//     }catch (error) {
//         thunkAPI.rejectWithValue(error.response.data);
//     }
// })
//
// export const createOrder = createAsyncThunk('orders/createOrder', async (payload, thunkAPI) => {
//     try {
//         const response = await instanceAxios8000.post('/api/orders', payload);
//         return payload;
//     } catch (error) {
//         thunkAPI.rejectWithValue(error.response.data);
//     }
// })
//
// export const updateOrder = createAsyncThunk('orders/updateOrder', async (payload, thunkAPI) => {
//     try {
//         const response = await instanceAxios8000.put('/api/orders', payload);
//         return payload;
//     } catch (error) {
//         thunkAPI.rejectWithValue(error.response.data);
//     }
// })
//
// export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (payload, thunkAPI) => {
//     try {
//         const response = await instanceAxios8000.delete('/api/orders', {data: payload});
//         return payload;
//     } catch (error) {
//         thunkAPI.rejectWithValue(error.response.data);
//     }
// })

export const placeOrder = createAsyncThunk('orders/placeOrder', async (payload, thunkAPI) => {
    try {
        const response = await instanceAxios8000.post('/api/orders/place-order', payload);
        return response.data.newOrder.newOrder;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getOrdersInfo = createAsyncThunk('orders/getOrdersInfo', async (payload, thunkAPI) => {
    try {
        const response = await instanceAxios8000.get(`/api/orders/tracking/${payload.userId}`);
        return response.data.ordersInfo;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
})





