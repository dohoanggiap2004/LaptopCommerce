import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersInfo} from "../../store/actions/orderAction";
import LaptopCard from "../Card/LaptopCard";

function TrackingOrder(userId) {
    const {ordersInfo} = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrders = async () => {
            await dispatch(getOrdersInfo(userId));
        };

        fetchOrders();
        // dispatch(getOrdersInfo(userId));

    }, [userId]);
    useEffect(() => {
        console.log('checkorrderinfo', ordersInfo)

    }, [ordersInfo]);

    const handleClick = (value) => {
        switch (value) {
            case 'all':
                dispatch(getOrdersInfo(userId))
                break
            default:
                break
        }
    }

    const [activeButton, setActiveButton] = useState('TẤT CẢ');

    const buttons = [
        'TẤT CẢ',
        'ĐANG XỬ LÝ',
        'ĐANG VẬN CHUYỂN',
        'HOÀN THÀNH',
        'HỦY'
    ];


    return (
        <div className="min-h-screen flex flex-col items-center">
            {/* Navigation Bar */}
            <div className="w-full max-w-4xl mt-4">
                <div className="flex justify-between">
                    {buttons.map((buttonLabel) => (
                        <button
                            key={buttonLabel}
                            onClick={() => setActiveButton(buttonLabel)}
                            className={`pb-2 font-bold ${
                                activeButton === buttonLabel
                                    ? 'border-b-2 border-red-500 text-red-500'
                                    : 'text-gray-600 hover:text-red-500'
                            }`}
                        >
                            {buttonLabel}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="mt-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm đơn hàng theo Mã đơn hàng"
                            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                </div>
                {!Array.isArray(ordersInfo) || ordersInfo.length === 0 ? (
                    <>
                        {/* Error Message with Icon */}
                        <div className="mt-16 flex flex-col items-center">
                            <div className="relative">
                                <svg
                                    className="w-16 h-16 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    ></path>
                                </svg>
                                <svg
                                    className="absolute bottom-0 right-0 w-6 h-6 text-red-500 bg-white rounded-full p-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </div>
                            <p className="mt-4 text-gray-600">Quý khách chưa có đơn hàng nào.</p>
                        </div>

                        {/* Continue Shopping Button */}
                        <div className="mt-6 flex justify-center">
                            <Link to={'/'} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
                                TIẾP TỤC MUA HÀNG
                            </Link>
                        </div>
                    </>
                ) : <>
                {ordersInfo.map((order, index) => (
                    <LaptopCard orderInfo={order}/>
                ))}
                </>}
            </div>
        </div>
    );
}

export default TrackingOrder;
