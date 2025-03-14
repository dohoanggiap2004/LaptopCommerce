import {instanceAxios8000} from "../../config/axiosConfig";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getInstallments = createAsyncThunk('installments/fetchInstallments', async (_, thunkAPI) => {
    try {
        const response = await instanceAxios8000.get('/api/installments');
        return response.data.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getInstallmentsRecommendation = createAsyncThunk('installments/fetchInstallmentsRecommendation', async (payload, thunkAPI) => {
    try {
        const response = await instanceAxios8000.get(`/api/installments/recommended/${payload}`);
        return response.data.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getInstallmentsFilter = createAsyncThunk('installments/fetchInstallmentsFilter', async (payload, thunkAPI) => {
    try {
        const response = await instanceAxios8000.get('/api/installments/filter', {
            params: {
                laptopId: payload.laptopId,
                downPayment: payload.downPayment,
                term: payload.term
            }
        });
        console.log('>> response', response.data.data);
        return response.data.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getInstallmentById = createAsyncThunk('installments/fetchInstallmentById', async (payload, thunkAPI) => {
    try {
        const response = await instanceAxios8000.get(`/api/installments/${payload}`);
        return response.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
})










