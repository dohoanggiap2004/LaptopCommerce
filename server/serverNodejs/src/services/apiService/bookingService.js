
const { Booking } = require("../../app/models");

const getSlotsService = async (date) => {
    // Tạo danh sách khung giờ từ 09:00 đến 20:00, cách nhau 30 phút
    const timeSlots = [];
    for (let hour = 9; hour <= 20; hour++) {
        const times = [
            `${hour.toString().padStart(2, '0')}:00:00`, // Ví dụ: 09:00:00
            `${hour.toString().padStart(2, '0')}:30:00`, // Ví dụ: 09:30:00
        ];
        timeSlots.push(...times);
    }

    // Lấy các khung giờ đã đặt
    const bookedSlots = await Booking.findAll({
        where: { date },
        attributes: ['time'],
    });

    const bookedTimes = bookedSlots.map(slot => slot.time);
    const slotsWithStatus = timeSlots.map(time => ({
        time,
        is_booked: bookedTimes.includes(time),
    }));

    return slotsWithStatus;
};

// Đặt lịch
const bookSlotService = async ({ userId, date, time }, transaction) => {
    // Kiểm tra xem khung giờ đã được đặt chưa
    const existingBooking = await Booking.findOne({
        where: { date, time },
        lock: true,
        transaction,
    });

    if (existingBooking) {
        throw new Error('Khung giờ đã được đặt');
    }

    // Kiểm tra số lượng đặt lịch của người dùng
    const userBookingsCount = await Booking.count({
        where: { userId, date },
        transaction,
    });

    if (userBookingsCount >= 2) {
        throw new Error('Bạn đã đạt giới hạn tối đa 2 khung giờ đặt lịch trong một ngày, nếu muốn đặt thêm hãy liên' +
            ' hệ trực tiếp qua...');
    }

    // Tạo bản ghi đặt lịch
    const booking = await Booking.create(
        { userId, date, time },
        { transaction }
    );

    return booking;
};

module.exports = { getSlotsService, bookSlotService };
