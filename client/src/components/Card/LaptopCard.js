import React, {useEffect} from 'react';

function LaptopCard({orderInfo}) {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-md flex justify-center mt-4">
            <div className="w-full max-w-2xl p-4">
                {/* Order Header */}

                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold">Mã đơn hàng: #{orderInfo.orderId}</h2>
                            <span className="text-red-500 font-medium">{orderInfo.status}</span>
                        </div>
                        <span className="text-red-500">Đang vận chuyển</span>
                    </div>


                {/* Product List */}
                    {orderInfo.Laptops.map((laptop, index) => (
                        <div key={index} className="flex items-center mb-4 border-b pb-4 last:border-b-0">
                            <img
                                src={laptop.image}
                                alt={laptop.model}
                                className="w-16 h-16 object-cover mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-sm font-medium">{laptop.model}</h3>
                                <div className="flex items-center space-x-2">
                                    <p className="text-gray-500 line-through">
                                        {formatPrice(laptop.price)}
                                    </p>
                                    <p className="text-red-500 font-semibold">
                                        {formatPrice(laptop.specialPrice)}
                                    </p>
                                </div>
                            </div>
                            <span className="text-gray-600">x1</span>
                        </div>
                    ))}


                {/* Total Payment and Actions */}
                <div className=" flex flex-col items-end">
                    <p className="text-lg font-semibold">
                        Thành tiền: {formatPrice(orderInfo.totalPayment)}
                    </p>
                    <div className="mt-4 flex space-x-4">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            Liên hệ nhân viên
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            Hủy đơn hàng
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Đơn hàng sẽ được xử lý tự động nếu không hủy trước 16:24 - 13/03/2025
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LaptopCard;
