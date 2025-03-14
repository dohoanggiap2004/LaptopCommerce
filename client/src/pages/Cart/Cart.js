import {Link, useLocation} from "react-router-dom";
import Layout from "../../layout/Layout";
import "./style.css";
import {useState, useEffect,} from "react";
import {removeItem, clearCart, updateQuantity} from '../../store/actions/cartAction'
import {useDispatch, useSelector} from "react-redux";
import {instanceAxios8000} from "../../config/axiosConfig";
import {placeOrder} from "../../store/actions/orderAction";
import {sendMail} from "../../store/actions/mailAction";
import axios from "axios";
import {useUserIdFromToken} from "../../Utils/User";

const Cart = () => {
    const {cart} = useSelector(state => state.cart);
    const {userId, error: tokenError} = useUserIdFromToken();
    const {order, error} = useSelector(state => state.order)
    const [currentStep, setCurrentStep] = useState(1);
    const dispatch = useDispatch()
    const location = useLocation();
    const [totalPayment, setTotalPayment] = useState(0)
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [data, setData] = useState([]);
    const section = location.hash || '#cart'
    const [formData, setFormData] = useState({
        email: "",
        fullname: '',
        phoneNumber: "",
        province: "",
        district: "",
        ward: "",
        addressDetail: "",
        paymentMethod: "",
        shippingMethod: "",
    });

    useEffect(() => {
        switch (section) {
            case '#cart':
                setCurrentStep(1)
                break
            case '#checkout-info':
                setCurrentStep(2)
                break
            case '#payment':
                setCurrentStep(3)
                break
            case '#complete':
                setCurrentStep(4)
                break
        }
    }, [section])

    useEffect(() => {
        let total = 0
        cart.map(laptop => {
            total += laptop.specialPrice !== 0 ? laptop.specialPrice * laptop.quantity : laptop.price * laptop.quantity;
        })
        total += 35000
        setTotalPayment(total)
    }, [cart])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        const orderInfo = {
            orderDate: new Date().toISOString().split('T')[0],
            status: 'Đang xử lí ',
            orderNote: '',
            orderAddress: `${formData.addressDetail}, ${formData.ward}, ${formData.district}, ${formData.province}`,
            phoneNumber: formData.phoneNumber,
            paymentMethod: formData.paymentMethod,
            shippingMethod: formData.shippingMethod,
            totalPayment: totalPayment,
            userId: userId,
        }
        const productsInfo = cart.map(laptop => (
            {
                laptopId: laptop.laptopId,
                quantity: laptop.quantity,
                specialPrice: laptop.specialPrice,
                price: laptop.price,
                model: laptop.model
            }
        ))
        const payload = {
            orderInfo: orderInfo,
            productsInfo: productsInfo
        }

        const actionResult = await dispatch(placeOrder(payload)).unwrap(); // unwrap() để lấy kết quả từ thunk
        const orderId = actionResult.orderId;

        error ? alert(error.message) : alert('Đặt hàng thành công, vui lòng check email của bạn!')

        try {
            const reqData = {
                orderId: orderId,
                amount: totalPayment,
                productsInfo: productsInfo
            }

            const res = await instanceAxios8000.post('/api/payos/create-payment-link', reqData);

            const checkoutUrl = res.data.checkoutUrl || res.data.data?.checkoutUrl;
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            } else {
                console.error("Không tìm thấy checkoutUrl");
            }
        } catch (error) {
            console.error("Lỗi:", error.message);
            if (error.response) {
                console.error("Chi tiết lỗi từ server:", error.response.data);
            }
        }
    };

    // useEffect(() => {
    //     const orderInfo = {
    //         orderDate: new Date().toISOString().split('T')[0],
    //         status: 'Đang xử lí ',
    //         orderNote: '',
    //         orderAddress: `${formData.addressDetail}, ${formData.ward}, ${formData.district}, ${formData.province}`,
    //         phoneNumber: formData.phoneNumber,
    //         paymentMethod: formData.paymentMethod,
    //         shippingMethod: formData.shippingMethod,
    //         totalPayment: totalPayment,
    //         orderId: order.orderId,
    //         fullname: formData.fullname
    //     }
    //
    //     const payloadMail = {
    //         orderInfo: orderInfo,
    //         productsInfo: cart,
    //         email: formData.email
    //     }
    //     // console.log('check mail ', payloadMail)
    //     dispatch(sendMail(payloadMail))
    // }, [order])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    "https://provinces.open-api.vn/api/?depth=2"
                );
                const data = await response.json();
                setData(data);
                const provinces = data.map((item) => (
                    {
                        name: item.name,
                    }
                ));
                setProvince(provinces);
                console.log(provinces);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    useEffect(() => {
        const getData = async () => {
            try {
                const prov = data.find((item) => item.name === formData.province);
                console.log(prov);
                const districts = prov.districts.map((item) => (
                    {
                        name: item.name,
                    }
                ));
                setDistrict(districts);
                console.log(districts);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [formData.province]);

    const handleQuantityChange = (e, laptopId) => {
        const newQuantity = parseInt(e.target.value);
        dispatch(updateQuantity({laptopId, newQuantity}));
    };
    const handlePayment = async (event) => {
        event.preventDefault();
        try {
            console.log("Gửi yêu cầu với dữ liệu:", formData);
            const res = await axios.post(
                'http://localhost:8000/api/payos/create-payment-link',
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Phản hồi:", res.data);
            const checkoutUrl = res.data.checkoutUrl || res.data.data?.checkoutUrl;
            if (checkoutUrl) {
                console.log("Chuyển hướng tới:", checkoutUrl);
                window.location.href = checkoutUrl;
            } else {
                console.error("Không tìm thấy checkoutUrl");
            }
        } catch (error) {
            console.error("Lỗi:", error.message);
            if (error.response) {
                console.error("Chi tiết lỗi từ server:", error.response.data);
            }
        }
    };

    const steps = [
        {id: 1, name: 'Giỏ hàng', icon: 'cart', path: '#cart'},
        {id: 2, name: 'Thông tin', icon: 'info', path: '#checkout-info'},
        {id: 3, name: 'Thanh toán', icon: 'payment', path: '#payment'},
        {id: 4, name: 'Hoàn tất', icon: 'check', path: '#complete'},
    ];
    const renderSection = () => {
        switch (section) {
            case
            '#cart':
                return (
                    <div>
                        <div className={'mx-6'}>
                            {cart.map((laptop) => (
                                <div
                                    key={laptop.laptopId}
                                    className="flex py-4 border-t border-gray-200"
                                >
                                    {/* Phần hình ảnh và nút xóa */}
                                    <div className="w-1/6 flex flex-col items-center">
                                        <img
                                            src={laptop.image}
                                            alt={laptop.model}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <button
                                            onClick={() => dispatch(removeItem(laptop.laptopId))}
                                            className="mt-2 text-xs text-red-500 underline"
                                        >
                                            Xóa
                                        </button>
                                    </div>

                                    {/* Phần thông tin sản phẩm */}
                                    <div className="w-3/6 pl-4 flex flex-col justify-between">
                                        <p className="text-sm font-bold text-gray-800">{laptop.model}</p>
                                        {laptop.description && (
                                            <p className="text-xs text-gray-600">{laptop.description}</p>
                                        )}
                                    </div>

                                    {/* Phần giá và số lượng */}
                                    <div className="w-2/6 flex flex-col items-end space-y-2">
                                        {/* Phần giá */}
                                        <div className="flex flex-col items-end">
                                            <p className="text-sm font-medium text-red-600">
                                                {(
                                                    laptop.specialPrice && laptop.specialPrice !== 0
                                                        ? laptop.specialPrice
                                                        : laptop.price
                                                ).toLocaleString('vi-VN')}đ
                                            </p>
                                            <p className="text-xs text-gray-500 line-through">
                                                {laptop.price.toLocaleString('vi-VN')}đ
                                            </p>
                                        </div>

                                        {/* Phần số lượng */}
                                        <div className="flex justify-end items-center space-x-2">
                                            <select
                                                aria-label="Select quantity"
                                                value={laptop.quantity}
                                                onChange={(e) => handleQuantityChange(e, laptop.laptopId)}
                                                className="py-1 px-2 border border-gray-200 focus:outline-none w-12 text-center"
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {
                            cart.length !== 0 ? (
                                <div className={'mx-4'}>
                                    <button
                                        onClick={() => dispatch(clearCart())}
                                        className="flex font-semibold text-red-700 text-sm mt-4 mx-6"
                                    >
                                        Xóa toàn bộ giỏ hàng
                                    </button>
                                    <div className="mt-6 border-t pt-4">
                                        <div className="flex justify-between">
                                            <p className="text-sm text-gray-700">Phí vận chuyển:</p>
                                            <p className="text-sm text-gray-700">35.000đ</p>
                                        </div>
                                        <div className="flex justify-between mt-2 font-bold text-lg">
                                            <p className="text-gray-800">Tổng tiền:</p>
                                            <p className="text-red-600">
                                                {(
                                                    totalPayment
                                                ).toLocaleString('vi-VN')}đ
                                            </p>
                                        </div>
                                    </div>
                                    <Link to={'#checkout-info'}>
                                        <button
                                            className="w-full bg-red-500 text-white py-3 mt-4 rounded font-semibold ">ĐẶT
                                            HÀNG
                                            NGAY
                                        </button>
                                    </Link>

                                </div>
                            ) : (
                                <Link
                                    to="/"
                                    className="flex font-semibold text-indigo-600 text-sm mt-10"
                                >
                                    <svg
                                        className="fill-current mr-2 text-indigo-600 w-4"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/>
                                    </svg>
                                    Giỏ hàng trống, click vào đây để tiếp tục mua hàng
                                </Link>
                            )
                        }
                    </div>
                )
            case '#checkout-info':
                return (
                    <div
                        id="summary"
                        className="w-full px-4 py-4 bg-white col-span-12"
                    >
                        <form onSubmit={handlePlaceOrder}>
                            <div className="">
                                <div className="w-full mx-auto">
                                    <div className="mb-6">
                                        <h2 className=" font-semibold text-gray-700 dark:text-white mb-2">
                                            Thông tin khách mua hàng
                                        </h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-gray-700 dark:text-white mb-1"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="phoneNumber"
                                                    className="block text-gray-700 dark:text-white mb-1"
                                                >
                                                    Điện thoại
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                                    value={formData.phoneNumber}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <label
                                                htmlFor="fullname"
                                                className="block text-gray-700 dark:text-white mb-1"
                                            >
                                                Họ và tên
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                id="fullname"
                                                name="fullname"
                                                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                                value={formData.fullname}
                                                onChange={handleChange}
                                            />
                                        </div>


                                        <div>
                                            <h2 className=" font-semibold text-gray-700 dark:text-white mt-4">
                                                Chọn cách nhận hàng
                                            </h2>
                                            <div className="overflow-y-auto  min-h-[100px]">
                                                <div className="grid grid-cols-2 ">
                                                    <label
                                                        className="flex bg-white text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                        <input
                                                            required
                                                            type="radio"
                                                            name="shippingMethod"
                                                            value="Giao hàng nhanh tận nơi"
                                                            onChange={handleChange}

                                                        />
                                                        <i className="pl-2">Giao hàng nhanh tận nơi</i>
                                                    </label>
                                                    <label
                                                        className="flex bg-white text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                        <input
                                                            required
                                                            type="radio"
                                                            name="shippingMethod"
                                                            value="Giao hàng hỏa tốc"
                                                            onChange={handleChange}

                                                        />
                                                        <i className="pl-2">Giao hàng nhanh hỏa tốc</i>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'-mt-6 p-2 bg-gray-100'}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <select
                                                        className="block w-full text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none"
                                                        name="province"
                                                        value={formData.province}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Chọn tỉnh</option>
                                                        {province.map((prov) => (
                                                            <option value={prov.name}>{prov.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <select
                                                        className="block w-full text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none"
                                                        name="district"
                                                        value={formData.district}
                                                        required
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Chọn quận/huyện</option>
                                                        {district.map((dis) => (
                                                            <option value={dis.name}>{dis.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <div>
                                                    <input
                                                        required
                                                        type="text"
                                                        id="ward"
                                                        name="ward"
                                                        placeholder={'Điền thông tin xã'}
                                                        className="w-full rounded-lg border py-1.5 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                                        value={formData.ward}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        required
                                                        type="text"
                                                        id="addressDetail"
                                                        name="addressDetail"
                                                        className="w-full rounded-lg border py-1.5 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                                                        value={formData.addressDetail}
                                                        onChange={handleChange}
                                                        placeholder={'Địa chỉ chi tiết'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                        <div className="mt-6 border-t pt-4">
                            <div className="flex justify-between">
                                <p className="text-sm text-gray-700">Phí vận chuyển:</p>
                                <p className="text-sm text-gray-700">35.000đ</p>
                            </div>
                            <div className="flex justify-between mt-2 font-bold text-lg">
                                <p className="text-gray-800">Tổng tiền:</p>
                                <p className="text-red-600">
                                    {(
                                        totalPayment
                                    ).toLocaleString('vi-VN')}đ
                                </p>
                            </div>
                        </div>
                        <div className="border-t mt-8">
                            <Link to={'#payment'}>
                                <button
                                    className="w-full bg-red-500 text-white py-3 mt-4 rounded font-semibold ">ĐẶT
                                    HÀNG
                                    NGAY
                                </button>
                            </Link>
                        </div>
                    </div>
                )

            case '#payment':
                return (
                    <div className="w-full px-4 py-4 bg-white col-span-12">
                        <div>
                            {/* Tiêu đề */}
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin đặt hàng</h2>

                            {/* Thông tin khách hàng */}
                            <div className="mb-4 space-y-2">
                                <div className="flex">
                                    <span
                                        className="text-gray-600 text-sm font-bold w-28 sm:w-40 shrink-0">Khách hàng:</span>
                                    <span className="text-gray-800 text-sm font-bold break-words overflow-hidden ms-2">
      {formData.fullname}
    </span>
                                </div>
                                <div className="flex">
                                    <span className="text-gray-600 text-sm font-bold w-28 sm:w-40 shrink-0">Số điện thoại:</span>
                                    <span className="text-gray-800 text-sm font-bold break-words overflow-hidden ms-2">
      {formData.phoneNumber}
    </span>
                                </div>
                                <div className="flex">
                                    <span
                                        className="text-gray-600 text-sm font-bold w-28 sm:w-40 shrink-0">Email:</span>
                                    <span className="text-gray-800 text-sm font-bold break-words overflow-hidden ms-2">
      {formData.email}
    </span>
                                </div>
                                <div className="flex">
                                    <span className="text-gray-600 text-sm font-bold w-28 sm:w-40 shrink-0">Địa chỉ nhận hàng:</span>
                                    <span
                                        className="text-gray-800 text-sm font-bold break-all max-w-[150px] sm:max-w-xs ms-2">
      {`${formData.addressDetail} ${formData.ward} ${formData.district} ${formData.province}`}
    </span>
                                </div>
                            </div>

                            {/* Đường phân cách */}
                            <div className="border-t border-gray-200 my-4"></div>

                            {/* Nút "SỬ DỤNG MÃ GIẢM GIÁ" */}
                            <button className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06-.02L10 10.94l3.71-3.75a.75.75 0 111.06 1.06l-4.25 4.3a.75.75 0 01-1.06 0l-4.25-4.3a.75.75 0 01-.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                SỬ DỤNG MÃ GIẢM GIÁ
                            </button>
                            <div className="mt-4 mb-8 flex">
                                <input
                                    type="text"
                                    id="promo"
                                    name="promo"
                                    placeholder="Nhập mã giảm giá"
                                    className="p-2 text-sm w-full border-2 "
                                />
                                <button
                                    className="bg-red-500 hover:bg-red-600 p-2 text-sm text-white uppercase min-w-20">
                                    Áp dụng
                                </button>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mt-2">
                                    Phương thức thanh toán
                                </h2>
                                <div className="overflow-y-auto  min-h-[100px]">
                                    <div className="block mb-4">
                                        <label
                                            className="flex bg-white text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                            <input
                                                required
                                                type="radio"
                                                name="paymentMethod"
                                                value="Thanh toán khi nhận hàng"
                                                onChange={handleChange}

                                            />
                                            <i className="pl-2">Thanh toán khi nhận hàng</i>
                                        </label>
                                        <label
                                            className="flex bg-white text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                            <input
                                                required
                                                type="radio"
                                                name="paymentMethod"
                                                value="Thanh toán online thông qua mã QR"
                                                onChange={handleChange}

                                            />
                                            <i className="pl-2">Thanh toán online thông qua mã QR</i>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t pt-4">
                            <div className="flex justify-between">
                                <p className="text-sm text-gray-700">Phí vận chuyển:</p>
                                <p className="text-sm text-gray-700">35.000đ</p>
                            </div>
                            <div className="flex justify-between mt-2 font-bold text-lg">
                                <p className="text-gray-800">Tổng tiền:</p>
                                <p className="text-red-600">
                                    {(
                                        totalPayment
                                    ).toLocaleString('vi-VN')}đ
                                </p>
                            </div>
                        </div>
                        <div className="border-t mt-8">
                            {formData.paymentMethod === "Thanh toán khi nhận hàng" ? (
                                <Link to={'#complete'}>
                                    <button
                                        className="w-full bg-red-500 text-white py-3 mt-4 rounded font-semibold"
                                    >ĐẶT
                                        HÀNG
                                        NGAY
                                    </button>
                                </Link>
                            ) : (
                                <form onSubmit={(e) => {
                                    handlePlaceOrder(e)
                                }}>
                                    <button
                                        className="w-full bg-red-500 text-white py-3 mt-4 rounded font-semibold"
                                        type={"submit"}>ĐẶT
                                        HÀNG
                                        NGAY
                                    </button>
                                </form>
                            )}


                        </div>
                    </div>
                )
            case '#complete':
                return (
                    <div
                        className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                        <div
                            className="w-full max-w-2xl p-12 mx-4 text-center transition-all transform bg-white shadow-lg rounded-xl hover:shadow-xl">

                            <div
                                className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full">
                                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>

                            <h1 className="mb-6 text-4xl font-extrabold text-green-600">
                                Đặt hàng thành công!
                            </h1>

                            <p className="mb-8 text-xl text-gray-700">
                                Cảm ơn bạn đã đặt hàng tại cửa hàng chúng tôi.
                            </p>

                            <div className="pt-8 mt-8 border-t border-gray-100">
                                <p className="text-lg text-gray-700">
                                    Nếu có bất kì câu hỏi nào, hãy liên hệ:
                                </p>
                            </div>

                            <div className="mt-12">
                                <a href="http://127.0.0.1:8000"
                                   className="inline-block px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 bg-green-600 rounded-lg hover:bg-green-700">
                                    Quay lại trang chủ
                                </a>
                            </div>
                        </div>
                    </div>
                )
        }
    }
    return (
        <>
            <Layout>
                <div className="container mx-auto mt-24 rounded-xl shadow-md mb-6 w-full my-10">
                    <div className="flex justify-start sm:max-w-[570px] mx-auto">
                        {section === '#cart' &&
                            <Link
                                to="/"
                                className="flex font-semibold text-indigo-600 text-sm mt-4 pb-2"
                            >
                                <svg
                                    className="fill-current mr-2 text-indigo-600 w-4"
                                    viewBox="0 0 448 512"
                                >
                                    <path
                                        d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/>
                                </svg>
                                Tiếp tục mua hàng
                            </Link>
                        }
                        {section === '#checkout-info' &&
                            <Link
                                to="#cart"
                                className="flex font-semibold text-indigo-600 text-sm mt-4 pb-2"
                            >
                                <svg
                                    className="fill-current mr-2 text-indigo-600 w-4"
                                    viewBox="0 0 448 512"
                                >
                                    <path
                                        d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/>
                                </svg>
                                Trở về
                            </Link>
                        }
                        {section === '#payment' &&
                            <Link
                                to="#checkout-info"
                                className="flex font-semibold text-indigo-600 text-sm mt-4 pb-2"
                            >
                                <svg
                                    className="fill-current mr-2 text-indigo-600 w-4"
                                    viewBox="0 0 448 512"
                                >
                                    <path
                                        d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/>
                                </svg>
                                Trở về
                            </Link>
                        }
                    </div>

                    <div className="mx-auto flex justify-center">
                        <div className="bg-white px-2 py-2 mx-auto sm:min-w-[570px] mb-8">
                            <div className="bg-red-100 p-2 rounded-t flex justify-center gap-8 items-center pt-4">
                                {steps.map((step, index) => (
                                    <div key={step.id} className="flex-1 flex flex-col items-center relative"
                                    >

                                            <div
                                                className={`w-8 h-8 flex items-center justify-center rounded-full z-10 ${
                                                    currentStep >= step.id
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-gray-300 text-gray-600'
                                                }`}
                                            >
                                                {step.icon === 'cart' && (
                                                    <svg viewBox="0 0 24 24" className={'w-5 h-5'} fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                           stroke-linejoin="round"></g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            <path
                                                                d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11M4 7H20M4 7V13C4 19.3668 5.12797 20.5 12 20.5C18.872 20.5 20 19.3668 20 13V7M4 7L5.44721 4.10557C5.786 3.428 6.47852 3 7.23607 3H16.7639C17.5215 3 18.214 3.428 18.5528 4.10557L20 7"
                                                                stroke="#FFFFFF" stroke-width="1.5"
                                                                stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </g>
                                                    </svg>
                                                )}
                                                {step.icon === 'info' && (
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                                                    </svg>
                                                )}
                                                {step.icon === 'payment' && (
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zm-10-7h8v2h-8v-2zm0 4h8v2h-8v-2zm-4-4h2v2H6v-2zm0 4h2v2H6v-2z"/>
                                                    </svg>
                                                )}
                                                {step.icon === 'check' && (
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                                    </svg>
                                                )}


                                            </div>
                                            <div
                                                className={`min-h-10 md:min-h-8 text-sm text-center font-semibold mt-2 ${
                                                    currentStep >= step.id ? 'text-red-500' : 'text-gray-500'
                                                }`}
                                            >
                                                {step.name}
                                            </div>
                                        {index < steps.length - 1 && (
                                            <div
                                                className="absolute top-4 left-[65%] w-full"
                                                style={{

                                                }}
                                            >
                                                <div
                                                    className={`border-t border-dashed ${currentStep >= step.id ? 'border-red-600' : 'border-gray-800'}  w-full`}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {renderSection()}


                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
        ;
};

export default Cart;
