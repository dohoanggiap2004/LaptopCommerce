import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceAxios8000 } from '../../config/axiosConfig';

// Lấy danh sách khung giờ
export const getSlots = createAsyncThunk('booking/getSlots', async (date, thunkAPI) => {
    try {
        const response = await instanceAxios8000.get(`api/booking/slots/${date}`);
        return response.data.data; // Trả về mảng slots từ API
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch slots');
    }
});

// Đặt lịch
export const bookSlot = createAsyncThunk('booking/bookSlot', async (payload, thunkAPI) => {
    const { userId, date, time } = payload;
    try {
        const response = await instanceAxios8000.post('api/booking', { userId, date, time });
        return response.data; // Trả về kết quả đặt lịch
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to book slot');
    }
});
