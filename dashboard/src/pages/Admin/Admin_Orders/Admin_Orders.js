import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import ConfirmModal from "../../../components/Admin/Modal/ConfirmModal";
import EditOrderModal from "../../../components/Admin/Modal/EditOrderModal";
import {deleteOrder, getOrders} from "../../../store/actions/orderAction";
import {useDispatch, useSelector} from "react-redux";

export default function Orders() {
    const [orderId, setOrderId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const dispatch = useDispatch();
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    }
    const handleSelected = (value) => {
        setIsDelete(value);
    };

    // delete order by Id
    useEffect(() => {
        if (isDelete) {
            const payload = {
                orderId: orderId
            }
            dispatch(deleteOrder(payload))
            setIsDelete(false)
        }
    }, [isDelete])

    const {orders} = useSelector(state => state.order)

    useEffect(() => {
        console.log('check orderId', orderId)
    }, [orderId])

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    // const orders = [
    //     {
    //         orderId: "DH001",
    //         orderDate: "2024-10-10",
    //         status: "Đang xử lý",
    //         deliveryDate: "2024-10-15",
    //         totalAmount: "5,000,000 VND",
    //     },
    //     {
    //         orderId: "DH002",
    //         orderDate: "2024-10-12",
    //         status: "Đã giao hàng",
    //         deliveryDate: "2024-10-18",
    //         totalAmount: "3,200,000 VND",
    //     },
    //     {
    //         orderId: "DH003",
    //         orderDate: "2024-10-13",
    //         status: "Hủy đơn",
    //         deliveryDate: "Không có",
    //         totalAmount: "0 VND",
    //     },
    //     {
    //         orderId: "DH004",
    //         orderDate: "2024-10-14",
    //         status: "Đang giao hàng",
    //         deliveryDate: "2024-10-20",
    //         totalAmount: "7,500,000 VND",
    //     },
    // ];

    const handleSearch = (value) => {
        console.log(value);
    }
    return (
        <>
            <Sidebar handleSearch={handleSearch}/>
            <div className="px-8 lg:ml-72 mt-16 md:mt-0">
                <div className={'bg-white rounded-2xl shadow-md pb-6'}>
                    <div className="flex py-6 ms-6">
                        <p className="font-semibold text-2xl">Quản lý Đơn Hàng</p>
                    </div>

                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Mã đơn hàng
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trạng thái
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ngày đặt hàng
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ngày giao hàng
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tổng tiền
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Hành động
                                </th>
                            </tr>
                            </thead>
                            {!Array.isArray(orders) || orders.length === 0 ? (
                            <div className={'flex items-center justify-center mt-4 '}>
                                <h1>Không tìm thấy</h1>
                            </div>
                            ) :
                            <tbody>
                            {orders.map((order) => (

                                <tr
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 font-bold "
                                    style={{color: '#242E52'}}
                                    key={order.orderId}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 whitespace-nowrap dark:text-white"
                                    >
                                        {order.orderId}
                                    </th>
                                    <td className="px-6 py-4">{order.status}</td>
                                    <td className="px-6 py-4">{order.orderDate}</td>
                                    <td className="px-6 py-4">{order.completeDate}</td>
                                    <td className="px-6 py-4">{order.totalPayment.toLocaleString('vi-VN')}</td>
                                    <td className="px-6 py-4 flex">
                                        <div className='flex items-center gap-4'>
                                            <EditOrderModal order={order}/>
                                            <a
                                                onClick={() => {
                                                    console.log('1')
                                                    toggleModal()
                                                    setOrderId(order.orderId);
                                                }}
                                                className="font-medium text-red-600 dark:text-blue-500 hover:bg-red-300 border border-red-600 rounded-md p-1 "
                                            >
                                                Xóa
                                            </a>
                                            <ConfirmModal
                                                isOpen={isModalOpen}
                                                toggleModal={() => {
                                                    toggleModal();
                                                }}
                                                handleSelected={handleSelected}
                                                confirmText="Bạn có chắc chắn muốn xóa?"
                                            />
                                        </div>
                                    </td>
                                </tr>

                            ))}
                            </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
