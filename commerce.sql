SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
--
-- Database: `commercials`
--
DROP DATABASE IF EXISTS commerce; 
CREATE DATABASE commerce;          
USE commerce;
-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brandId` bigint(20) NOT NULL,
  `brandName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `installment_plans`
--

CREATE TABLE `installments` (
  `installmentId` int NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `downPayment` varchar(255) DEFAULT NULL,
  `flatInterestRate` varchar(255) DEFAULT NULL,
  `installmentPrice` int(11) DEFAULT NULL,
  `monthlyInstallment` int(11) DEFAULT NULL,
  `requiredDocuments` varchar(255) DEFAULT NULL,
  `term` varchar(255) DEFAULT NULL,
  `totalPayment` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Table structure for table `laptops`
--

CREATE TABLE `laptops` (
  `laptopId` char(36) NOT NULL,
  `battery` varchar(255) DEFAULT NULL,
  `cpu` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `frameRate` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `ram` varchar(255) DEFAULT NULL,
  `resolution` varchar(255) DEFAULT NULL,
  `screenSize` varchar(255) DEFAULT NULL,
  `stockAvailable` int(11) DEFAULT NULL,
  `storage` varchar(255) DEFAULT NULL,
  `vga` varchar(255) DEFAULT NULL,
  `webcam` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `specialPrice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` bigint(20) NOT NULL,
  `completeDate` datetime(6) DEFAULT NULL,
  `orderAddress` varchar(255) DEFAULT NULL,
  `orderDate` datetime(6) DEFAULT NULL,
  `orderNote` varchar(255) DEFAULT NULL,
  `paymentMethod` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `shippingMethod` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `totalPayment` int(11) DEFAULT NULL,
  `userId` char(36) DEFAULT NULL,
  `voucherId` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `orders_laptops`
--

CREATE TABLE `orders_laptops` (
  `laptopId` varchar(255) NOT NULL,
  `orderId` bigint(20) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `totalPrice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `refreshtokens`
--

CREATE TABLE `refreshtokens` (
  `userId` varchar(255) DEFAULT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` CHAR(36) NOT NULL,
  `addressDetail` varchar(255) DEFAULT NULL,
  `dateOfBirth` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `ward` varchar(255) DEFAULT NULL,
	`updatedAt` datetime(6) DEFAULT NULL,
    `createdAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `UserAddress`
--

CREATE TABLE `user_address` (
    `addressId` INT PRIMARY KEY AUTO_INCREMENT,
    `fullname` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(15) NOT NULL,
    `addressDetail` VARCHAR(255) NOT NULL,
    `ward` VARCHAR(255),
    `district` VARCHAR(255),
    `city` VARCHAR(255),
    `userId` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `voucherId` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `voucherCode` varchar(255) NOT NULL,
  `voucherDiscount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `view_history`
--

CREATE TABLE `view_history` (
  `userId` CHAR(36) NOT NULL, 
  `laptopId` CHAR(36) NOT NULL,
  PRIMARY KEY (`userId`, `laptopId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `Comments`
--

CREATE TABLE `comments`(
    `laptopId` char(36) not null,                             
    `userId` char(36) not null,                               
    `comment_text` TEXT                     
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `Bookings`
--
CREATE TABLE bookings (
    bookingId INT AUTO_INCREMENT PRIMARY KEY,
    userId CHAR(36),
    date DATE not NULL,
    time TIME not null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX idx_bookings_date_time (date, time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brandId`);

--
-- Indexes for table `installment_plans`
--
ALTER TABLE `installments`
  ADD PRIMARY KEY (`installmentId`);

--
-- Indexes for table `laptops`
--
ALTER TABLE `laptops`
  ADD PRIMARY KEY (`laptopId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`);

--
-- Indexes for table `orders_laptops`
--
ALTER TABLE `orders_laptops`
  ADD PRIMARY KEY (`laptopId`,`orderId`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`laptopId`,`userId`);
  
--
-- Indexes for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD PRIMARY KEY (`token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`voucherId`),
  ADD UNIQUE KEY `UK_pyjpr8t80gtca0rvugxjedmon` (`voucherCode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brandId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `voucherId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `installments`
  MODIFY `installmentId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK6co8q7ko456baksb6tdjq2dfv` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKgpwojd1dbx2rns87d67pydkv6` FOREIGN KEY (`voucherId`) REFERENCES `vouchers` (`voucherId`) ON DELETE SET NULL ON UPDATE SET NULL;
  

--
-- Constraints for table `orders_laptops`
--
ALTER TABLE `orders_laptops`
  ADD CONSTRAINT `FK9mpq9q90e41dmwd93r32aoabp` FOREIGN KEY (`laptopId`) REFERENCES `laptops` (`laptopId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKp5a6f357myfmoj5seea0x5r21` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;


--
-- Constraints for table `Comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK9mpq9q90e41dmwd93r32aoagp` 
  FOREIGN KEY (`laptopId`) 
  REFERENCES `laptops` (`laptopId`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE;
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_Comments_User` 
  FOREIGN KEY (`userId`) 
  REFERENCES `users` (`userId`) 
  ON DELETE CASCADE
  ON UPDATE CASCADE;
COMMIT;

--
-- Constraints for table `view_history`
--
ALTER TABLE `view_history`
  ADD CONSTRAINT `fk_user_view`
  FOREIGN KEY (`userId`)
  REFERENCES `users` (`userId`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `view_history`
  ADD CONSTRAINT `fk_laptop_view`
  FOREIGN KEY (`laptopId`)
  REFERENCES `laptops` (`laptopId`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
COMMIT;


--
-- Constraints for table `UserAddress`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `FK_UserAddress_User` FOREIGN KEY (`userId`) 
  REFERENCES `users` (`userId`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE;
COMMIT;

--
-- Constraints for table `Bookings`
--
ALTER TABLE `Bookings`
  ADD CONSTRAINT `FK_Booking_User` FOREIGN KEY (`userId`) 
  REFERENCES `users` (`userId`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE;
COMMIT;




--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brandId`, `brandName`) VALUES
(1, 'Dell'),
(2, 'ASUS'),
(3, 'Lenovo'),
(4, 'HP'),
(5, 'Huawei'),
(6, 'MSI'),
(7, 'Acer'),
(8, 'Microsoft'),
(9, 'Apple'),
(10, 'LG'),
(11, 'Gigabyte'),
(12, 'Masstel'),
(13, 'Avita'),
(14, 'Xiaomi'),
(15, 'Hãng khác'),
(16, 'Vaio');
-- --------------------------------------------------------

--
-- Dumping data for table `installment_plans`
--

INSERT INTO `installments` (`company`, `downPayment`, `flatInterestRate`, `installmentPrice`, `monthlyInstallment`, `requiredDocuments`, `term`, `totalPayment`) VALUES
('MBBank', '20%', '0%', 0, 0, 'CMND, Bằng lái xe', '9 tháng', 0),
('HDBank', '30%', '0%', 0, 0, 'CMND, Sổ hộ khẩu', '9 tháng', 0),
('VPBank', '15%', '2.8%', 12000000, 388888, 'CMND', '18 tháng', 12800000),
('HD Saison', '40%', '2.5%', 28000000, 933333, 'CMND, Sổ hộ khẩu, Giấy xác nhận thu nhập', '18 tháng', 30800000),
('VPBank', '25%', '4%', 15000000, 625000, 'CMND, Giấy xác nhận thu nhập', '24 tháng', 16500000),
('TPBank', '30%', '0%', 0, 0, 'CMND, Sổ hộ khẩu', '3 tháng', 0),
('Agribank', '50%', '0%', 0, 0, 'CMND, Giấy chứng nhận cư trú', '9 tháng', 0),
('ACB', '20%', '0%', 0, 0, 'CMND, Hợp đồng lao động', '6 tháng', 0),
('TPBank', '30%', '3%', 20000000, 1166666, 'CMND, Sổ hộ khẩu', '12 tháng', 22000000),
('VPBank', '25%', '0%', 0, 0, 'CMND, Giấy xác nhận thu nhập', '6 tháng', 0),
('Vietcombank', '40%', '0%', 0, 0, 'CMND, Sổ hộ khẩu', '3 tháng', 0),
('TPBank', '35%', '3.2%', 18000000, 975000, 'CMND, Sổ hộ khẩu, Giấy xác nhận thu nhập', '12 tháng', 19600000),
('Sacombank', '15%', '0%', 0, 0, 'CMND, Hóa đơn tiền điện', '6 tháng', 0),
('BIDV', '25%', '0%', 0, 0, 'CMND, Giấy xác nhận thu nhập', '3 tháng', 0),
('Techcombank', '35%', '0%', 0, 0, 'CMND, Sổ hộ khẩu', '3 tháng', 0);
-- --------------------------------------------------------

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `addressDetail`, `createdAt`, `dateOfBirth`, `district`, `email`, `fullname`, `password`, `phone`, `province`, `role`, `updatedAt`, `username`, `ward`) VALUES
('1', 'Số 123, Đường ABC', '2024-11-07 23:09:27.000000', NULL, 'Quận 1', 'nguyenvana@example.com', 'Nguyễn Văn A', '$2a$10$PG7TgfyRDUnuhpSbyu5ikOfFR.jR6zHGfpVpYfXWD..IiMmhnmJR.', '0909123456', 'TP.HCM', 'user', '2024-11-07 23:09:27.000000', 'nguyenvana', 'Phường 1'),
('10', 'Số 2223, Đường BCD', '2024-11-07 23:13:03.000000', NULL, 'Quận 10', 'lethuong@example.com', 'Lê Thương', '$2a$10$FpEn5jxW8IXlD3l8g5Z5k5kJkkVwrGjOLlg8g5jrRSvZD38nZa6k6', '0990123456', 'TP.HCM', 'user', '2024-11-07 23:13:03.000000', 'lethuong', 'Phường 10'),
('11', 'Số 2425, Đường EFG', '2024-11-07 23:13:35.000000', NULL, 'Quận 11', 'lethi@example.com', 'Lê Thị D', '$2a$10$A2JgFDPusVx8KxFw2jQ4tABOGkOht3BrubAomjL9l.58mY47e9byu', '0912345678', 'TP.HCM', 'user', '2024-11-07 23:13:35.000000', 'lethi', 'Phường 11'),
('12', 'Số 2627, Đường HIJ', '2024-11-07 23:13:56.000000', NULL, 'Quận 12', 'nguyenhoang@example.com', 'Nguyễn Hoàng', '$2a$10$BFHp1xtJhA8eF7HEJt/JKD9n4Vcd1jy1e8xUbe6wJbD7.FJftvLzW', '0903456789', 'TP.HCM', 'user', '2024-11-07 23:13:56.000000', 'nguyenhoang', 'Phường 12'),
('13', 'Số 2829, Đường KLM', '2024-11-07 23:14:16.000000', NULL, 'Quận 13', 'trangduong@example.com', 'Trần Dương', '$2a$10$LkZaFLtGhzDpfpJntKoMf5jm8e7evcyt5flx1A6d5SPlA0zRUFX1G', '0923456789', 'TP.HCM', 'user', '2024-11-07 23:14:16.000000', 'trangduong', 'Phường 13'),
('14', 'Số 3031, Đường NOP', '2024-11-07 23:14:35.000000', NULL, 'Quận 14', 'lethuy@example.com', 'Lê Thúy', '$2a$10$Mbjf3onufkm72I3AYQ5Bjm9U2h0z88T0SHlJX6S2v7pKcvQraXaZG', '0934567890', 'TP.HCM', 'user', '2024-11-07 23:14:35.000000', 'lethuy', 'Phường 14'),
('15', 'Số 3233, Đường PQR', '2024-11-07 23:14:56.000000', NULL, 'Quận 15', 'phanlong@example.com', 'Phan Long', '$2a$10$JxoEjpXyDZpP8JxXZp4tNm8T9iGs6YVoGC2z8pFndfl7Ch9ML7guu', '0945678901', 'TP.HCM', 'user', '2024-11-07 23:14:56.000000', 'phanlong', 'Phường 15'),
('16', 'Số 3435, Đường STV', '2024-11-07 23:15:16.000000', NULL, 'Quận 16', 'nguyenhoang@example.com', 'Nguyễn Hoàng', '$2a$10$S3FVpU8v9FXf7ROdRT5o3DGGVx.7wdbwH9YJAtU4AiEkub2WiTebm', '0978901234', 'TP.HCM', 'user', '2024-11-07 23:15:16.000000', 'nguyenhoang', 'Phường 16'),
('17', 'Số 123, Đường ABC', '2024-12-05 20:57:26.000000', '1980-01-01', 'Quận 1', 'admin@example.com', 'Admin User', '$2a$10$FWOQhMt6eJOcfV5z9OAqAOaICJxbtAVcmzvQ8OKuihpv3QzIY1/qW', '0901234567', 'TP.HCM', 'admin', '2024-12-05 20:57:26.000000', 'admin', 'Phường 1'),
('18', 'Số 456, Đường DEF', '2024-12-05 20:57:26.000000', '1990-05-15', 'Quận 2', 'user@example.com', 'User A', '$2a$10$FWOQhMt6eJOcfV5z9OAqAOaICJxbtAVcmzvQ8OKuihpv3QzIY1/qW', '0912345678', 'TP.HCM', 'user', '2024-12-05 20:57:26.000000', 'user', 'Phường 2'),
('2', 'Số 456, Đường DEF', '2024-11-07 23:09:38.000000', NULL, 'Quận 2', 'tranthib@example.com', 'Trần Thị B', '$2a$10$WmcgUUVtiMJmjgUtsvmjq.J/2bt7u8rhpHgeCzRmUnJf65CznvSWe', '0912345678', 'TP.HCM', 'user', '2024-11-07 23:09:38.000000', 'tranthib', 'Phường 2'),
('3', 'Số 789, Đường GHI', '2024-11-07 23:10:12.000000', NULL, 'Quận 3', 'lequocd@example.com', 'Lê Quốc D', '$2a$10$S6MJGG38PYYQkdsw13oNqKO7Rl6aPQzJSnx5U4.EYhI4R0Ppxe36W', '0923456789', 'TP.HCM', 'user', '2024-11-07 23:10:12.000000', 'lequocd', 'Phường 3'),
('4', 'Số 1011, Đường JKL', '2024-11-07 23:10:45.000000', NULL, 'Quận 4', 'hoangphuoa@example.com', 'Hoàng Phú A', '$2a$10$YxcK4fTPWvFmmZuXjP0vmuH6Bfv4lLwR1t7jzTSV9nQ67v1V.lRS6', '0934567890', 'TP.HCM', 'user', '2024-11-07 23:10:45.000000', 'hoangphuoa', 'Phường 4'),
('5', 'Số 1213, Đường MNO', '2024-11-07 23:11:03.000000', NULL, 'Quận 5', 'phamminh@example.com', 'Phạm Minh C', '$2a$10$QiYfgclg2qkjf0qLX5wVnKK.k5nnDR2jsRiworTQfgqXM0Al0oHa6', '0945678901', 'TP.HCM', 'user', '2024-11-07 23:11:03.000000', 'phamminh', 'Phường 5'),
('6', 'Số 1415, Đường PQR', '2024-11-07 23:11:35.000000', NULL, 'Quận 6', 'ngocdung@example.com', 'Ngọc Dung', '$2a$10$F9BTrglWnT5dq6nUdLO4B2mI6pXhf1LfSbMN3nwiFOtXIQEj1Xe4', '0956789012', 'TP.HCM', 'user', '2024-11-07 23:11:35.000000', 'ngocdung', 'Phường 6'),
('7', 'Số 1617, Đường STU', '2024-11-07 23:11:58.000000', NULL, 'Quận 7', 'trangthao@example.com', 'Trần Thảo', '$2a$10$Imt79OQyWpGHXX8fXDPbGOxeRUQXk03jrt7tYZnx7G0F0w1Xh1Zf2', '0967890123', 'TP.HCM', 'user', '2024-11-07 23:11:58.000000', 'trangthao', 'Phường 7'),
('8', 'Số 1819, Đường VWX', '2024-11-07 23:12:24.000000', NULL, 'Quận 8', 'hoanglan@example.com', 'Hoàng Lan', '$2a$10$Gb9oeLNnWs52Fz9q35en0c.W8GghH5ajMT4hKj9wdGfpw.BQoe0xS', '0978901234', 'TP.HCM', 'user', '2024-11-07 23:12:24.000000', 'hoanglan', 'Phường 8'),
('9', 'Số 2021, Đường YZA', '2024-11-07 23:12:46.000000', NULL, 'Quận 9', 'vuthanha@example.com', 'Vũ Thanh A', '$2a$10$HUBNGXk5k5zVVtnXcdhjfg0ORoK5yftP5u7U2TzOSjzzHkR56b1xa', '0989012345', 'TP.HCM', 'user', '2024-11-07 23:12:46.000000', 'vuthanha', 'Phường 9');

-- --------------------------------------------------------

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `completeDate`, `orderAddress`, `orderDate`, `orderNote`, `paymentMethod`, `phoneNumber`, `shippingMethod`, `status`, `totalPayment`, `userId`, `voucherId`) VALUES
(99, NULL, '123 Đường ABC, Quận 1, TP.HCM', '2024-12-05 20:57:26.000000', NULL, 'Thẻ tín dụng', '0901234567', 'Vận chuyển tiêu chuẩn', 'Đã giao', 150000, '1', NULL),
(100, NULL, '456 Đường DEF, Quận 2, TP.HCM', '2024-07-10 20:57:26.000000', NULL, 'PayPal', '0912345678', 'Vận chuyển nhanh', 'Đã giao', 200000, '2', NULL),
(101, NULL, '123 Đường ABC, Quận 1, TP.HCM', '2024-08-06 23:09:27.000000', NULL, 'Thẻ tín dụng', '0909123456', 'Vận chuyển tiêu chuẩn', 'Đã giao', 250000, '3', NULL),
(102, NULL, '2223 Đường BCD, Quận 10, TP.HCM', '2024-11-07 23:13:03.000000', NULL, 'Thẻ tín dụng', '0990123456', 'Vận chuyển tiêu chuẩn', 'Đã giao', 300000, '4', NULL),
(103, NULL, '2425 Đường EFG, Quận 11, TP.HCM', '2024-05-15 23:13:35.000000', NULL, 'Chuyển khoản ngân hàng', '0912345678', 'Vận chuyển nhanh', 'Đã giao', 350000, '5', NULL),
(104, NULL, '2627 Đường HIJ, Quận 12, TP.HCM', '2024-04-24 23:13:56.000000', NULL, 'Thẻ tín dụng', '0903456789', 'Vận chuyển tiêu chuẩn', 'Đã giao', 400000, '6', NULL),
(105, NULL, '2829 Đường KLM, Quận 13, TP.HCM', '2024-04-26 23:14:16.000000', NULL, 'PayPal', '0923456789', 'Vận chuyển nhanh', 'Đã giao', 450000, '7', NULL),
(106, NULL, '3031 Đường NOP, Quận 14, TP.HCM', '2024-11-07 23:14:35.000000', NULL, 'Chuyển khoản ngân hàng', '0934567890', 'Vận chuyển tiêu chuẩn', 'Đã giao', 500000, '8', NULL),
(107, NULL, '3233 Đường PQR, Quận 15, TP.HCM', '2024-01-26 23:14:56.000000', NULL, 'Thẻ tín dụng', '0945678901', 'Vận chuyển nhanh', 'Đã giao', 550000, '9', NULL),
(108, NULL, '3435 Đường STV, Quận 16, TP.HCM', '2024-12-20 23:15:16.000000', NULL, 'Thẻ tín dụng', '0978901234', 'Vận chuyển tiêu chuẩn', 'Đã giao', 600000, '10', NULL),
(109, NULL, '123 Đường ABC, Quận 1, TP.HCM', '2024-12-05 20:57:26.000000', NULL, 'Thẻ tín dụng', '0901234567', 'Vận chuyển nhanh', 'Đã giao', 650000, '11', NULL),
(110, NULL, '456 Đường DEF, Quận 2, TP.HCM', '2024-12-05 20:57:26.000000', NULL, 'PayPal', '0912345678', 'Vận chuyển tiêu chuẩn', 'Đã giao', 700000, '12', NULL),
(111, NULL, '456 Đường DEF, Quận 2, TP.HCM', '2024-11-07 23:09:38.000000', NULL, 'Thẻ tín dụng', '0912345678', 'Vận chuyển nhanh', 'Đã hủy', 750000, '13', NULL),
(112, NULL, '789 Đường GHI, Quận 3, TP.HCM', '2024-07-17 23:10:12.000000', NULL, 'Chuyển khoản ngân hàng', '0923456789', 'Vận chuyển tiêu chuẩn', 'Chờ xử lý', 800000, '14', NULL),
(113, NULL, '1011 Đường JKL, Quận 4, TP.HCM', '2024-11-07 23:10:45.000000', NULL, 'PayPal', '0934567890', 'Vận chuyển nhanh', 'Chờ xử lý', 850000, '15', NULL);

-- --------------------------------------------------------


--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`voucherId`, `description`, `voucherCode`, `voucherDiscount`) VALUES
(17, 'Giảm giá 10% cho tất cả các sản phẩm laptop', 'LAPTOP10', 10),
(18, 'Giảm giá 15% cho laptop từ 15 triệu trở lên', 'LAPTOP15', 15),
(19, 'Giảm giá 20% cho laptop thuộc thương hiệu Asus', 'LAPTOP20', 20),
(20, 'Giảm giá 25% cho laptop Dell', 'LAPTOP25', 25),
(21, 'Giảm giá 30% cho các laptop có giá trị trên 20 triệu', 'LAPTOP30', 30),
(22, 'Giảm giá 5% cho laptop Lenovo', 'LAPTOP5', 5),
(23, 'Giảm giá 35% cho laptop MacBook', 'LAPTOP35', 35),
(24, 'Giảm giá 40% cho laptop HP', 'LAPTOP40', 40),
(25, 'Giảm giá 50% cho laptop MSI trong chương trình khuyến mãi đặc biệt', 'LAPTOP50', 50),
(26, 'Giảm giá 60% cho các laptop có cấu hình cao cấp', 'LAPTOP60', 60);


--
-- Dumping data for table `Bookings`
--
INSERT INTO Bookings (date, time, userId) VALUES
('2025-03-07', '10:00:00', 1), -- User 1 đặt 10:00
('2025-03-07', '11:00:00', 2), -- User 2 đặt 11:00
('2025-03-08', '09:30:00', 1); -- User 1 đặt 09:30 ngày 08/03
-- --------------------------------------------------------




/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
