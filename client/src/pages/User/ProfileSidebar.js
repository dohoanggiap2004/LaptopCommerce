import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {logoutUser} from "../../store/actions/authAction";
import {useDispatch} from "react-redux";
import ConfirmModal from "../../components/Modal/ConfirmModal";

function SidebarLinks() {
    const [activeLink, setActiveLink] = useState('#profile');
    const svgIcons = {
        profile: (
            <svg className="h-5 w-5 fill-current text-black group-hover:text-red-500" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                        d="M3 4.995C3 3.893 3.893 3 4.995 3h14.01C20.107 3 21 3.893 21 4.995v14.01A1.995 1.995 0 0 1 19.005 21H4.995A1.995 1.995 0 0 1 3 19.005V4.995zM6.357 18h11.49a6.992 6.992 0 0 0-5.745-3 6.992 6.992 0 0 0-5.745 3zM12 13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                </g>
            </svg>
        ),
        addresses: (
            <svg className="h-5 w-5 fill-current text-black group-hover:text-red-500" viewBox="0 0 16 16"
                 xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M3.37892 10.2236L8 16L12.6211 10.2236C13.5137 9.10788 14 7.72154 14 6.29266V6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6V6.29266C2 7.72154 2.4863 9.10788 3.37892 10.2236ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"/>
            </svg>
        ),
        order: (
            <svg className="h-5 w-5 fill-current text-black group-hover:text-red-500" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M8.41799 3.25089C8.69867 2.65917 9.30155 2.25 10 2.25H14C14.6984 2.25 15.3013 2.65917 15.582 3.25089C16.2655 3.25586 16.7983 3.28724 17.2738 3.47309C17.842 3.69516 18.3362 4.07266 18.6999 4.56242C19.0668 5.0565 19.2391 5.68979 19.4762 6.56144L20.2181 9.28272L20.4985 10.124C20.5065 10.1339 20.5144 10.1438 20.5222 10.1539C21.4231 11.3076 20.9941 13.0235 20.1362 16.4553C19.5905 18.638 19.3176 19.7293 18.5039 20.3647C17.6901 21.0001 16.5652 21.0001 14.3153 21.0001H9.68462C7.43476 21.0001 6.30983 21.0001 5.49605 20.3647C4.68227 19.7293 4.40943 18.638 3.86376 16.4553C3.00581 13.0235 2.57684 11.3076 3.47767 10.1539C3.48555 10.1438 3.4935 10.1338 3.50152 10.1239L3.7819 9.28271L4.52384 6.56145C4.76092 5.6898 4.93316 5.0565 5.30009 4.56242C5.66381 4.07266 6.15802 3.69516 6.72621 3.4731C7.20175 3.28724 7.73447 3.25586 8.41799 3.25089ZM8.41951 4.75231C7.75763 4.759 7.49204 4.78427 7.27224 4.87018C6.96629 4.98976 6.70018 5.19303 6.50433 5.45674C6.32822 5.69388 6.22488 6.0252 5.93398 7.09206L5.36442 9.18091C6.38451 9.00012 7.77753 9.00012 9.68462 9.00012H14.3153C16.2224 9.00012 17.6155 9.00012 18.6356 9.18092L18.066 7.09206C17.7751 6.0252 17.6718 5.69388 17.4957 5.45674C17.2998 5.19303 17.0337 4.98976 16.7278 4.87018C16.508 4.78427 16.2424 4.759 15.5805 4.75231C15.2992 5.3423 14.6972 5.75 14 5.75H10C9.30281 5.75 8.70084 5.3423 8.41951 4.75231Z"/>
            </svg>
        ),
        view: (
            <svg
                className="h-5 w-5 fill-current text-black group-hover:text-red-500"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"></path>
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z"
                    ></path>
                </g>
            </svg>
        ),
        logout: (
            <svg
                className="h-5 w-5 fill-current text-black group-hover:text-red-500"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z"></path>
                    <path
                        d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z"></path>
                </g>
            </svg>
        )
    };
    const links = [
        {to: '#profile', label: 'Thông tin tài khoản', icon: svgIcons.profile},
        {to: '#addresses', label: 'Sổ địa chỉ', icon: svgIcons.addresses},
        {to: '#orders-tracking', label: 'Quản lý đơn hàng', icon: svgIcons.order},
        {to: '#view-history', label: 'Sản phẩm đã xem', icon: svgIcons.view},
        {to: '#logout', label: 'Đăng xuất', icon: svgIcons.logout}
    ];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogout, setIsLogout] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClick = (to) => {
        setActiveLink(to);
    };

    const handleSelected = (value) => {
        setIsLogout(value);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    useEffect(() => {
        if (isLogout) {
            handleLogout();
        }
    }, [isLogout]);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <div className="mt-4">
            {links.map(link => (
                link.to !== '#logout' ? (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center mb-6 group ${
                            activeLink === link.to ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                        onClick={() => handleClick(link.to)}
                    >
            <span className={`h-5 w-5 ${
                activeLink === link.to ? 'fill-red-500 text-red-500' : 'fill-current text-black group-hover:text-red-500'
            }`}>
              {link.icon}
            </span>
                        <span className="font-bold text-md ms-3">{link.label}</span>
                    </Link>
                ) : (
                    <div
                        key={link.to}
                        className={`flex items-center mb-16 cursor-pointer group ${
                            activeLink === link.to ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                        onClick={() => {
                            toggleModal();
                        }}
                    >
            <span className={`h-5 w-5 ${
                activeLink === link.to ? 'fill-red-500 text-red-500' : 'fill-current text-black group-hover:text-red-500'
            }`}>
              {link.icon}
            </span>
                        <span className="font-bold text-md ms-3">{link.label}</span>
                    </div>
                )
            ))}
            <ConfirmModal
                isOpen={isModalOpen}
                toggleModal={toggleModal}
                handleSelected={handleSelected}
                confirmText={"Bạn có chắc muốn đăng xuất?"}
            />
        </div>
    );
}

export default SidebarLinks;
