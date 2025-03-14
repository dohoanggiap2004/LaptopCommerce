import { createSlice } from '@reduxjs/toolkit';
import { bookSlot, getSlots } from '../actions/bookingAction';

// Hàm lấy ngày hiện tại theo định dạng YYYY-MM-DD
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Ví dụ: "2025-03-08"
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        slots: [],
        selectedDate: getCurrentDate(), // Đặt ngày mặc định là ngày hiện tại
        loading: false,
        loadingBook: false,
        errorBook: null,
        error: null,
    },
    reducers: {
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Lấy danh sách khung giờ
        builder
            .addCase(getSlots.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSlots.fulfilled, (state, action) => {
                state.loading = false;
                state.slots = action.payload;
            })
            .addCase(getSlots.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Đặt lịch
            .addCase(bookSlot.pending, (state) => {
                state.loadingBook = true;
                state.errorBook = null;
            })
            .addCase(bookSlot.fulfilled, (state, action) => {
                state.loadingBook = false;
                // Lấy time từ meta.arg (payload ban đầu của bookSlot)
                const { time } = action.meta.arg;
                state.slots = state.slots.map(slot =>
                    slot.time === time ? { ...slot, is_booked: true } : slot
                );
            })
            .addCase(bookSlot.rejected, (state, action) => {
                state.loadingBook = false;
                state.errorBook = action.payload;
            });
    },
});

export const { setSelectedDate } = bookingSlice.actions;
export default bookingSlice.reducer;
