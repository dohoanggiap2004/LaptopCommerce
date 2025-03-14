import Layout from "../../layout/Layout";
import './style.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getSlots, bookSlot,} from '../../store/actions/bookingAction'
import {setSelectedDate} from "../../store/reducers/bookingReducer";
import {useUserIdFromToken} from "../../Utils/User";

// Hàm lấy ngày hiện tại theo định dạng YYYY-MM-DD
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function Booking() {
    const dispatch = useDispatch();
    const {userId} = useUserIdFromToken()
    const [timeSelected, setTimeSelected] = useState(null);
    let {slots, selectedDate, loadingBook, errorBook, loading, error} = useSelector((state) => state.booking);

    // Trạng thái theo dõi đặt lịch thành công
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // Kiểm tra ngày hợp lệ
    const currentDate = getCurrentDate();
    const isDateValid = selectedDate >= currentDate;

    useEffect(() => {
        errorBook = ''
    }, [])

    useEffect(() => {
        // Chỉ gọi API nếu ngày hợp lệ (từ ngày hiện tại trở đi)
        if (isDateValid) {
            dispatch(getSlots(selectedDate));
        }
    }, [dispatch, selectedDate, isDateValid]);

    const handleDateChange = (e) => {
        dispatch(setSelectedDate(e.target.value));
    };

    const handleBook = () => {
        const time = timeSelected
        dispatch(bookSlot({userId, date: selectedDate, time})).then((result) => {
            if (bookSlot.fulfilled.match(result)) {
                setBookingSuccess(true); // Đặt lịch thành công
            }
        });
    };

    const handleSelectedTime = (time) => {
        setTimeSelected(time);
    }

    useEffect(() => {
        if (!loadingBook && !errorBook && bookingSuccess) {
            alert('Đặt lịch thành công');
            setBookingSuccess(false); // Reset trạng thái sau khi hiển thị alert
        }
    }, [loadingBook, errorBook, bookingSuccess]);

    return (
        <Layout>
            <div className="min-h-screen bg-white text-white p-6 mt-24">
                <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
                    Ngày đặt lịch <span className="text-red-500 ml-2">★</span>
                </h2>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={currentDate} // Giới hạn ngày nhỏ nhất là ngày hiện tại
                    className="w-full max-w-md p-2 mb-6 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-blue-500 border-2"
                />
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                    Chọn khung giờ dịch vụ <span className="text-red-500 ml-2">★</span>
                </h3>
                {loading && <p className="text-yellow-500 ">Đang tải...</p>}
                {errorBook && <p className="text-red-500">{errorBook}</p>}
                {!isDateValid && (
                    <p className="text-red-500 mb-8">
                        Không thể đặt lịch cho các ngày trước ngày hiện tại ({currentDate}).
                    </p>
                )}
                <div className="grid grid-cols-4 gap-4 max-w-4xl text-gray-900">
                    {isDateValid && slots.length > 0 ? (
                        slots.map((slot) => (
                            <button
                                key={slot.time}
                                onClick={() => !slot.is_booked && handleSelectedTime(slot.time)}
                                disabled={slot.is_booked || loading}
                                className={`p-3 rounded-md text-black font-medium transition-colors border-blue-500 border-2 ${
                                    slot.is_booked
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : timeSelected === slot.time
                                            ? 'bg-black text-white'
                                            : 'bg-white text-black hover:bg-gray-200'
                                }`}
                            >
                                {slot.time.slice(0, 5)}
                            </button>
                        ))
                    ) : (
                        isDateValid && <p className="text-gray-400">Không có khung giờ nào khả dụng.</p>
                    )}
                </div>

                <div className={'mt-6 '}>
                    <button
                        className={" px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600" +
                            " rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none" +
                            " focus:ring"} onClick={handleBook}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </Layout>
    );
}
