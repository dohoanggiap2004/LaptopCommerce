// reducers/productSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
    getInstallments,
    getInstallmentById,
    getInstallmentsFilter,
    getInstallmentsRecommendation,

} from "../actions/installmentAction";

const installmentSlice = createSlice({
    initialState: {
        installments: [],
        installmentsFilter: [],
        loading: false,
        error: null,
    },
    name: 'installments',
    extraReducers: (builder) => {
        builder
            // get installments
            .addCase(getInstallments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInstallments.fulfilled, (state, action) => {
                state.loading = false;
                state.installments = action.payload;
            })
            .addCase(getInstallments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get installments recommendation
            .addCase(getInstallmentsRecommendation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInstallmentsRecommendation.fulfilled, (state, action) => {
                state.loading = false;
                state.installments = action.payload;
            })
            .addCase(getInstallmentsRecommendation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get installments filter
            .addCase(getInstallmentsFilter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInstallmentsFilter.fulfilled, (state, action) => {
                state.loading = false;
                state.installmentsFilter = action.payload;
            })
            .addCase(getInstallmentsFilter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get installment by id
            .addCase(getInstallmentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInstallmentById.fulfilled, (state, action) => {
                state.loading = false;
                state.installments = action.payload;
            })
            .addCase(getInstallmentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
});

export default installmentSlice.reducer;
