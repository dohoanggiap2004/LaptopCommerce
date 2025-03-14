const {
    getSlotsService, bookSlotService
} = require("../../../services/apiService/bookingService");
const { sequelize } = require('../../models/Index')
class BookingController {
    async getSlots(req, res) {
        try {
            if (!req?.params?.date) {
                return res.status(400).json({ message: 'Date is required' });
            }

            const date = req.params.date;
            const slots = await getSlotsService(date);

            if (!slots || slots.length === 0) {
                return res.status(200).json({ message: 'No slots available' });
            }

            res.status(200).json({
                data: slots,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Đặt lịch
    async bookSlot(req, res) {
        try {
            if (!req?.body) {
                return res.status(400).json({ message: 'Booking information is required' });
            }

            const { userId, date, time } = req.body;

            if (!userId || !date || !time) {
                return res.status(400).json({ message: 'userId, date, and time are required' });
            }

            const result = await sequelize.transaction(async (t) => {
                const booking = await bookSlotService({ userId, date, time }, t);
                return booking;
            });

            res.status(201).json({
                message: 'Đặt lịch thành công',
                bookingId: result.bookingId,
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new BookingController();
