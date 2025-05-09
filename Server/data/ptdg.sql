-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3360
-- Generation Time: May 06, 2025 at 05:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trutun_ptdg`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointmentID` int(11) NOT NULL,
  `customerID` int(11) DEFAULT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `appointmentDateTime` datetime NOT NULL,
  `estimatedArrivalTime` datetime NOT NULL,
  `duration` int(11) DEFAULT 60,
  `status` enum('pending','confirmed','in_progress','completed','cancelled') DEFAULT 'pending',
  `serviceType` enum('repair','assembly','installation','purchase','consultation','maintenance','upgrade','data_recovery','warranty_service','software_installation','other') NOT NULL,
  `serviceLocation` enum('home','office','store') NOT NULL DEFAULT 'store',
  `deviceCategory` enum('BanPhim','Mouse','Mousepad','GamingGear','Headphone','Case','CPU','Main','PSU','HDD','RAM','VGA','screen','PC','Laptop','iPad','Phone','other') NOT NULL,
  `isWarrantyService` tinyint(1) DEFAULT 0,
  `warrantyPeriod` int(11) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `estimatedCost` decimal(10,2) DEFAULT NULL,
  `diagnosisDetails` text DEFAULT NULL,
  `technicianNotes` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `guestName` varchar(100) DEFAULT NULL,
  `guestEmail` varchar(100) DEFAULT NULL,
  `guestPhone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointmentID`, `customerID`, `employeeID`, `appointmentDateTime`, `estimatedArrivalTime`, `duration`, `status`, `serviceType`, `serviceLocation`, `deviceCategory`, `isWarrantyService`, `warrantyPeriod`, `address`, `notes`, `estimatedCost`, `diagnosisDetails`, `technicianNotes`, `createdAt`, `updatedAt`, `guestName`, `guestEmail`, `guestPhone`) VALUES
(1, 1, 2, '2025-04-26 10:00:00', '2025-04-26 10:15:00', 60, 'confirmed', 'repair', 'store', 'Laptop', 1, 12, NULL, 'Laptop không khởi động được', 400000.00, NULL, NULL, '2025-05-06 15:29:49', '2025-05-06 15:29:49', NULL, NULL, NULL),
(2, 3, 4, '2025-04-27 14:00:00', '2025-04-27 14:15:00', 90, 'pending', 'assembly', 'store', 'PC', 0, NULL, NULL, 'Lắp ráp PC gaming mới', 250000.00, NULL, NULL, '2025-05-06 15:29:49', '2025-05-06 15:29:49', NULL, NULL, NULL),
(3, 5, 7, '2025-04-28 09:30:00', '2025-04-28 09:45:00', 120, 'confirmed', 'installation', 'home', 'screen', 0, NULL, '202 Điện Biên Phủ, Quận Bình Thạnh, TP. Hồ Chí Minh', 'Lắp đặt màn hình và thiết lập tại nhà', 350000.00, NULL, NULL, '2025-05-06 15:29:49', '2025-05-06 15:29:49', NULL, NULL, NULL),
(4, 2, 3, '2025-04-29 16:00:00', '2025-04-29 16:15:00', 45, 'pending', 'consultation', 'store', 'VGA', 0, NULL, NULL, 'Tư vấn nâng cấp card đồ họa', 0.00, NULL, NULL, '2025-05-06 15:29:49', '2025-05-06 15:29:49', NULL, NULL, NULL),
(5, 4, 5, '2025-04-30 11:00:00', '2025-04-30 11:15:00', 60, 'confirmed', 'warranty_service', 'store', 'BanPhim', 1, 24, NULL, 'Bàn phím Logitech bị kẹt phím', 0.00, NULL, NULL, '2025-05-06 15:29:49', '2025-05-06 15:29:49', NULL, NULL, NULL),
(6, NULL, 6, '2025-05-01 13:00:00', '2025-05-01 13:15:00', 75, 'pending', 'repair', 'store', 'Mouse', 0, NULL, NULL, 'Chuột không click được', 150000.00, NULL, NULL, '2025-05-06 15:29:49', '2025-05-06 15:29:49', 'Nguyễn Văn Nam', 'nam.nguyen@email.com', '0912345678'),
(7, NULL, 2, '2025-05-02 10:30:00', '2025-05-02 10:45:00', 90, 'confirmed', 'data_recovery', 'office', 'HDD', 0, NULL, '78 Lê Thanh Nghị, Quận Hai Bà Trưng, Hà Nội', 'Khôi phục dữ liệu từ ổ cứng hỏng', 1200000.00, NULL, NULL, '2025-05-06 15:29:49', '2025-05-06 15:29:49', 'Trần Thị Hoa', 'hoa.tran@email.com', '0923456789'),
(8, NULL, 3, '2025-05-03 15:00:00', '2025-05-03 15:15:00', 60, 'pending', 'maintenance', 'home', 'PC', 0, NULL, '123 Đường Mai, Quận Hoàn Kiếm, Hà Nội', 'Vệ sinh và bảo dưỡng PC', 500000.00, NULL, NULL, '2025-05-06 15:29:49', '2025-05-06 15:29:49', 'Lê Minh Quân', 'quan.le@email.com', '0934567890'),
(9, 8, 4, '2025-05-04 11:00:00', '2025-05-04 11:15:00', 120, 'confirmed', 'upgrade', 'store', 'RAM', 0, NULL, NULL, 'Nâng cấp RAM cho laptop', 300000.00, NULL, NULL, '2025-05-06 15:29:49', '2025-05-06 15:29:49', NULL, NULL, NULL),
(10, 10, 7, '2025-05-05 14:00:00', '2025-05-05 14:15:00', 60, 'pending', 'software_installation', 'store', 'Laptop', 0, NULL, NULL, 'Cài đặt phần mềm đồ họa', 200000.00, NULL, NULL, '2025-05-06 15:29:49', '2025-05-06 15:29:49', NULL, NULL, NULL);

--
-- Triggers `appointments`
--
DELIMITER $$
CREATE TRIGGER `trg_appointments_check_insert` BEFORE INSERT ON `appointments` FOR EACH ROW BEGIN
    IF NEW.customerID IS NULL AND (NEW.guestName IS NULL OR NEW.guestPhone IS NULL) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Phải có customerID hoặc thông tin khách vãng lai (guestName và guestPhone)';
    END IF;

    IF NEW.serviceLocation <> 'store' AND NEW.address IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Phải có địa chỉ nếu serviceLocation không phải là "store"';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_appointments_check_update` BEFORE UPDATE ON `appointments` FOR EACH ROW BEGIN
    IF NEW.customerID IS NULL AND (NEW.guestName IS NULL OR NEW.guestPhone IS NULL) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Phải có customerID hoặc thông tin khách vãng lai (guestName và guestPhone)';
    END IF;

    IF NEW.serviceLocation <> 'store' AND NEW.address IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Phải có địa chỉ nếu serviceLocation không phải là "store"';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_parts`
--

CREATE TABLE `appointment_parts` (
  `id` int(11) NOT NULL,
  `appointmentID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unitPrice` decimal(10,2) NOT NULL,
  `isReplacement` tinyint(1) DEFAULT 1,
  `status` enum('in_stock','ordered') DEFAULT 'in_stock'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment_parts`
--

INSERT INTO `appointment_parts` (`id`, `appointmentID`, `quantity`, `unitPrice`, `isReplacement`, `status`) VALUES
(1, 1, 1, 1200000.00, 1, 'in_stock'),
(2, 1, 1, 350000.00, 1, 'in_stock'),
(3, 2, 1, 8500000.00, 0, 'in_stock'),
(4, 2, 1, 4200000.00, 0, 'in_stock'),
(5, 2, 1, 3500000.00, 0, 'in_stock'),
(6, 2, 2, 1800000.00, 0, 'in_stock'),
(7, 2, 1, 1950000.00, 0, 'in_stock'),
(8, 2, 1, 2200000.00, 0, 'in_stock'),
(9, 2, 1, 1500000.00, 0, 'in_stock'),
(10, 3, 1, 4500000.00, 0, 'in_stock'),
(11, 3, 1, 250000.00, 0, 'in_stock'),
(12, 5, 1, 0.00, 1, 'in_stock'),
(13, 6, 1, 120000.00, 1, 'in_stock'),
(14, 8, 1, 150000.00, 0, 'in_stock'),
(15, 9, 2, 1650000.00, 0, 'in_stock'),
(16, 4, 1, 7500000.00, 0, 'ordered'),
(17, 7, 1, 3500000.00, 0, 'ordered');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerID` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `registrationDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customerID`, `fullName`, `email`, `phoneNumber`, `address`, `password`, `registrationDate`) VALUES
(1, 'Văn Công Thạch', 'thachtaro123@gmail.com', '0901234567', '123 Đường Mai, Quận Hoàn Kiếm, Hà Nội', 'fc8d5c17ee6bd893ac3d47583df509da68ada40070b9c9e1890cae52bc62de28', '2023-01-15 03:30:00'),
(2, 'Nguyễn Thị Mai', 'mai.nguyen@email.com', '0912345678', '456 Đường Láng, Quận Đống Đa, Hà Nội', 'cd85581193397b81d75d69f5674747a34611396a74c3fc72119cc816a72ceab9', '2023-02-20 07:45:00'),
(3, 'Trần Văn Long', 'long.tran@email.com', '0923456789', '789 Trường Sa, Quận 3, TP. Hồ Chí Minh', '1de8eae28b6152fe86570a59c623816b1708a2a1a64a42c85ff88ed921eae213', '2023-03-10 02:15:00'),
(4, 'Lê Thị Hằng', 'hang.le@email.com', '0934567890', '101 Nguyễn Văn Cừ, Quận Ninh Kiều, Cần Thơ', '3e9ab4abd5fe32392ac3761a21a5089c6c75ab7b2294129a41025cbceabc4460', '2023-04-05 09:20:00'),
(5, 'Phạm Quốc Huy', 'huy.pham@email.com', '0945678901', '202 Điện Biên Phủ, Quận Bình Thạnh, TP. Hồ Chí Minh', 'e9b3f2ce5b4a4f890b0c34dba98d2df0dd394720c874ac0989e10c610812a068', '2023-05-12 04:05:00'),
(6, 'Đặng Thị Lan', 'lan.dang@email.com', '0956789012', '303 Lê Duẩn, Quận Hải Châu, Đà Nẵng', 'f5c2533241b5393238b5372ad5350129023edb9efad2fe121cd7992ebca9d47a', '2023-06-18 06:30:00'),
(7, 'Hoàng Minh Tú', 'tu.hoang@email.com', '0967890123', '404 Nguyễn Huệ, TP. Huế', '6ed2beead797e3917418c1fd70e29b0931e3fb04bc0667840948b8685354a3bc', '2023-07-22 08:10:00'),
(8, 'Vũ Thị Bích', 'bich.vu@email.com', '0978901234', '505 Trần Phú, TP. Vũng Tàu', '887ec6190d9cc025780d7ccf880f7ff0f1a1516b43864dde107fb070eb7f1299', '2023-08-30 03:45:00'),
(9, 'Ngô Văn Thành', 'thanh.ngo@email.com', '0989012345', '606 Phạm Văn Đồng, TP. Thủ Đức', '06af6be579e0b5e21d633f2b1cae5c88254f8218941e13c8e133b2f8ad725bcf', '2023-09-14 05:20:00'),
(10, 'Lý Hồng Nhung', 'nhung.ly@email.com', '0990123456', '707 Quang Trung, TP. Bắc Ninh', 'a6b1fd64702ee4cce7849d7bbd66ced7bf22dcbbce13006ba311376d86f308b7', '2023-10-25 02:50:00');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employeeID` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `position` varchar(50) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employeeID`, `fullName`, `position`, `phoneNumber`, `email`, `password`) VALUES
(1, 'Tống Phan Kim Thạch', 'Quản lý cửa hàng', '0901234567', 'tong.thach@company.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f'),
(2, 'Phan Kim Thạch', 'Nhân viên bán hàng', '0912345678', 'kim.thach@company.com', 'c6ba91b90d922e159893f46c387e5dc1b3dc5c101a5a4522f03b987177a24a91'),
(3, 'Nguyễn Văn An', 'Nhân viên bán hàng', '0923456789', 'van.an@company.com', '5efc2b017da4f7736d192a74dde5891369e0685d4d38f2a455b6fcdab282df9c'),
(4, 'Trần Thị Bích', 'Nhân viên bán hàng', '0934567890', 'thi.bich@company.com', '6733b7ffeace4887c3b31258079c780d8db3018db9cbc05c500df3521f968df8'),
(5, 'Lê Minh Đức', 'Nhân viên bán hàng', '0945678901', 'minh.duc@company.com', '478a7da128a2875a1484798da2010d8f518ab4f341000da93c59fc5c201ded2c'),
(6, 'Phạm Thị Hương', 'Nhân viên bán hàng', '0956789012', 'thi.huong@company.com', '59a1ea0e7b558df84d247db20315c9e4b9bff7719ffaafd3150a3c529aa38d98'),
(7, 'Đỗ Quang Huy', 'Nhân viên bán hàng', '0967890123', 'quang.huy@company.com', 'b77e3c94b3fbc99f22771482363dc0ea731113fb184e655d2ec9461e1c68519b'),
(8, 'Vũ Thanh Mai', 'Kế toán', '0978901234', 'thanh.mai@company.com', 'ebbf75fd13baaab8ce25b1d576efd9d071f8e95b8e8024035bb027a45604651e'),
(9, 'Hoàng Minh Tú', 'Nhân viên bán hàng', '0989012345', 'minh.tu@company.com', '5d6e996d4ef01c66b299460b84d470c585ac813064ce1b5616dbfb738e232d38'),
(10, 'Ngô Thị Lan', 'Nhân viên bán hàng', '0990123456', 'thi.lan@company.com', '8d3c8ba9a36b65c7f050bec4d15dc1b05df668eddc2f80f8966f472c9483bd4c');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `orderDetailID` int(11) NOT NULL,
  `orderID` int(11) DEFAULT NULL,
  `productID` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unitPrice` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`orderDetailID`, `orderID`, `productID`, `quantity`, `unitPrice`, `subtotal`) VALUES
(1, 1, 1, 1, 1099.99, 1099.99),
(2, 1, 82, 1, 50.00, 50.00),
(3, 2, 21, 1, 2499.99, 2499.99),
(4, 3, 5, 1, 799.99, 799.99),
(5, 3, 61, 1, 399.99, 399.99),
(6, 3, 83, 1, 150.01, 150.01),
(7, 4, 6, 1, 799.99, 799.99),
(8, 5, 65, 1, 349.99, 349.99),
(9, 5, 85, 1, 329.50, 329.50),
(10, 6, 27, 1, 1299.99, 1299.99),
(11, 7, 91, 1, 1599.99, 1599.99),
(12, 8, 40, 1, 699.99, 699.99),
(13, 8, 51, 1, 1500.00, 1500.00),
(14, 9, 56, 1, 399.99, 399.99),
(15, 9, 84, 1, 75.00, 75.00),
(16, 10, 7, 1, 899.99, 899.99),
(17, 11, 73, 1, 349.99, 349.99),
(18, 12, 51, 1, 3699.99, 3699.99),
(19, 13, 2, 1, 1199.99, 1199.99),
(20, 13, 5, -80, 1.00, -80.00);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL,
  `customerID` int(11) DEFAULT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `voucherID` int(11) DEFAULT NULL,
  `orderDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `totalAmount` decimal(10,2) NOT NULL,
  `status` enum('Pending','Shipping','Completed','Canceled') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `customerID`, `employeeID`, `voucherID`, `orderDate`, `totalAmount`, `status`) VALUES
(1, 6, 1, NULL, '2025-01-15 04:25:00', 1299.99, 'Completed'),
(2, 7, 2, 4, '2025-01-22 08:40:00', 1599.99, 'Completed'),
(3, 8, 3, NULL, '2025-02-05 02:10:00', 2199.99, 'Completed'),
(4, 9, 4, 5, '2025-02-14 06:50:00', 474.99, 'Completed'),
(5, 10, 5, NULL, '2025-02-28 09:20:00', 899.99, 'Completed'),
(6, 1, 6, 6, '2025-03-05 03:30:00', 349.99, 'Completed'),
(7, 2, 7, NULL, '2025-03-15 07:45:00', 3699.99, 'Shipping'),
(8, 3, 8, 7, '2025-03-22 04:15:00', 1119.99, 'Shipping'),
(9, 4, 9, NULL, '2025-03-30 02:30:00', 1099.99, 'Pending'),
(10, 5, 10, 8, '2025-04-04 08:20:00', 849.99, 'Pending'),
(11, 6, 1, NULL, '2025-04-05 06:40:00', 399.99, 'Pending'),
(12, 7, 2, 9, '2025-04-06 03:15:00', 299.99, 'Pending'),
(13, 8, 3, NULL, '2025-04-07 09:30:00', 799.99, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `paymentmethods`
--

CREATE TABLE `paymentmethods` (
  `paymentID` int(11) NOT NULL,
  `methodName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paymentmethods`
--

INSERT INTO `paymentmethods` (`paymentID`, `methodName`) VALUES
(4, 'Apple Pay'),
(7, 'cash'),
(1, 'Credit Card'),
(5, 'Cryptocurrency'),
(6, 'Gift Card'),
(3, 'Google Pay'),
(2, 'PayPal'),
(8, 'Store Credit');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `paymentID` int(11) NOT NULL,
  `orderID` int(11) DEFAULT NULL,
  `paymentMethodID` int(11) DEFAULT NULL,
  `paymentStatus` enum('Pending','Completed','Failed') DEFAULT 'Pending',
  `paymentDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`paymentID`, `orderID`, `paymentMethodID`, `paymentStatus`, `paymentDate`, `amount`) VALUES
(1, 1, 1, 'Completed', '2023-11-10 07:35:00', 1149.99),
(2, 2, 1, 'Completed', '2023-11-15 03:25:00', 2499.99),
(3, 3, 2, 'Completed', '2023-12-01 09:50:00', 1349.99),
(4, 4, 3, 'Completed', '2023-12-10 02:20:00', 799.99),
(5, 5, 1, 'Completed', '2024-01-05 06:35:00', 679.49),
(6, 6, 4, 'Completed', '2024-01-15 04:30:00', 1299.99),
(7, 7, 5, 'Completed', '2024-01-22 08:45:00', 1599.99),
(8, 8, 2, 'Completed', '2024-02-05 02:15:00', 2199.99),
(9, 9, 6, 'Completed', '2024-02-14 06:55:00', 474.99),
(10, 10, 1, 'Completed', '2024-02-28 09:25:00', 899.99),
(11, 11, 2, 'Completed', '2024-03-05 03:35:00', 349.99),
(12, 12, 1, 'Completed', '2024-03-15 07:50:00', 3699.99),
(13, 13, 3, 'Completed', '2024-03-22 04:20:00', 1119.99);

-- --------------------------------------------------------

--
-- Table structure for table `productattributes`
--

CREATE TABLE `productattributes` (
  `attributeID` int(11) NOT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `attributeName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productattributes`
--

INSERT INTO `productattributes` (`attributeID`, `categoryID`, `attributeName`) VALUES
(1, 1, 'Switch: Cherry MX Red, Blue, Brown'),
(2, 1, 'Kết nối: USB-C, Bluetooth 5.0, Wireless 2.4GHz'),
(3, 1, 'Đèn LED: RGB, Rainbow, Đơn sắc'),
(4, 1, 'Số phím: 104, 87, 61'),
(5, 1, 'Chất liệu: Nhựa ABS, Nhôm, PBT'),
(6, 2, 'Switch: Gateron Red, Blue, Yellow'),
(7, 2, 'Kết nối: USB-A, Bluetooth 5.1'),
(8, 2, 'Đèn LED: RGB Chroma, 16.8 triệu màu'),
(9, 3, 'Switch: Optical Red, Blue, Silver'),
(10, 3, 'Kết nối: USB-C, Bluetooth 5.2'),
(11, 4, 'Switch: Razer Green, Orange, Yellow'),
(12, 4, 'Đèn RGB: 16.8 triệu màu, 11 chế độ'),
(13, 5, 'Switch: Kailh Box White, Red, Black'),
(14, 5, 'Độ bền: 50 triệu lần nhấn, 100 triệu lần nhấn'),
(15, 6, 'DPI: 800-12000, 5 mức điều chỉnh'),
(16, 6, 'Kết nối: USB, Bluetooth 5.0, Wireless'),
(17, 6, 'Số nút: 6 nút, 11 nút lập trình'),
(18, 7, 'DPI: 1000-16000, 8 mức tùy chỉnh'),
(19, 7, 'Đèn LED: RGB 16.8 triệu màu, 4 vùng'),
(20, 8, 'DPI: 100-25600, Công nghệ HERO 25K'),
(21, 8, 'Cảm biến: Optical, Laser, PWM 3389'),
(22, 9, 'DPI: 400-20000, 7 mức điều chỉnh'),
(23, 9, 'Thời gian phản hồi: 1ms, 0.5ms, 0.2ms'),
(24, 10, 'DPI: 800-8000, 3 mức tùy chỉnh'),
(25, 10, 'Độ bền: 20 triệu lần nhấn, 60 triệu lần nhấn'),
(26, 11, 'Kích thước: 30x25cm, 45x40cm, 90x40cm'),
(27, 11, 'Chất liệu: Vải mềm, Microfiber, Cao su tự nhiên'),
(28, 12, 'Kích thước: 35x30cm, 80x30cm, 120x60cm'),
(29, 12, 'Đèn LED: RGB viền, RGB toàn bộ, 10 chế độ'),
(30, 13, 'Kích thước: 32x27cm, 70x30cm, 90x45cm'),
(31, 13, 'Độ dày: 3mm, 4mm, 5mm chống trượt'),
(32, 14, 'Loại thiết bị: Tay cầm gaming, Flight stick, Racing wheel'),
(33, 14, 'Tương thích: PC/PS5/Xbox, Nintendo Switch'),
(34, 15, 'Loại thiết bị: Webcam, Microphone, Stream Deck'),
(35, 15, 'Kết nối: USB 3.0, USB-C, 3.5mm jack'),
(36, 16, 'Loại thiết bị: Giá đỡ tai nghe, Bungee chuột, Đế tản nhiệt'),
(37, 16, 'Chức năng: RGB tích hợp, USB Hub 3.0, Điều khiển âm lượng'),
(38, 17, 'Kích thước: Mid Tower, Full Tower, Mini-ITX'),
(39, 17, 'Số quạt: 3 quạt RGB, 6 quạt 120mm, 4 quạt 140mm'),
(40, 17, 'Chất liệu: Nhôm, Kính cường lực, Thép SPCC'),
(41, 18, 'Số nhân: 6 nhân 12 luồng, 8 nhân 16 luồng'),
(42, 18, 'Tần số: 3.6GHz, 4.2GHz Turbo, 5.0GHz Max'),
(43, 18, 'Cache: 32MB L3, 20MB L3, 16MB L3'),
(44, 19, 'Số nhân: 12 nhân 24 luồng, 16 nhân 32 luồng'),
(45, 19, 'Tần số: 3.4GHz, 4.6GHz Boost, 5.2GHz Max'),
(46, 19, 'Socket: AM4, AM5, LGA 1700'),
(47, 20, 'Chipset: Z690, Z790, B760'),
(48, 20, 'Socket: LGA 1700, LGA 1200'),
(49, 20, 'Kích thước: ATX, Micro-ATX, Mini-ITX'),
(50, 21, 'Chipset: X570, B550, A520'),
(51, 21, 'Socket: AM5, AM4'),
(52, 22, 'Chipset: H610, B660, Z690'),
(53, 22, 'Khe cắm RAM: 4 DIMM DDR4, 2 DIMM DDR5'),
(54, 23, 'Công suất: 650W, 750W, 850W'),
(55, 23, 'Chứng nhận: 80 Plus Gold, 80 Plus Platinum'),
(56, 24, 'Công suất: 1000W, 1200W, 1600W'),
(57, 24, 'Hiệu suất: 92%, 94%, 96%'),
(58, 25, 'Công suất: 500W, 600W, 700W'),
(59, 25, 'Loại cáp: Modular, Semi-modular, Non-modular'),
(60, 26, 'Công suất: 450W, 550W, 750W SFX'),
(61, 27, 'Dung lượng: 500GB, 1TB, 2TB'),
(62, 27, 'Tốc độ đọc: 550MB/s, 3500MB/s, 7000MB/s'),
(63, 28, 'Dung lượng: 1TB, 2TB, 4TB'),
(64, 28, 'Công nghệ: NVMe PCIe 4.0, SATA III, PCIe 5.0'),
(65, 29, 'Dung lượng: 2TB, 4TB, 8TB'),
(66, 29, 'Loại ổ cứng: HDD 7200rpm, SSD 2.5\", M.2 2280'),
(67, 30, 'Dung lượng: 8GB, 16GB, 32GB'),
(68, 30, 'Tần số: 3200MHz, 3600MHz, 4800MHz'),
(69, 31, 'Dung lượng: 16GB, 32GB, 64GB Kit'),
(70, 31, 'Thế hệ: DDR4, DDR5, LPDDR5'),
(71, 32, 'Dung lượng: 8GB x2, 16GB x2, 32GB x2'),
(72, 32, 'Timing: CL16, CL18, CL40'),
(73, 33, 'VRAM: 8GB GDDR6, 12GB GDDR6X, 16GB GDDR6'),
(74, 33, 'Xung nhịp: 1410MHz Base, 1800MHz Boost'),
(75, 34, 'VRAM: 10GB GDDR6X, 24GB GDDR6X'),
(76, 34, 'Công nghệ làm mát: 3 quạt, Hybrid, Tản nhiệt nước'),
(77, 35, 'VRAM: 6GB GDDR6, 8GB GDDR6, 10GB GDDR6X'),
(78, 35, 'Bus: 128-bit, 192-bit, 256-bit, 320-bit'),
(79, 36, 'Kích thước: 24\", 27\", 32\"'),
(80, 36, 'Tần số quét: 144Hz, 165Hz, 240Hz, 360Hz'),
(81, 37, 'Kích thước: 27\", 32\", 34\" Ultrawide'),
(82, 37, 'Độ phân giải: FHD, 2K QHD, 4K UHD'),
(83, 38, 'Kích thước: 24.5\", 27\", 32\" Curved'),
(84, 38, 'Tấm nền: IPS, VA, OLED, Mini-LED'),
(85, 39, 'Kích thước: 27\", 34\" Ultrawide, 49\" Super Ultrawide'),
(86, 39, 'Thời gian phản hồi: 1ms GTG, 0.5ms MPRT'),
(87, 40, 'CPU: Intel Core i5-13600K, i7-13700K, i9-13900K'),
(88, 40, 'VGA: RTX 4060 Ti, RTX 4070, RTX 4080, RTX 4090'),
(89, 40, 'RAM: 16GB DDR5, 32GB DDR5, 64GB DDR5'),
(90, 40, 'SSD: 1TB NVMe, 2TB NVMe PCIe 4.0'),
(91, 41, 'CPU: Ryzen 5 7600X, Ryzen 7 7700X, Ryzen 9 7950X'),
(92, 41, 'VGA: RX 7600, RX 7700 XT, RX 7800 XT, RX 7900 XTX'),
(93, 41, 'RAM: 16GB DDR5, 32GB DDR5, 64GB DDR5'),
(94, 41, 'SSD: 1TB PCIe 4.0, 2TB PCIe 4.0'),
(95, 42, 'Kết nối: 3.5mm, USB, Bluetooth 5.2, Wireless 2.4GHz'),
(96, 42, 'Microphone: Tháo rời, Noise Cancelling, Flip-to-mute'),
(97, 43, 'Công nghệ âm thanh: 7.1 Surround, Dolby Atmos, THX Spatial'),
(98, 43, 'Đệm tai: Memory Foam, Vải Mesh, Da tổng hợp'),
(99, 44, 'Màn hình: 8.3\", 10.9\", 11\", 12.9\" Liquid Retina XDR'),
(100, 44, 'Dung lượng: 64GB, 128GB, 256GB, 512GB, 1TB, 2TB'),
(101, 44, 'Kết nối: Wi-Fi, Wi-Fi + Cellular, 5G'),
(102, 44, 'Chip: A15 Bionic, M1, M2, M3'),
(103, 45, 'CPU: Intel Core i5-13500H, i7-13700H, i9-13980HX'),
(104, 45, 'RAM: 8GB DDR5, 16GB DDR5, 32GB DDR5'),
(105, 45, 'SSD: 512GB PCIe 4.0, 1TB PCIe 4.0, 2TB PCIe 4.0'),
(106, 45, 'Màn hình: 14\" FHD, 15.6\" QHD, 16\" UHD'),
(107, 46, 'CPU: Intel Core i7-13700H, i9-13900H'),
(108, 46, 'VGA: RTX 4050, RTX 4060, RTX 4070, RTX 4080, RTX 4090'),
(109, 46, 'RAM: 16GB DDR5, 32GB DDR5, 64GB DDR5'),
(110, 46, 'SSD: 1TB PCIe 4.0, 2TB PCIe 4.0'),
(111, 47, 'CPU: Ryzen 5 7640U, Ryzen 7 7840U, Ryzen 9 7940HS'),
(112, 47, 'RAM: 16GB LPDDR5, 32GB LPDDR5'),
(113, 47, 'Màn hình: FHD 1920x1080, QHD 2560x1440, UHD 3840x2160'),
(114, 48, 'CPU: Intel Core i5-13500H, i7-13700H'),
(115, 48, 'VGA: RTX 4050 6GB, RTX 4060 8GB'),
(116, 48, 'RAM: 16GB DDR5, 32GB DDR5'),
(117, 49, 'CPU: Ryzen 7 7735HS, Ryzen 9 7945HX'),
(118, 49, 'VGA: RX 7600M XT, RX 7700S, RX 7900M'),
(119, 49, 'RAM: 16GB DDR5, 32GB DDR5, 64GB DDR5'),
(120, 50, 'Chip: M1, M2, M2 Pro, M2 Max, M3, M3 Pro, M3 Max'),
(121, 50, 'RAM: 8GB Unified, 16GB Unified, 32GB Unified, 64GB Unified'),
(122, 50, 'SSD: 256GB, 512GB, 1TB, 2TB, 4TB, 8TB'),
(123, 51, 'CPU: Intel Core i5-1240P, i7-1260P, i9-13900H'),
(124, 51, 'VGA: Intel Iris Xe, Arc A370M, Arc A550M'),
(125, 51, 'RAM: 8GB LPDDR5, 16GB LPDDR5, 32GB LPDDR5'),
(126, 52, 'Màn hình: 6.1\" Super Retina XDR, 6.7\" ProMotion 120Hz'),
(127, 52, 'Dung lượng: 128GB, 256GB, 512GB, 1TB'),
(128, 52, 'Camera: 48MP Main, 12MP Ultra Wide, 12MP 5x Telephoto'),
(129, 52, 'Chip: A16 Bionic, A17 Pro'),
(130, 53, 'Màn hình: 6.4\" Dynamic AMOLED 2X, 6.8\" QHD+ 120Hz'),
(131, 53, 'RAM: 8GB, 12GB, 16GB'),
(132, 53, 'Camera: 200MP Main, 12MP Ultra Wide, 10MP 3x, 10MP 10x'),
(133, 54, 'Màn hình: 6.56\" AMOLED, 6.78\" LTPO AMOLED 144Hz'),
(134, 54, 'RAM: 8GB, 12GB, 16GB, 18GB'),
(135, 54, 'Camera: 50MP Main, 50MP Ultra Wide, 64MP Telephoto');

-- --------------------------------------------------------

--
-- Table structure for table `productcategories`
--

CREATE TABLE `productcategories` (
  `categoryID` int(11) NOT NULL,
  `categoryName` varchar(100) DEFAULT NULL,
  `brandName` varchar(100) NOT NULL,
  `seriesName` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productcategories`
--

INSERT INTO `productcategories` (`categoryID`, `categoryName`, `brandName`, `seriesName`, `description`) VALUES
(1, 'BanPhim', 'Daeru', 'Gaming', 'Bàn phím gaming Daeru'),
(2, 'BanPhim', 'Aula', 'Gaming', 'Bàn phím gaming Aula'),
(3, 'BanPhim', 'Rapoo', 'Gaming', 'Bàn phím gaming Rapoo'),
(4, 'BanPhim', 'Asus', 'ROG', 'Bàn phím gaming Asus ROG'),
(5, 'BanPhim', 'Logitech', 'G Series', 'Bàn phím gaming Logitech G Series'),
(6, 'Mouse', 'Daeru', 'Gaming', 'Chuột gaming Daeru'),
(7, 'Mouse', 'MSI', 'Gaming', 'Chuột gaming MSI'),
(8, 'Mouse', 'Logitech', 'G Series', 'Chuột gaming Logitech G Series'),
(9, 'Mouse', 'Rapoo', 'Gaming', 'Chuột gaming Rapoo'),
(10, 'Mouse', 'Razer', 'DeathAdder', 'Chuột gaming Razer DeathAdder'),
(11, 'Mousepad', 'Daeru', 'Gaming', 'Pad chuột gaming Daeru'),
(12, 'Mousepad', 'Asus', 'ROG', 'Pad chuột gaming Asus ROG'),
(13, 'Mousepad', 'Razer', 'Goliathus', 'Pad chuột gaming Razer Goliathus'),
(14, 'GamingGear', 'Sony', 'PlayStation', 'Phụ kiện gaming Sony PlayStation'),
(15, 'GamingGear', 'Lenovo', 'Legion', 'Phụ kiện gaming Lenovo Legion'),
(16, 'GamingGear', 'Daeru', 'Pro', 'Phụ kiện gaming Daeru Pro'),
(17, 'Case', 'T01', 'Standard', 'Vỏ case máy tính T01'),
(18, 'CPU', 'AMD', 'Ryzen', 'Bộ xử lý AMD Ryzen'),
(19, 'CPU', 'Intel', 'Core', 'Bộ xử lý Intel Core'),
(20, 'Main', 'Asus', 'ROG', 'Bo mạch chủ Asus ROG'),
(21, 'Main', 'Gigabyte', 'Aorus', 'Bo mạch chủ Gigabyte Aorus'),
(22, 'Main', 'MSI', 'MPG', 'Bo mạch chủ MSI MPG'),
(23, 'PSU', 'Asus', 'ROG', 'Nguồn máy tính Asus ROG'),
(24, 'PSU', 'Corsair', 'RM Series', 'Nguồn máy tính Corsair RM Series'),
(25, 'PSU', 'Deepcool', 'PQ Series', 'Nguồn máy tính Deepcool PQ Series'),
(26, 'PSU', 'MSI', 'MPG', 'Nguồn máy tính MSI MPG'),
(27, 'HDD', 'Kingston', 'SSD', 'Ổ cứng thể rắn Kingston SSD'),
(28, 'HDD', 'Samsung', 'EVO', 'Ổ cứng thể rắn Samsung EVO'),
(29, 'HDD', 'Western Digital', 'Blue', 'Ổ cứng Western Digital Blue'),
(30, 'RAM', 'Kingston', 'Fury', 'Bộ nhớ RAM Kingston Fury'),
(31, 'RAM', 'Corsair', 'Vengeance', 'Bộ nhớ RAM Corsair Vengeance'),
(32, 'RAM', 'PNY', 'XLR8', 'Bộ nhớ RAM PNY XLR8'),
(33, 'VGA', 'Asus', 'ROG Strix', 'Card đồ họa Asus ROG Strix'),
(34, 'VGA', 'MSI', 'Gaming X', 'Card đồ họa MSI Gaming X'),
(35, 'VGA', 'Gigabyte', 'Aorus', 'Card đồ họa Gigabyte Aorus'),
(36, 'screen', 'Asus', 'TUF Gaming', 'Màn hình gaming Asus TUF Gaming'),
(37, 'screen', 'Acer', 'Predator', 'Màn hình gaming Acer Predator'),
(38, 'screen', 'LG', 'UltraGear', 'Màn hình gaming LG UltraGear'),
(39, 'screen', 'MSI', 'Optix', 'Màn hình gaming MSI Optix'),
(40, 'PC', 'MSI', 'Gaming', 'PC gaming MSI'),
(41, 'PC', 'Asus', 'ROG', 'PC gaming Asus ROG'),
(42, 'Headphone', 'Asus', 'ROG', 'Tai nghe gaming Asus ROG'),
(43, 'Headphone', 'Razer', 'Kraken', 'Tai nghe gaming Razer Kraken'),
(44, 'iPad', 'Apple', 'iPad', 'Máy tính bảng Apple iPad'),
(45, 'Laptop', 'Acer', 'Nitro', 'Laptop Acer Nitro'),
(46, 'Laptop', 'Asus', 'ROG', 'Laptop gaming Asus ROG'),
(47, 'Laptop', 'Dell', 'XPS', 'Laptop Dell XPS'),
(48, 'Laptop', 'Gigabyte', 'Aorus', 'Laptop gaming Gigabyte Aorus'),
(49, 'Laptop', 'Lenovo', 'Legion', 'Laptop gaming Lenovo Legion'),
(50, 'Laptop', 'Apple', 'MacBook', 'Laptop Apple MacBook'),
(51, 'Laptop', 'MSI', 'Stealth', 'Laptop gaming MSI Stealth'),
(52, 'Phone', 'Apple', 'iPhone', 'Điện thoại Apple iPhone'),
(53, 'Phone', 'Samsung', 'Galaxy', 'Điện thoại Samsung Galaxy'),
(54, 'Phone', 'Xiaomi', 'Redmi', 'Điện thoại Xiaomi Redmi');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productID` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `supplierID` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stockQuantity` int(11) NOT NULL,
  `availability` enum('In Stock','Out of Stock') NOT NULL DEFAULT 'In Stock',
  `image` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productID`, `productName`, `categoryID`, `supplierID`, `description`, `price`, `stockQuantity`, `availability`, `image`, `createdAt`) VALUES
(1, 'Bàn phím Daeru Gaming RGB', 1, 1, 'Bàn phím cơ Daeru với đèn LED RGB, thiết kế gaming hiện đại và chất lượng cao', 1200000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033646/ReactNew/anh/Computer/BanPhim/hktgvgk8h3oddq1nzb1l.webp', '2025-05-06 15:29:48'),
(2, 'Bàn phím Daeru Rainbow', 1, 1, 'Bàn phím cơ Daeru với đèn LED Rainbow đa sắc, switch độ nhạy cao', 1350000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033645/ReactNew/anh/Computer/BanPhim/sp4ysnpymi6aeyp8wc3z.webp', '2025-05-06 15:29:48'),
(3, 'Bàn phím Daeru Pro RGB', 1, 1, 'Bàn phím cơ Daeru Pro với LED RGB có thể tùy chỉnh, keycap bền bỉ', 1500000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033645/ReactNew/anh/Computer/BanPhim/xqruaklz4sd1eqaspbqc.webp', '2025-05-06 15:29:48'),
(4, 'Bàn phím Daeru Black RGB', 1, 1, 'Bàn phím cơ Daeru màu đen với đèn LED RGB, thiết kế tối giản', 1250000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033645/ReactNew/anh/Computer/BanPhim/jytz4fq7addsb27xzydq.webp', '2025-05-06 15:29:48'),
(5, 'Bàn phím Daeru Pink', 1, 1, 'Bàn phím cơ Daeru màu hồng với đèn LED, thiết kế dễ thương cho game thủ', 1450000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033644/ReactNew/anh/Computer/BanPhim/d57uf4sgnkd2cq8wzxvn.webp', '2025-05-06 15:29:48'),
(6, 'Bàn phím Aula Gaming RGB', 2, 2, 'Bàn phím cơ Aula với đèn LED RGB, thiết kế chuyên gaming', 1100000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033644/ReactNew/anh/Computer/BanPhim/icx2san06sjczdixkrz7.webp', '2025-05-06 15:29:48'),
(7, 'Bàn phím Aula Rainbow', 2, 2, 'Bàn phím cơ Aula với đèn LED Rainbow, switch độ bền cao', 1300000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033644/ReactNew/anh/Computer/BanPhim/fupzj3gudn0d79c4z5di.webp', '2025-05-06 15:29:48'),
(8, 'Bàn phím Aula RGB Pro', 2, 2, 'Bàn phím cơ Aula RGB Pro với đèn LED RGB full, keycap độ bền cao', 1550000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033644/ReactNew/anh/Computer/BanPhim/bjuydgkhls5kqzrbfafj.webp', '2025-05-06 15:29:48'),
(9, 'Bàn phím Aula RGB Compact', 2, 2, 'Bàn phím cơ Aula thiết kế nhỏ gọn với đèn LED RGB', 950000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033644/ReactNew/anh/Computer/BanPhim/p3dbsxoqhdzgtxov9pfr.webp', '2025-05-06 15:29:48'),
(10, 'Bàn phím Rapoo Gaming RGB', 3, 3, 'Bàn phím cơ Rapoo với đèn LED RGB, thiết kế chuyên gaming', 1650000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033642/ReactNew/anh/Computer/BanPhim/jpvjynv6bisdtye12bjw.webp', '2025-05-06 15:29:48'),
(11, 'Bàn phím Rapoo White RGB', 3, 3, 'Bàn phím cơ Rapoo màu trắng với đèn LED RGB đa sắc', 1700000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033642/ReactNew/anh/Computer/BanPhim/v1ts1gbfratxz3lnr3rx.webp', '2025-05-06 15:29:48'),
(12, 'Bàn phím Rapoo Blue LED', 3, 3, 'Bàn phím cơ Rapoo với đèn LED màu xanh, switch độ bền cao', 1600000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033642/ReactNew/anh/Computer/BanPhim/yq2v6lo7nbrqturnyjht.webp', '2025-05-06 15:29:48'),
(13, 'Bàn phím Rapoo Red Gaming', 3, 3, 'Bàn phím cơ Rapoo với đèn LED màu đỏ, thiết kế gaming', 1550000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033642/ReactNew/anh/Computer/BanPhim/sgrslom19uwdowpyidmg.webp', '2025-05-06 15:29:48'),
(14, 'Bàn phím Asus ROG RGB', 4, 4, 'Bàn phím cơ Asus ROG với đèn LED RGB, thiết kế gaming cao cấp', 2500000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033642/ReactNew/anh/Computer/BanPhim/uxotq94qlvic1mzubxec.webp', '2025-05-06 15:29:48'),
(15, 'Bàn phím Asus ROG Azoth', 4, 4, 'Bàn phím cơ Asus ROG Azoth với đèn LED RGB, switch độ nhạy cao', 2700000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033641/ReactNew/anh/Computer/BanPhim/rzurz5rfkson9zqxva6p.webp', '2025-05-06 15:29:48'),
(16, 'Bàn phím Asus ROG Falchion', 4, 4, 'Bàn phím cơ Asus ROG Falchion với đèn LED RGB, thiết kế nhỏ gọn', 2300000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033641/ReactNew/anh/Computer/BanPhim/z9rsgx3hwzpuhynnhflh.webp', '2025-05-06 15:29:48'),
(17, 'Bàn phím Asus TUF Gaming', 4, 4, 'Bàn phím cơ Asus TUF Gaming với đèn LED RGB đa sắc', 1950000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033641/ReactNew/anh/Computer/BanPhim/bmo3r1l21qg6aiiqqdzj.webp', '2025-05-06 15:29:48'),
(18, 'Bàn phím Logitech G Pro X', 5, 5, 'Bàn phím cơ Logitech G Pro X với đèn LED RGB, switch GX có thể thay đổi', 2800000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033641/ReactNew/anh/Computer/BanPhim/hcmg657jky6eb337r2fu.webp', '2025-05-06 15:29:48'),
(19, 'Bàn phím Logitech G Pro', 5, 5, 'Bàn phím cơ Logitech G Pro với đèn LED RGB, thiết kế tối giản', 2600000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033641/ReactNew/anh/Computer/BanPhim/tcgkhamov7ipynakkmbz.webp', '2025-05-06 15:29:48'),
(20, 'Chuột Daeru EM911X RGB', 6, 1, 'Chuột gaming Daeru EM911X với đèn LED RGB, DPI cao và thiết kế công thái học', 450000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033648/ReactNew/anh/Computer/Chuot/vmzavsboqsjxifkn0tb7.webp', '2025-05-06 15:29:48'),
(21, 'Chuột Daeru EM901X', 6, 1, 'Chuột gaming Daeru EM901X không dây với cảm biến độ nhạy cao', 550000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033648/ReactNew/anh/Computer/Chuot/ucreeq2lgahsaoqibw9o.webp', '2025-05-06 15:29:48'),
(22, 'Chuột Daeru EM908', 6, 1, 'Chuột gaming Daeru EM908 với đèn LED RGB và cảm biến PAW3335', 650000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033648/ReactNew/anh/Computer/Chuot/jmpent3xk2qmtb7i3jtj.webp', '2025-05-06 15:29:48'),
(23, 'Chuột Daeru A918', 6, 1, 'Chuột gaming Daeru A918 không dây với thời lượng pin dài', 750000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033648/ReactNew/anh/Computer/Chuot/y7aysyypgg3yaoaz8vdq.webp', '2025-05-06 15:29:48'),
(24, 'Chuột Daeru EM945', 6, 1, 'Chuột gaming Daeru EM945 với DPI 16000 và thiết kế công thái học', 850000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033648/ReactNew/anh/Computer/Chuot/dsytqioymkjiizul3iux.webp', '2025-05-06 15:29:48'),
(25, 'Chuột MSI Clutch GM08', 7, 7, 'Chuột gaming MSI Clutch GM08 với đèn LED RGB và cảm biến chuẩn xác', 750000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033648/ReactNew/anh/Computer/Chuot/dkfauy5feeg2kfx5cp91.webp', '2025-05-06 15:29:48'),
(26, 'Chuột MSI Clutch GM30', 7, 7, 'Chuột gaming MSI Clutch GM30 với đèn LED RGB và Switch OMRON', 850000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033647/ReactNew/anh/Computer/Chuot/qq6ww7rnxnr2c9fgrasr.webp', '2025-05-06 15:29:48'),
(27, 'Chuột MSI Clutch GM31', 7, 7, 'Chuột gaming MSI Clutch GM31 không dây với thời lượng pin dài', 1200000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033647/ReactNew/anh/Computer/Chuot/fspyzozdotyivvadrb9w.webp', '2025-05-06 15:29:48'),
(28, 'Chuột Logitech G Pro X Superlight', 8, 5, 'Chuột gaming Logitech G Pro X Superlight siêu nhẹ với cảm biến HERO', 2800000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033647/ReactNew/anh/Computer/Chuot/twz30ahpofrrjjhsfaoa.webp', '2025-05-06 15:29:48'),
(29, 'Chuột Logitech G502 X', 8, 5, 'Chuột gaming Logitech G502 X với cảm biến HERO 25K và 11 nút có thể lập trình', 2200000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033647/ReactNew/anh/Computer/Chuot/xnrsjfyt53jyewiti75i.webp', '2025-05-06 15:29:48'),
(30, 'Chuột Logitech G Pro', 8, 5, 'Chuột gaming Logitech G Pro có dây với cảm biến HERO và thiết kế nhẹ', 1500000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033647/ReactNew/anh/Computer/Chuot/v8oovejtdbrndm8ryyib.webp', '2025-05-06 15:29:48'),
(31, 'Chuột Rapoo V16 Pro', 9, 3, 'Chuột gaming Rapoo V16 Pro với đèn LED RGB và cảm biến PixArt', 550000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033647/ReactNew/anh/Computer/Chuot/xnsrhzyp0iyhbyjxd2ch.webp', '2025-05-06 15:29:48'),
(32, 'Chuột Rapoo VT200', 9, 3, 'Chuột gaming Rapoo VT200 không dây với Pin sạc và đèn RGB', 750000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033647/ReactNew/anh/Computer/Chuot/zkpnmfrimceqoaap7mrk.webp', '2025-05-06 15:29:48'),
(33, 'Chuột Rapoo V280', 9, 3, 'Chuột gaming Rapoo V280 với cảm biến PMW3389 và DPI 16000', 650000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033646/ReactNew/anh/Computer/Chuot/geaowpussttntlrdau6e.webp', '2025-05-06 15:29:48'),
(34, 'Chuột Rapoo V320', 9, 3, 'Chuột gaming Rapoo V320 với đèn LED RGB và 8 nút có thể lập trình', 850000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033646/ReactNew/anh/Computer/Chuot/sahkt7pfjcie460tfpn4.webp', '2025-05-06 15:29:48'),
(35, 'Chuột Rapoo V330', 9, 3, 'Chuột gaming Rapoo V330 với thiết kế công thái học và cảm biến chuẩn xác', 950000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033646/ReactNew/anh/Computer/Chuot/nryegqzcq99mdekjlvkn.webp', '2025-05-06 15:29:48'),
(36, 'Chuột Razer DeathAdder V3', 10, 10, 'Chuột gaming Razer DeathAdder V3 với công nghệ Razer Focus+ và công thái học tối ưu', 2500000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033646/ReactNew/anh/Computer/Chuot/bpp4fcxxjvyb9asuxhv0.webp', '2025-05-06 15:29:48'),
(37, 'Chuột Razer Basilisk V3', 10, 10, 'Chuột gaming Razer Basilisk V3 với 11 nút có thể lập trình và con lăn đa năng', 2200000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033646/ReactNew/anh/Computer/Chuot/nwn8won2m4zhnhavl1pq.webp', '2025-05-06 15:29:48'),
(38, 'Chuột Razer Viper Ultimate', 10, 10, 'Chuột gaming Razer Viper Ultimate không dây với cảm biến Focus+ và công nghệ HyperSpeed', 3200000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033646/ReactNew/anh/Computer/Chuot/wgsnnqdkbsqueif1j8p4.webp', '2025-05-06 15:29:48'),
(39, 'Chuột Razer Pink Edition', 10, 10, 'Chuột gaming Razer phiên bản màu hồng với đèn LED Chroma RGB', 1800000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033646/ReactNew/anh/Computer/Chuot/aaplofca4wvsb4xzj4le.webp', '2025-05-06 15:29:48'),
(40, 'Chuột Razer Viper V2 Pro', 10, 10, 'Chuột gaming Razer Viper V2 Pro siêu nhẹ với cảm biến Focus Pro 30K', 3500000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033645/ReactNew/anh/Computer/Chuot/aykegymyxmkd1c965rja.webp', '2025-05-06 15:29:48'),
(41, 'Tay cầm PS5 DualSense', 14, 4, 'Tay cầm Sony PS5 DualSense chính hãng với phản hồi xúc giác và cò adaptive', 1800000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033649/ReactNew/anh/Computer/GamingGear/rrlich4vmblr5axo5fbi.webp', '2025-05-06 15:29:48'),
(42, 'Máy PlayStation 5 Slim', 14, 4, 'Máy chơi game Sony PlayStation 5 Slim chính hãng với bộ nhớ 825GB SSD', 13500000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033649/ReactNew/anh/Computer/GamingGear/eoyrjvoqwji5gussw0e6.webp', '2025-05-06 15:29:48'),
(43, 'Tay cầm Daeru H105', 16, 1, 'Tay cầm chơi game Daeru H105 không dây với Pin sạc và chức năng rung', 850000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033648/ReactNew/anh/Computer/GamingGear/lto5zmqmw49m1pqei7iw.webp', '2025-05-06 15:29:48'),
(44, 'Lenovo Legion Go', 15, 5, 'Máy chơi game cầm tay Lenovo Legion Go với màn hình 8.8 inch và chip AMD Ryzen Z1 Extreme', 18500000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033648/ReactNew/anh/Computer/GamingGear/em5os06uzlphfay6xbaq.webp', '2025-05-06 15:29:48'),
(45, 'Case Xigmatek Alpha M-3GF', 17, 7, 'Vỏ case máy tính Xigmatek Alpha M-3GF với thiết kế gaming, hỗ trợ đèn RGB và tản nhiệt tốt', 1500000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033650/ReactNew/anh/Computer/LinhKien/Case/l8kfs8rhrqthunxwsxub.webp', '2025-05-06 15:29:48'),
(46, 'Case Cougar MX410', 17, 7, 'Vỏ case máy tính Cougar MX410 với mặt trước trong suốt, hỗ trợ LED RGB', 1650000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033650/ReactNew/anh/Computer/LinhKien/Case/ymda33bgpssfhtl189lm.webp', '2025-05-06 15:29:48'),
(47, 'Case Corsair 4000D', 17, 7, 'Vỏ case máy tính Corsair 4000D Airflow với thiết kế tối ưu luồng không khí', 2200000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033649/ReactNew/anh/Computer/LinhKien/Case/kcfkzyeqsqk1e3xklzzn.webp', '2025-05-06 15:29:48'),
(48, 'Case Cooler Master TD500', 17, 7, 'Vỏ case máy tính Cooler Master TD500 Mesh với mặt trước lưới tản nhiệt', 1950000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033649/ReactNew/anh/Computer/LinhKien/Case/ogxdejjongtvyefptg8p.webp', '2025-05-06 15:29:48'),
(49, 'Case NZXT H510', 17, 7, 'Vỏ case máy tính NZXT H510 với thiết kế tối giản, chất lượng cao', 2100000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033649/ReactNew/anh/Computer/LinhKien/Case/ctjv5o4o4nrgipfius5k.webp', '2025-05-06 15:29:48'),
(50, 'Case Thermaltake H350', 17, 7, 'Vỏ case máy tính Thermaltake H350 TG RGB với mặt hông kính cường lực', 1850000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033649/ReactNew/anh/Computer/LinhKien/Case/nejc4dcao1mwhuyuktvd.webp', '2025-05-06 15:29:48'),
(51, 'Case Thermaltake V250', 17, 7, 'Vỏ case máy tính Thermaltake V250 TG ARGB với đèn LED RGB mặt trước', 1750000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033649/ReactNew/anh/Computer/LinhKien/Case/rjutgnjzqlqvohajry3m.webp', '2025-05-06 15:29:48'),
(52, 'CPU AMD Ryzen 7 7800X3D', 18, 8, 'Bộ vi xử lý AMD Ryzen 7 7800X3D với 8 nhân 16 luồng, 96MB cache và xung nhịp tối đa 5.0GHz', 12500000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/CPU/r0msi67zz5aimg9wao9n.webp', '2025-05-06 15:29:48'),
(53, 'CPU AMD Ryzen 7 7800X', 18, 8, 'Bộ vi xử lý AMD Ryzen 7 7800X với 8 nhân 16 luồng và xung nhịp tối đa 5.4GHz', 11200000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033651/ReactNew/anh/Computer/LinhKien/CPU/i4jxhq9fmt6xn6zmcfmw.webp', '2025-05-06 15:29:48'),
(54, 'CPU AMD Ryzen 9', 18, 8, 'Bộ vi xử lý AMD Ryzen 9 với nhiều nhân cao và hiệu năng mạnh mẽ', 15500000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033651/ReactNew/anh/Computer/LinhKien/CPU/t9ayccnt0pa9j6lpnwmc.webp', '2025-05-06 15:29:48'),
(55, 'CPU AMD Ryzen 5', 18, 8, 'Bộ vi xử lý AMD Ryzen 5 với hiệu năng tốt cho gaming và đa nhiệm', 8500000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033651/ReactNew/anh/Computer/LinhKien/CPU/rcn4ouazsz0hij0m1v5x.webp', '2025-05-06 15:29:48'),
(56, 'CPU Intel Core i9-14900K', 19, 9, 'Bộ vi xử lý Intel Core i9-14900K với 24 nhân (8P+16E), 32 luồng và xung nhịp tối đa 6.0GHz', 16500000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033651/ReactNew/anh/Computer/LinhKien/CPU/pwe01hmscvia0stwdh1v.webp', '2025-05-06 15:29:48'),
(57, 'CPU Intel Core i7', 19, 9, 'Bộ vi xử lý Intel Core i7 với hiệu năng cao cho gaming và công việc chuyên nghiệp', 12500000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033651/ReactNew/anh/Computer/LinhKien/CPU/gidkd0quxcaoogtiurxx.webp', '2025-05-06 15:29:48'),
(58, 'CPU Intel Core i5', 19, 9, 'Bộ vi xử lý Intel Core i5 với hiệu năng tốt cho gaming và công việc hàng ngày', 8900000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033650/ReactNew/anh/Computer/LinhKien/CPU/wwd9lkd0ycpgiqmxquww.webp', '2025-05-06 15:29:48'),
(59, 'Bo mạch chủ Asus ROG Strix Z790-E', 20, 4, 'Bo mạch chủ Asus ROG Strix Z790-E Gaming WiFi với chipset Intel Z790, hỗ trợ DDR5 và PCIe 5.0', 12500000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Main/qkrji5vtwlhfyrovjf9k.webp', '2025-05-06 15:29:48'),
(60, 'Bo mạch chủ Asus ROG Strix B760', 20, 4, 'Bo mạch chủ Asus ROG Strix B760 với chipset Intel B760 và hỗ trợ CPU Intel thế hệ 13', 7500000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Main/ip2i5abglayzokyq35tw.webp', '2025-05-06 15:29:48'),
(61, 'Bo mạch chủ Asus ROG Strix X670E', 20, 4, 'Bo mạch chủ Asus ROG Strix X670E với chipset AMD X670 và hỗ trợ CPU AMD Ryzen thế hệ mới', 11500000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Main/sq11u5xydhsypycxqokh.webp', '2025-05-06 15:29:48'),
(62, 'Bo mạch chủ Asus TUF Gaming B650', 20, 4, 'Bo mạch chủ Asus TUF Gaming B650 với chipset AMD B650 và thiết kế bền bỉ', 6500000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033653/ReactNew/anh/Computer/LinhKien/Main/zfhiuh46smpgi8ml6hpr.webp', '2025-05-06 15:29:48'),
(63, 'Bo mạch chủ Asus Prime Z790', 20, 4, 'Bo mạch chủ Asus Prime Z790 với chipset Intel Z790 và thiết kế tối giản', 8500000.00, 14, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033653/ReactNew/anh/Computer/LinhKien/Main/vviwe4ni23bbno91niwo.webp', '2025-05-06 15:29:48'),
(64, 'Bo mạch chủ Gigabyte Z790 Aorus Elite', 21, 11, 'Bo mạch chủ Gigabyte Z790 Aorus Elite với chipset Intel Z790, hỗ trợ DDR5 và PCIe 5.0', 9500000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033653/ReactNew/anh/Computer/LinhKien/Main/m12qsqdecuiooi614ohb.webp', '2025-05-06 15:29:48'),
(65, 'Bo mạch chủ Gigabyte B650 Aorus Elite', 21, 11, 'Bo mạch chủ Gigabyte B650 Aorus Elite với chipset AMD B650 và hỗ trợ CPU AMD Ryzen', 6800000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033653/ReactNew/anh/Computer/LinhKien/Main/zx3rbakwhjq4r2zosjca.webp', '2025-05-06 15:29:48'),
(66, 'Bo mạch chủ Gigabyte Z790 Aorus Master', 21, 11, 'Bo mạch chủ Gigabyte Z790 Aorus Master với thiết kế cao cấp và nhiều tính năng', 14500000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033653/ReactNew/anh/Computer/LinhKien/Main/ywghx08nrdibqpoequr0.webp', '2025-05-06 15:29:48'),
(67, 'Bo mạch chủ Gigabyte B760 Aorus Elite', 21, 11, 'Bo mạch chủ Gigabyte B760 Aorus Elite với chipset Intel B760', 5800000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/b3t5xq17hz1bkvay05js.webp', '2025-05-06 15:29:48'),
(68, 'Bo mạch chủ Gigabyte X670E Aorus Master', 21, 11, 'Bo mạch chủ Gigabyte X670E Aorus Master với chipset AMD X670E cao cấp', 13500000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/bkcvchcftxzbgl3wh4yi.webp', '2025-05-06 15:29:48'),
(69, 'Bo mạch chủ MSI MPG Z790 Carbon', 22, 7, 'Bo mạch chủ MSI MPG Z790 Carbon WiFi với chipset Intel Z790, hỗ trợ DDR5 và PCIe 5.0', 11500000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/jdjuds7quen49i0nhrev.webp', '2025-05-06 15:29:48'),
(70, 'Bo mạch chủ MSI MPG B650 Carbon', 22, 7, 'Bo mạch chủ MSI MPG B650 Carbon WiFi với chipset AMD B650', 8500000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/sat5ripbukeocpdubfah.jpg', '2025-05-06 15:29:48'),
(71, 'Bo mạch chủ MSI MEG Z790 Ace', 22, 7, 'Bo mạch chủ MSI MEG Z790 Ace với thiết kế cao cấp và nhiều tính năng', 18500000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/phjmtres4dtg5p2ekl5y.webp', '2025-05-06 15:29:48'),
(72, 'Bo mạch chủ MSI MAG B760 Tomahawk', 22, 7, 'Bo mạch chủ MSI MAG B760 Tomahawk WiFi với chipset Intel B760', 6500000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033652/ReactNew/anh/Computer/LinhKien/Main/xfld5wxegrlcffne5t4i.webp', '2025-05-06 15:29:48'),
(73, 'Nguồn Asus ROG Strix 850W', 23, 4, 'Nguồn máy tính Asus ROG Strix 850W 80 Plus Gold với hiệu suất cao và hoạt động êm ái', 3500000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/Nguon/kkvxrpe87rir1pa4qurt.webp', '2025-05-06 15:29:48'),
(74, 'Nguồn Asus ROG Thor 1000W', 23, 4, 'Nguồn máy tính Asus ROG Thor 1000W 80 Plus Platinum với màn hình OLED hiển thị công suất', 5500000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033656/ReactNew/anh/Computer/LinhKien/Nguon/xbkuougm3kmqdk5wabyi.webp', '2025-05-06 15:29:48'),
(75, 'Nguồn Asus TUF Gaming 750W', 23, 4, 'Nguồn máy tính Asus TUF Gaming 750W 80 Plus Bronze với độ bền cao', 2500000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033656/ReactNew/anh/Computer/LinhKien/Nguon/v6rboryzpwloyaarwblr.webp', '2025-05-06 15:29:48'),
(76, 'Nguồn Asus ROG Strix 1000W', 23, 4, 'Nguồn máy tính Asus ROG Strix 1000W 80 Plus Gold với dây cáp có thể tháo rời', 4800000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033656/ReactNew/anh/Computer/LinhKien/Nguon/i8bg9cfccqds1k47vuit.webp', '2025-05-06 15:29:48'),
(77, 'Nguồn Asus TUF Gaming 650W', 23, 4, 'Nguồn máy tính Asus TUF Gaming 650W 80 Plus Bronze với giá thành hợp lý', 2200000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033656/ReactNew/anh/Computer/LinhKien/Nguon/ylzo86jgqkfaqqqsnla5.webp', '2025-05-06 15:29:48'),
(78, 'Nguồn Corsair RM750x', 24, 4, 'Nguồn máy tính Corsair RM750x 80 Plus Gold với dây cáp đen nguyên khối và hoạt động êm ái', 3200000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/crmitbpyirxgck4t80qf.webp', '2025-05-06 15:29:48'),
(79, 'Nguồn Corsair RM850x', 24, 4, 'Nguồn máy tính Corsair RM850x 80 Plus Gold với hiệu suất cao và tụ nhôm chất lượng Nhật Bản', 3800000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/deyzmiprrfvuetz90zzh.webp', '2025-05-06 15:29:48'),
(80, 'Nguồn Corsair CX650M', 24, 4, 'Nguồn máy tính Corsair CX650M 80 Plus Bronze với giá thành hợp lý', 2000000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/qxoo2zotyroajtbbpkyg.webp', '2025-05-06 15:29:48'),
(81, 'Nguồn Corsair HX1000', 24, 4, 'Nguồn máy tính Corsair HX1000 80 Plus Platinum với hiệu suất cực cao', 5200000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/aqmqshnq5fgqcdophuw2.webp', '2025-05-06 15:29:48'),
(82, 'Nguồn Deepcool PQ650M', 25, 5, 'Nguồn máy tính Deepcool PQ650M 80 Plus Gold với thiết kế nhỏ gọn', 1800000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/uuppd9fi8xdusqomhors.webp', '2025-05-06 15:29:48'),
(83, 'Nguồn Deepcool DQ850-M', 25, 5, 'Nguồn máy tính Deepcool DQ850-M 80 Plus Gold với dây cáp có thể tháo rời', 2500000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/rc1zcm9iaxurqgxrwk3w.webp', '2025-05-06 15:29:48'),
(84, 'Nguồn Deepcool PF650', 25, 5, 'Nguồn máy tính Deepcool PF650 80 Plus Platinum với hiệu suất cao', 3200000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/siecbrg2wnut7calyivv.jpg', '2025-05-06 15:29:48'),
(85, 'Nguồn Deepcool PQ750M', 25, 5, 'Nguồn máy tính Deepcool PQ750M 80 Plus Gold với quạt 120mm', 2200000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033655/ReactNew/anh/Computer/LinhKien/Nguon/enp86kvowbpnygsktz3f.webp', '2025-05-06 15:29:48'),
(86, 'Nguồn MSI MPG A750GF', 26, 7, 'Nguồn máy tính MSI MPG A750GF 80 Plus Gold với dây cáp đen nguyên khối', 2800000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Nguon/fg68t0bomljyueiamh4x.webp', '2025-05-06 15:29:48'),
(87, 'Nguồn MSI MPG A850GF', 26, 7, 'Nguồn máy tính MSI MPG A850GF 80 Plus Gold với hiệu suất chuyển đổi cao', 3500000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Nguon/zylmpbgvdgiwh8cb63e8.webp', '2025-05-06 15:29:48'),
(88, 'Nguồn MSI MAG A650BN', 26, 7, 'Nguồn máy tính MSI MAG A650BN 80 Plus Bronze với giá thành hợp lý', 1500000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Nguon/dlrskfg1qalbuhyvozzm.webp', '2025-05-06 15:29:48'),
(89, 'Nguồn MSI MPG A1000G', 26, 7, 'Nguồn máy tính MSI MPG A1000G 80 Plus Gold với công suất cao', 4500000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Nguon/y3iyijfdvl2mezbkuwwo.webp', '2025-05-06 15:29:48'),
(90, 'Nguồn MSI MAG A550BN', 26, 7, 'Nguồn máy tính MSI MAG A550BN 80 Plus Bronze cho hệ thống entry level', 1300000.00, 30, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033654/ReactNew/anh/Computer/LinhKien/Nguon/ihwx9gqo5qzt7j5ysiit.webp', '2025-05-06 15:29:48'),
(91, 'SSD Kingston NV2 1TB', 27, 7, 'Ổ cứng SSD Kingston NV2 1TB PCIe 4.0 NVMe với tốc độ đọc/ghi cao', 1950000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/bt2fc8mmzuzvgmzmjzcm.webp', '2025-05-06 15:29:48'),
(92, 'SSD Kingston KC3000 2TB', 27, 7, 'Ổ cứng SSD Kingston KC3000 2TB PCIe 4.0 NVMe với hiệu năng cực cao', 4500000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/klrjb5lfsuloqoawzjfv.webp', '2025-05-06 15:29:48'),
(93, 'SSD Kingston A400 480GB', 27, 7, 'Ổ cứng SSD Kingston A400 480GB SATA 3 với giá thành hợp lý', 950000.00, 30, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/c0ykaerwlbndzgaztlmh.webp', '2025-05-06 15:29:48'),
(94, 'SSD Kingston NV1 500GB', 27, 7, 'Ổ cứng SSD Kingston NV1 500GB PCIe 3.0 NVMe với tốc độ cao', 1200000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/ssjqlcakrlixaisi0hry.webp', '2025-05-06 15:29:48'),
(95, 'SSD Kingston KC3000 1TB', 27, 7, 'Ổ cứng SSD Kingston KC3000 1TB PCIe 4.0 NVMe với tản nhiệt aluminum', 2500000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/oyicez8tmysp5xzwpcs6.webp', '2025-05-06 15:29:48'),
(96, 'SSD Samsung 990 PRO 2TB', 28, 8, 'Ổ cứng SSD Samsung 990 PRO 2TB PCIe 4.0 NVMe với tốc độ đọc/ghi lên đến 7450/6900 MB/s', 5500000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033658/ReactNew/anh/Computer/LinhKien/OCung/twrjrv2llt5uwf7jxlpe.webp', '2025-05-06 15:29:48'),
(97, 'SSD Samsung 990 PRO 1TB', 28, 8, 'Ổ cứng SSD Samsung 990 PRO 1TB PCIe 4.0 NVMe với controller Samsung Elpis', 3200000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/ijyhgygmhk656orspdhg.webp', '2025-05-06 15:29:48'),
(98, 'SSD Samsung 870 EVO 1TB', 28, 8, 'Ổ cứng SSD Samsung 870 EVO 1TB SATA 3 với độ bền cao', 2300000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/nhj6wfhycpi9yxuv0laj.webp', '2025-05-06 15:29:48'),
(99, 'SSD Samsung 980 PRO 2TB', 28, 8, 'Ổ cứng SSD Samsung 980 PRO 2TB PCIe 4.0 NVMe với tản nhiệt', 4800000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/sklgycvnkgc8bfunxrat.webp', '2025-05-06 15:29:48'),
(100, 'SSD Samsung 980 1TB', 28, 8, 'Ổ cứng SSD Samsung 980 1TB PCIe 3.0 NVMe với giá thành hợp lý', 2200000.00, 22, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/qin79lsktocivcchlk3j.webp', '2025-05-06 15:29:48'),
(101, 'SSD WD Blue SN570 1TB', 29, 9, 'Ổ cứng SSD Western Digital Blue SN570 1TB PCIe 3.0 NVMe với tốc độ đọc lên đến 3500MB/s', 2100000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/gl8mkb7rzufkgwd5nnxs.webp', '2025-05-06 15:29:48'),
(102, 'SSD WD Black SN850X 2TB', 29, 9, 'Ổ cứng SSD Western Digital Black SN850X 2TB PCIe 4.0 NVMe với hiệu năng cực cao', 5200000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/a64mf6z39ronxcdj0wvl.webp', '2025-05-06 15:29:48'),
(103, 'SSD WD Green 480GB', 29, 9, 'Ổ cứng SSD Western Digital Green 480GB SATA 3 với giá thành hợp lý', 900000.00, 30, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/gcwfga6cdmgyrckka6s6.webp', '2025-05-06 15:29:48'),
(104, 'SSD WD Black SN770 1TB', 29, 9, 'Ổ cứng SSD Western Digital Black SN770 1TB PCIe 4.0 NVMe', 2500000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033657/ReactNew/anh/Computer/LinhKien/OCung/mhw7t9d5g1zgqgjtpciv.webp', '2025-05-06 15:29:48'),
(105, 'SSD WD Blue 3D NAND 1TB', 29, 9, 'Ổ cứng SSD Western Digital Blue 3D NAND 1TB SATA 3', 2000000.00, 22, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033656/ReactNew/anh/Computer/LinhKien/OCung/lrxkpljuvpfzlnywrqdg.webp', '2025-05-06 15:29:48'),
(106, 'Kingston Fury RGB DDR4 16GB 3200MHz', 30, 1, 'Bộ nhớ RAM Kingston Fury RGB DDR4 với hiệu suất cao và đèn LED RGB', 1290000.00, 50, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/mfgxfgfj2v7tt8y0d8at.webp', '2025-05-06 15:29:48'),
(107, 'Kingston Fury Beast DDR4 16GB 3200MHz', 30, 1, 'Bộ nhớ RAM Kingston Fury Beast DDR4 với hiệu suất cao', 1250000.00, 45, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/vckdm9quka8gnm0xmcvo.webp', '2025-05-06 15:29:48'),
(108, 'Kingston Fury Beast RGB DDR4 16GB 3200MHz', 30, 1, 'Bộ nhớ RAM Kingston Fury Beast RGB DDR4 với hiệu suất cao và đèn LED RGB', 1350000.00, 40, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/ou4susdzt37pd7al2ttc.webp', '2025-05-06 15:29:48'),
(109, 'Corsair Vengeance RGB Pro DDR4 16GB 3200MHz', 31, 2, 'Bộ nhớ RAM Corsair Vengeance RGB Pro DDR4 với hiệu suất cao và đèn LED RGB', 1490000.00, 35, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/eytep1zxuzkuq4aykfzp.webp', '2025-05-06 15:29:48'),
(110, 'Corsair Vengeance RGB Pro DDR4 32GB 3200MHz', 31, 2, 'Bộ nhớ RAM Corsair Vengeance RGB Pro DDR4 với hiệu suất cao và đèn LED RGB', 2490000.00, 30, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/jm0xhdwf7uzlqfaiwzxu.webp', '2025-05-06 15:29:48'),
(111, 'Corsair Vengeance RGB RT DDR4 16GB 3600MHz', 31, 2, 'Bộ nhớ RAM Corsair Vengeance RGB RT DDR4 với hiệu suất cao và đèn LED RGB', 1590000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/yfbqnolnesyyy0ycvzwl.webp', '2025-05-06 15:29:48'),
(112, 'Corsair Vengeance LPX DDR4 16GB 3200MHz', 31, 2, 'Bộ nhớ RAM Corsair Vengeance LPX DDR4 với hiệu suất cao', 1390000.00, 40, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/fwcho5igliejgh26kv6p.webp', '2025-05-06 15:29:48'),
(113, 'Corsair Vengeance RGB Pro SL DDR4 32GB 3600MHz', 31, 2, 'Bộ nhớ RAM Corsair Vengeance RGB Pro SL DDR4 với hiệu suất cao và đèn LED RGB', 2690000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033660/ReactNew/anh/Computer/LinhKien/Ram/tncot2rl6oliaaxs5fjy.webp', '2025-05-06 15:29:48'),
(114, 'Corsair Dominator Platinum RGB DDR4 32GB 3600MHz', 31, 2, 'Bộ nhớ RAM Corsair Dominator Platinum RGB DDR4 với hiệu suất cao và đèn LED RGB', 3290000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/ehzpigdgypx08xfahwua.webp', '2025-05-06 15:29:48'),
(115, 'PNY XLR8 Gaming RGB DDR4 16GB 3200MHz', 32, 3, 'Bộ nhớ RAM PNY XLR8 Gaming RGB DDR4 với hiệu suất cao và đèn LED RGB', 1290000.00, 30, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/iz3uetg6oyhxdwwav0gm.webp', '2025-05-06 15:29:48'),
(116, 'PNY XLR8 Gaming EPIC-X RGB DDR4 16GB 3200MHz', 32, 3, 'Bộ nhớ RAM PNY XLR8 Gaming EPIC-X RGB DDR4 với hiệu suất cao và đèn LED RGB', 1350000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/qsf4ojcdutmmwmso6zg1.webp', '2025-05-06 15:29:48'),
(117, 'PNY XLR8 Gaming DDR4 16GB 3200MHz', 32, 3, 'Bộ nhớ RAM PNY XLR8 Gaming DDR4 với hiệu suất cao', 1190000.00, 35, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/xzx2ydvttvbdsqjm9yuh.webp', '2025-05-06 15:29:48'),
(118, 'PNY Performance DDR4 16GB 3200MHz', 32, 3, 'Bộ nhớ RAM PNY Performance DDR4 với hiệu suất ổn định', 1090000.00, 40, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/zashtnn8rimiaxmskmcb.webp', '2025-05-06 15:29:48'),
(119, 'PNY XLR8 Gaming MAKO DDR4 32GB 3600MHz', 32, 3, 'Bộ nhớ RAM PNY XLR8 Gaming MAKO DDR4 với hiệu suất cao và đèn LED RGB', 2490000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033659/ReactNew/anh/Computer/LinhKien/Ram/cwsymdnehr6v2shyqnt1.webp', '2025-05-06 15:29:48'),
(120, 'ASUS TUF Gaming VG24VQE 24 inch Curved 165Hz', 36, 4, 'Màn hình gaming ASUS TUF 24 inch cong, tần số quét 165Hz, Full HD', 4990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033666/ReactNew/anh/Computer/ManHinh/gao5vwzpqvvqomcfyhmn.webp', '2025-05-06 15:29:48'),
(121, 'ASUS ROG Strix XG27UQ 27 inch 4K 144Hz', 36, 4, 'Màn hình gaming ASUS ROG Strix 27 inch, 4K, tần số quét 144Hz', 17990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033666/ReactNew/anh/Computer/ManHinh/senlzywxpnonsl3yapdp.webp', '2025-05-06 15:29:48'),
(122, 'ASUS TUF Gaming VG27AQ 27 inch 165Hz', 36, 4, 'Màn hình gaming ASUS TUF 27 inch, tần số quét 165Hz, IPS, HDR10', 7990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033666/ReactNew/anh/Computer/ManHinh/px73f2mo6n6fmhmydsbv.webp', '2025-05-06 15:29:48'),
(123, 'ASUS ProArt PA278CV 27 inch QHD Professional', 36, 4, 'Màn hình ASUS ProArt 27 inch, QHD, dành cho đồ họa chuyên nghiệp', 9990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033666/ReactNew/anh/Computer/ManHinh/cu4zovmwf5xnejdosxtd.webp', '2025-05-06 15:29:48'),
(124, 'ASUS TUF Gaming VG259QM 24.5 inch 280Hz', 36, 4, 'Màn hình gaming ASUS TUF 24.5 inch, tần số quét 280Hz, Full HD', 6990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033666/ReactNew/anh/Computer/ManHinh/nf6mzjggy0za44qlrlpl.webp', '2025-05-06 15:29:48'),
(125, 'ASUS ROG Swift PG279QM 27 inch 240Hz', 36, 4, 'Màn hình gaming ASUS ROG Swift 27 inch, tần số quét 240Hz, QHD', 14990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033666/ReactNew/anh/Computer/ManHinh/q7ytea1wufglyydi043s.webp', '2025-05-06 15:29:48'),
(126, 'Acer Nitro VG240Y 23.8 inch 165Hz', 37, 5, 'Màn hình gaming Acer Nitro 23.8 inch, tần số quét 165Hz, Full HD', 3990000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033665/ReactNew/anh/Computer/ManHinh/hu8xzt1rl5cnclt40ffk.webp', '2025-05-06 15:29:48'),
(127, 'Acer EK241Y 23.8 inch 75Hz', 37, 5, 'Màn hình Acer 23.8 inch, tần số quét 75Hz, Full HD', 2990000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033665/ReactNew/anh/Computer/ManHinh/l644mww0po1pibcehnis.webp', '2025-05-06 15:29:48'),
(128, 'Acer Nitro VG270 27 inch 165Hz', 37, 5, 'Màn hình gaming Acer Nitro 27 inch, tần số quét 165Hz, Full HD', 4990000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033665/ReactNew/anh/Computer/ManHinh/q92c1lfvquc7afn2ejga.webp', '2025-05-06 15:29:48'),
(129, 'Acer Predator XB273U 27 inch 170Hz', 37, 5, 'Màn hình gaming Acer Predator 27 inch, tần số quét 170Hz, QHD', 10990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033665/ReactNew/anh/Computer/ManHinh/pfxz79jtym1ntrjasazb.png', '2025-05-06 15:29:48'),
(130, 'Acer Predator X38 38 inch Curved 175Hz', 37, 5, 'Màn hình gaming Acer Predator 38 inch cong, tần số quét 175Hz, UltraWide', 27990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033665/ReactNew/anh/Computer/ManHinh/rxsqxymtk7iij9qazdnh.webp', '2025-05-06 15:29:48'),
(131, 'LG UltraGear 27GP850-B 27 inch 180Hz', 38, 6, 'Màn hình gaming LG UltraGear 27 inch, tần số quét 180Hz, QHD', 8990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033665/ReactNew/anh/Computer/ManHinh/c1psvfws4uuemsuxesfx.webp', '2025-05-06 15:29:48'),
(132, 'LG UltraGear 32GN600-B 32 inch 165Hz', 38, 6, 'Màn hình gaming LG UltraGear 32 inch, tần số quét 165Hz, QHD', 7990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033665/ReactNew/anh/Computer/ManHinh/va652xyln8hkog49g3jf.webp', '2025-05-06 15:29:48'),
(133, 'LG UltraGear 27GN800-B 27 inch 144Hz', 38, 6, 'Màn hình gaming LG UltraGear 27 inch, tần số quét 144Hz, QHD', 6990000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033665/ReactNew/anh/Computer/ManHinh/i30hfmtemhuos3fhdncn.webp', '2025-05-06 15:29:48'),
(134, 'MSI Optix G241 24 inch 144Hz', 39, 7, 'Màn hình gaming MSI Optix 24 inch, tần số quét 144Hz, Full HD', 4990000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033665/ReactNew/anh/Computer/ManHinh/gyaiect1z1qah33uomoo.webp', '2025-05-06 15:29:48'),
(135, 'MSI Optix G27C4 27 inch Curved 165Hz', 39, 7, 'Màn hình gaming MSI Optix 27 inch cong, tần số quét 165Hz, Full HD', 5990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033664/ReactNew/anh/Computer/ManHinh/iw7dnyeekg2d0rrnntyk.webp', '2025-05-06 15:29:48'),
(136, 'MSI MPG Artymis 343CQR 34 inch Curved 165Hz', 39, 7, 'Màn hình gaming MSI MPG Artymis 34 inch cong, tần số quét 165Hz, UltraWide', 14990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033664/ReactNew/anh/Computer/ManHinh/v5tdi0kqnsxdfpyd1gez.webp', '2025-05-06 15:29:48'),
(137, 'MSI MAG274QRF-QD 27 inch 165Hz', 39, 7, 'Màn hình gaming MSI MAG 27 inch, tần số quét 165Hz, QHD', 10990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033664/ReactNew/anh/Computer/ManHinh/yxhomgp5c1uwi0jgmqra.webp', '2025-05-06 15:29:48'),
(138, 'ASUS ROG Sheath XXL Gaming Mousepad', 12, 4, 'Pad chuột gaming ASUS ROG Sheath XXL kích thước lớn, bề mặt vải cao cấp', 790000.00, 30, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033668/ReactNew/anh/Computer/PadChuot/u9xg0bjhdsod4ipil6xn.webp', '2025-05-06 15:29:48'),
(139, 'ASUS ROG Strix Edge Gaming Mousepad', 12, 4, 'Pad chuột gaming ASUS ROG Strix Edge kích thước lớn, thiết kế đặc biệt', 590000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033668/ReactNew/anh/Computer/PadChuot/xrquqz2q2aq7qumfcn1y.webp', '2025-05-06 15:29:48'),
(140, 'Daeru Gaming Mousepad XL', 11, 8, 'Pad chuột gaming Daeru XL kích thước lớn, bề mặt vải mịn', 290000.00, 50, 'In Stock', 'daeru1.jpg', '2025-05-06 15:29:48'),
(141, 'Razer Goliathus Chroma Extended', 13, 9, 'Pad chuột gaming Razer Goliathus Chroma Extended, LED RGB, kích thước lớn', 1290000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033668/ReactNew/anh/Computer/PadChuot/lqwyjz4e0ni73ykvz2f6.webp', '2025-05-06 15:29:48'),
(142, 'Razer Sphex V3 Ultra-thin Gaming Surface', 13, 9, 'Pad chuột gaming Razer Sphex V3 siêu mỏng, bề mặt polymer', 490000.00, 30, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033667/ReactNew/anh/Computer/PadChuot/hpfdi3pujb4lynxt6vnq.webp', '2025-05-06 15:29:48'),
(143, 'Razer Gigantus V2 XXL', 13, 9, 'Pad chuột gaming Razer Gigantus V2 XXL kích thước cực lớn, bề mặt vải cao cấp', 890000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033667/ReactNew/anh/Computer/PadChuot/or8uiwmsie04fevmgfnn.webp', '2025-05-06 15:29:48'),
(144, 'MSI MAG Infinite S3 11th i5-11400F RTX 3060', 40, 7, 'PC Gaming MSI MAG Infinite S3, Core i5-11400F, RTX 3060, RAM 16GB, SSD 512GB, HDD 1TB', 25990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033671/ReactNew/anh/Computer/PC/k39mcz2f5hs3wag3x3sp.webp', '2025-05-06 15:29:48'),
(145, 'MSI MAG Codex 5 11th i7-11700 RTX 3060', 40, 7, 'PC Gaming MSI MAG Codex 5, Core i7-11700, RTX 3060, RAM 16GB, SSD 512GB, HDD 1TB', 29990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033670/ReactNew/anh/Computer/PC/s2cuciuymkajq87wh2rl.webp', '2025-05-06 15:29:48'),
(146, 'MSI MEG Aegis Ti5 11th i9-11900K RTX 3080', 40, 7, 'PC Gaming MSI MEG Aegis Ti5, Core i9-11900K, RTX 3080, RAM 32GB, SSD 1TB, HDD 2TB', 62990000.00, 3, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033669/ReactNew/anh/Computer/PC/wyj9p38ygcqsqkecakbr.webp', '2025-05-06 15:29:48'),
(147, 'MSI MPG Trident 3 10th i7-10700 RTX 3060', 40, 7, 'PC Gaming MSI MPG Trident 3, Core i7-10700, RTX 3060, RAM 16GB, SSD 512GB', 27990000.00, 7, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033669/ReactNew/anh/Computer/PC/am0cv3vwtxefqo6nn1c0.webp', '2025-05-06 15:29:48'),
(148, 'ASUS TUF Gaming GT501 i7-11700 RTX 3060', 41, 4, 'PC Gaming ASUS TUF GT501, Core i7-11700, RTX 3060, RAM 16GB, SSD 512GB, HDD 1TB', 29990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033669/ReactNew/anh/Computer/PC/ebi67xaejw2khdpl8pfn.webp', '2025-05-06 15:29:48'),
(149, 'ASUS ROG Strix G15DK R7-5800X RTX 3060', 41, 4, 'PC Gaming ASUS ROG Strix G15DK, Ryzen 7 5800X, RTX 3060, RAM 16GB, SSD 512GB, HDD 1TB', 32990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033669/ReactNew/anh/Computer/PC/b45t1ubq4qakgbwh27ka.webp', '2025-05-06 15:29:48'),
(150, 'ASUS ROG Strix G35DX R9-5900X RTX 3080', 41, 4, 'PC Gaming ASUS ROG Strix G35DX, Ryzen 9 5900X, RTX 3080, RAM 32GB, SSD 1TB, HDD 2TB', 59990000.00, 3, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033669/ReactNew/anh/Computer/PC/oqi6uoj8pskaemtjvclh.webp', '2025-05-06 15:29:48'),
(151, 'Intel NUC 11 Enthusiast Kit i7-1165G7', 40, 10, 'Mini PC Intel NUC 11 Enthusiast Kit, Core i7-1165G7, RAM 16GB, SSD 512GB', 19990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033669/ReactNew/anh/Computer/PC/ce7lniof76ormgvmtrrw.webp', '2025-05-06 15:29:48'),
(152, 'Intel NUC 11 Pro Kit i5-1135G7', 40, 10, 'Mini PC Intel NUC 11 Pro Kit, Core i5-1135G7, RAM 8GB, SSD 256GB', 14990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033668/ReactNew/anh/Computer/PC/edc3xoxqel2rofpgp8wq.webp', '2025-05-06 15:29:48'),
(153, 'Intel NUC 11 Performance Kit i3-1115G4', 40, 10, 'Mini PC Intel NUC 11 Performance Kit, Core i3-1115G4, RAM 8GB, SSD 256GB', 11990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033668/ReactNew/anh/Computer/PC/db2gkdx20qb3mve7ptdl.webp', '2025-05-06 15:29:48'),
(154, 'ASUS ROG Cetra True Wireless Gaming Earbuds', 42, 4, 'Tai nghe gaming không dây ASUS ROG Cetra True Wireless, âm thanh nổi', 2990000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033671/ReactNew/anh/Computer/Tainghe/tnwcxla3v6mahbsumoyw.webp', '2025-05-06 15:29:48'),
(155, 'ASUS ROG Cetra II Core In-ear Gaming Headphones', 42, 4, 'Tai nghe gaming có dây ASUS ROG Cetra II Core, âm thanh nổi', 1290000.00, 25, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033671/ReactNew/anh/Computer/Tainghe/ponl5rjbymkklk9yhgpy.webp', '2025-05-06 15:29:48'),
(156, 'ASUS ROG Delta S Gaming Headset', 42, 4, 'Tai nghe gaming ASUS ROG Delta S, âm thanh vòm 7.1, đèn LED RGB', 4990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033670/ReactNew/anh/Computer/Tainghe/pgkomxybbzlfo7lpujjq.webp', '2025-05-06 15:29:48'),
(157, 'ASUS ROG Strix Go 2.4 Wireless Gaming Headset', 42, 4, 'Tai nghe gaming không dây ASUS ROG Strix Go 2.4, âm thanh vòm, mic có khả năng khử tiếng ồn AI', 3990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033670/ReactNew/anh/Computer/Tainghe/ljpfbdeu3gvszwaudpj8.webp', '2025-05-06 15:29:48'),
(158, 'Razer Kraken Kitty Edition', 43, 9, 'Tai nghe gaming Razer Kraken Kitty Edition, tai mèo LED RGB, âm thanh vòm 7.1', 3790000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033670/ReactNew/anh/Computer/Tainghe/txqoctk7fi1xbeajydce.webp', '2025-05-06 15:29:48'),
(159, 'Razer BlackShark V2 Pro Wireless', 43, 9, 'Tai nghe gaming không dây Razer BlackShark V2 Pro, âm thanh vòm THX Spatial Audio', 4990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033670/ReactNew/anh/Computer/Tainghe/t7eq9fgk5j70gogcpdtm.webp', '2025-05-06 15:29:48'),
(160, 'Razer Kraken V3 X', 43, 9, 'Tai nghe gaming Razer Kraken V3 X, âm thanh vòm 7.1, đèn LED RGB', 1990000.00, 20, 'In Stock', 'zxvmb0ljobsiwkij9kllx', '2025-05-06 15:29:48'),
(161, 'Acer Nitro 5 AN515-57', 45, 1, 'Laptop Acer Nitro 5 AN515-57, i5-12450H, RTX 3050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 17990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033673/ReactNew/anh/Laptop/Acer/mhsaa51acmzmiusghtw8.webp', '2025-05-06 15:29:48'),
(162, 'Acer Nitro 5 AN515-58', 45, 1, 'Laptop Acer Nitro 5 AN515-58, i5-12450H, RTX 3050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 18990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033673/ReactNew/anh/Laptop/Acer/qhubkznkymfbwxydlagn.webp', '2025-05-06 15:29:48'),
(163, 'Acer Nitro 5 AN515-57', 45, 1, 'Laptop Acer Nitro 5 AN515-57, i7-12700H, RTX 4050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 21990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033673/ReactNew/anh/Laptop/Acer/uxftzz17pc3psndcq7ik.webp', '2025-05-06 15:29:48'),
(164, 'Acer Nitro 5 AN515-58', 45, 1, 'Laptop Acer Nitro 5 AN515-58, i7-12650H, RTX 4050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 22990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033673/ReactNew/anh/Laptop/Acer/akf7msuk1kmog5kilzvb.webp', '2025-05-06 15:29:48'),
(165, 'Acer Nitro 7 AN715-51', 45, 1, 'Laptop Acer Nitro 7 AN715-51, i7-12650H, RTX 4050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 23990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033672/ReactNew/anh/Laptop/Acer/o6fctgnqkxq25yhknxmz.webp', '2025-05-06 15:29:48'),
(166, 'Acer Nitro 5 AN515-58', 45, 1, 'Laptop Acer Nitro 5 AN515-58, i5-12450H, RTX 3050Ti, 16GB RAM, 512GB SSD, 15.6\" Full HD', 19990000.00, 7, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033672/ReactNew/anh/Laptop/Acer/y39pxvgcnccbonsdqt4o.webp', '2025-05-06 15:29:48'),
(167, 'Acer Nitro 7 AN715-51', 45, 1, 'Laptop Acer Nitro 7 AN715-51, i7-12700H, RTX 4060, 16GB RAM, 512GB SSD, 15.6\" Full HD', 25990000.00, 6, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033672/ReactNew/anh/Laptop/Acer/bwaxvr5cli7vbiusma7h.webp', '2025-05-06 15:29:48'),
(168, 'Acer Nitro 5 AN515-58', 45, 1, 'Laptop Acer Nitro 5 AN515-58, i5-12500H, RTX 3060, 16GB RAM, 512GB SSD, 15.6\" Full HD', 20990000.00, 9, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033672/ReactNew/anh/Laptop/Acer/zxkklstmbbutnek2nxst.webp', '2025-05-06 15:29:48'),
(169, 'Acer Aspire 5', 45, 1, 'Laptop Acer Aspire 5, Intel Core i5-1235U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 15.6\" Full HD', 15990000.00, 14, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033672/ReactNew/anh/Laptop/Acer/bjtlzvsm7jvajrhbf83o.webp', '2025-05-06 15:29:48'),
(170, 'Asus VivoBook 15', 46, 2, 'Laptop Asus VivoBook 15, i5-12500H, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 15.6\" Full HD', 16990000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033674/ReactNew/anh/Laptop/Asus/w2sywl5ntkzkvxddvxqh.webp', '2025-05-06 15:29:48'),
(171, 'Asus TUF Gaming F15', 46, 2, 'Laptop Asus TUF Gaming F15, i5-12500H, RTX 3050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 19990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033674/ReactNew/anh/Laptop/Asus/ihyssrabnjickp1arak6.webp', '2025-05-06 15:29:48'),
(172, 'Asus Zenbook 14', 46, 2, 'Laptop Asus Zenbook 14, Core Ultra 5, Intel Arc Graphics, 16GB RAM, 512GB SSD, 14\" 3K', 22990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033674/ReactNew/anh/Laptop/Asus/j8dddaipstgr5auy1a6e.webp', '2025-05-06 15:29:48');
INSERT INTO `products` (`productID`, `productName`, `categoryID`, `supplierID`, `description`, `price`, `stockQuantity`, `availability`, `image`, `createdAt`) VALUES
(173, 'Asus ROG Strix G16', 46, 2, 'Laptop Asus ROG Strix G16, i7-13650HX, RTX 4060, 16GB RAM, 1TB SSD, 16\" Full HD', 32990000.00, 6, 'In Stock', 'group_802_1.jpg', '2025-05-06 15:29:48'),
(174, 'Asus VivoBook 14 OLED', 46, 2, 'Laptop Asus VivoBook 14 OLED, i5-13500H, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 14\" 2.8K OLED', 18990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033674/ReactNew/anh/Laptop/Asus/mo9ovdjujk1xvcmqjfyi.webp', '2025-05-06 15:29:48'),
(175, 'Asus VivoBook 14', 46, 2, 'Laptop Asus VivoBook 14, i5-13500H, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 14\" 2.8K', 17990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033674/ReactNew/anh/Laptop/Asus/dwkg9yys5e75f7icy8kt.webp', '2025-05-06 15:29:48'),
(176, 'Asus TUF Gaming A15', 46, 2, 'Laptop Asus TUF Gaming A15, R7-7435HS, RTX 3050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 19990000.00, 7, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033673/ReactNew/anh/Laptop/Asus/sey7jnzdurzbcqr1aoyy.webp', '2025-05-06 15:29:48'),
(177, 'Asus VivoBook Pro', 46, 2, 'Laptop Asus VivoBook Pro, i7-12700H, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 15.6\" 2.8K', 21990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033673/ReactNew/anh/Laptop/Asus/wlnnqb2oydnvcl5nfecv.webp', '2025-05-06 15:29:48'),
(178, 'Asus Zenbook S13', 46, 2, 'Laptop Asus Zenbook S13, i7-1355U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 13.3\" 2.8K OLED', 27990000.00, 4, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033673/ReactNew/anh/Laptop/Asus/bwmq1zvkuc4hu3cnhzux.webp', '2025-05-06 15:29:48'),
(179, 'Dell Inspiron 15', 47, 3, 'Laptop Dell Inspiron 15, i5-1235U, Intel UHD Graphics, 16GB RAM, 512GB SSD, 15.6\" Full HD', 16990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033675/ReactNew/anh/Laptop/Dell/gqpbqlztio8wklft7fly.webp', '2025-05-06 15:29:48'),
(180, 'Dell Inspiron 14', 47, 3, 'Laptop Dell Inspiron 14, i5-1335U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 14\" Full HD', 17990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033675/ReactNew/anh/Laptop/Dell/qvnr6zxr4tp9ns1nplqe.webp', '2025-05-06 15:29:48'),
(181, 'Dell Inspiron 15', 47, 3, 'Laptop Dell Inspiron 15, i5-1335U, Intel Graphics, 16GB RAM, 512GB SSD, 15.6\" Full HD', 18490000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033675/ReactNew/anh/Laptop/Dell/rp8ef81iaejhqe4paxm0.webp', '2025-05-06 15:29:48'),
(182, 'Dell Vostro 3520', 47, 3, 'Laptop Dell Vostro 3520, i3-1215U, Intel UHD Graphics, 8GB RAM, 512GB SSD, 15.6\" Full HD', 13990000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033675/ReactNew/anh/Laptop/Dell/wb6fuucyduvrfzzv8b92.webp', '2025-05-06 15:29:48'),
(183, 'Dell Inspiron 15', 47, 3, 'Laptop Dell Inspiron 15, i7-1355U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 15.6\" Full HD', 19990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033675/ReactNew/anh/Laptop/Dell/am1jfodapjnc9sb4sbr5.webp', '2025-05-06 15:29:48'),
(184, 'Dell XPS 13', 47, 3, 'Laptop Dell XPS 13, i7-1360P, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 13.4\" 3K', 29990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033675/ReactNew/anh/Laptop/Dell/c5kuzbuysosvqxp94aqw.webp', '2025-05-06 15:29:48'),
(185, 'Dell Inspiron 14', 47, 3, 'Laptop Dell Inspiron 14 2-in-1, i7-1355U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 14\" Full HD Touch', 21990000.00, 7, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033674/ReactNew/anh/Laptop/Dell/cyo7diqes2dw9jsgtouz.webp', '2025-05-06 15:29:48'),
(186, 'Dell Inspiron 16', 47, 3, 'Laptop Dell Inspiron 16, i5-13500H, Intel Iris Xe Graphics, 8GB RAM, 256GB SSD, 16\" Full HD', 18990000.00, 9, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033674/ReactNew/anh/Laptop/Dell/egxxxfkm6ljqdxkyxcrr.webp', '2025-05-06 15:29:48'),
(187, 'Dell Inspiron 15', 47, 3, 'Laptop Dell Inspiron 15, i5-1235U, Intel UHD Graphics, 8GB RAM, 512GB SSD, 15.6\" Full HD', 15990000.00, 11, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033674/ReactNew/anh/Laptop/Dell/wesm8x9xw7rpjdgwrxhy.webp', '2025-05-06 15:29:48'),
(188, 'Gigabyte AORUS 17', 48, 4, 'Laptop Gigabyte AORUS 17, i9-11980HK, RTX 3080Ti, 16GB RAM, 512GB SSD, 17.3\" Full HD', 49990000.00, 3, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033676/ReactNew/anh/Laptop/Gigabyte/sdc6xwpczklaastwly8j.webp', '2025-05-06 15:29:48'),
(189, 'Gigabyte G5', 48, 4, 'Laptop Gigabyte G5, i5-13500H, RTX 4050, 8GB RAM, 512GB SSD, 15.6\" Full HD', 21990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033676/ReactNew/anh/Laptop/Gigabyte/fx2n260iflhwla3wlcao.webp', '2025-05-06 15:29:48'),
(190, 'Gigabyte G5', 48, 4, 'Laptop Gigabyte G5, i5-12500H, RTX 4060, 8GB RAM, 512GB SSD, 15.6\" Full HD', 23990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033676/ReactNew/anh/Laptop/Gigabyte/ff12l8hxvqyqjjr5thro.webp', '2025-05-06 15:29:48'),
(191, 'Gigabyte AORUS 15', 48, 4, 'Laptop Gigabyte AORUS 15, i5-12400H, RTX 4050, 8GB RAM, 512GB SSD, 15.6\" Full HD', 24990000.00, 7, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033676/ReactNew/anh/Laptop/Gigabyte/pnm2blyk4hbcdecihugd.webp', '2025-05-06 15:29:48'),
(192, 'Gigabyte AORUS 17', 48, 4, 'Laptop Gigabyte AORUS 17, i7-14650HX, RTX 4070, 16GB RAM, 1TB SSD, 17\" QHD+', 39990000.00, 4, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033676/ReactNew/anh/Laptop/Gigabyte/lz4ogm4ashpmrh5owdsf.webp', '2025-05-06 15:29:48'),
(193, 'Gigabyte G5', 48, 4, 'Laptop Gigabyte G5, i5-13420H, RTX 4050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 22990000.00, 9, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033676/ReactNew/anh/Laptop/Gigabyte/yyiyydnmouncn6i95hxo.webp', '2025-05-06 15:29:48'),
(194, 'Gigabyte AORUS 16', 48, 4, 'Laptop Gigabyte AORUS 16, i7-13620H, RTX 4050, 16GB RAM, 1TB SSD, 16\" Full HD+', 28990000.00, 6, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033676/ReactNew/anh/Laptop/Gigabyte/o6sggghll8enia2cuz1o.webp', '2025-05-06 15:29:48'),
(195, 'Gigabyte AORUS 17', 48, 4, 'Laptop Gigabyte AORUS 17, i7-13620H, RTX 4060, 16GB RAM, 1TB SSD, 17\" Full HD+', 32990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033675/ReactNew/anh/Laptop/Gigabyte/vvsipl9lijpzzg1car1n.webp', '2025-05-06 15:29:48'),
(196, 'Lenovo Legion 5', 49, 5, 'Laptop Lenovo Legion 5, i5-12450HX, RTX 3050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 19990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033678/ReactNew/anh/Laptop/Lenovo/jcnjwfhshduyw3ivamc0.webp', '2025-05-06 15:29:48'),
(197, 'Lenovo Legion 5', 49, 5, 'Laptop Lenovo Legion 5, R7-7635HS, RTX 4060, 16GB RAM, 512GB SSD, 15.6\" Full HD', 25990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033677/ReactNew/anh/Laptop/Lenovo/cnlyhvbbvq3efofy65ue.webp', '2025-05-06 15:29:48'),
(198, 'Lenovo Legion 5 Pro', 49, 5, 'Laptop Lenovo Legion 5 Pro, R7-7645HX, RTX 4060, 24GB RAM, 512GB SSD, 16\" Full HD', 29990000.00, 6, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033677/ReactNew/anh/Laptop/Lenovo/nyuipkuqcfv4kg3qp5dn.webp', '2025-05-06 15:29:48'),
(199, 'Lenovo Legion 5i', 49, 5, 'Laptop Lenovo Legion 5i, i5-12450HX, RTX 4050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 22990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033677/ReactNew/anh/Laptop/Lenovo/q3ruhdlv45zozx6dgbrj.webp', '2025-05-06 15:29:48'),
(200, 'Lenovo Legion 7', 49, 5, 'Laptop Lenovo Legion 7, i9-13900HX, RTX 4070, 32GB RAM, 1TB SSD, 16\" WQXGA', 49990000.00, 3, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033677/ReactNew/anh/Laptop/Lenovo/elwu5kx7pegwjpdaf4ww.webp', '2025-05-06 15:29:48'),
(201, 'Lenovo IdeaPad Slim 5', 49, 5, 'Laptop Lenovo IdeaPad Slim 5, AMD Ryzen 7 7730U, AMD Radeon Graphics, 16GB RAM, 512GB SSD, 14\" WUXGA', 17990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033677/ReactNew/anh/Laptop/Lenovo/yyimanllpnev5erkqjjq.webp', '2025-05-06 15:29:48'),
(202, 'Lenovo IdeaPad 1', 49, 5, 'Laptop Lenovo IdeaPad 1, R5-7520U, AMD Radeon Graphics, 16GB RAM, 512GB SSD, 14\" WUXGA', 14990000.00, 18, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033677/ReactNew/anh/Laptop/Lenovo/livhhz7xoqrdxoxfmnlj.webp', '2025-05-06 15:29:48'),
(203, 'Lenovo ThinkPad X1 Carbon', 49, 5, 'Laptop Lenovo ThinkPad X1 Carbon, i7-1270P, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 14\" Full HD', 32990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033677/ReactNew/anh/Laptop/Lenovo/qze42qb7ertplnjoh37y.webp', '2025-05-06 15:29:48'),
(204, 'Lenovo IdeaPad 3', 49, 5, 'Laptop Lenovo IdeaPad 3, i5-1235U, Intel UHD Graphics, 16GB RAM, 512GB SSD, 14\" Full HD', 15990000.00, 14, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033676/ReactNew/anh/Laptop/Lenovo/rfa4r3veowevtkflxyl7.webp', '2025-05-06 15:29:48'),
(205, 'Lenovo Legion 5', 49, 5, 'Laptop Lenovo Legion 5, R5-7535HS, RTX 3050, 12GB RAM, 512GB SSD, 15.6\" Full HD', 18990000.00, 11, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033676/ReactNew/anh/Laptop/Lenovo/irh0ls4rnk2kfzvscasv.webp', '2025-05-06 15:29:48'),
(206, 'Apple MacBook Air M2', 50, 6, 'Laptop Apple MacBook Air M2, 8 CPU cores, 8 GPU cores, 8GB RAM, 512GB SSD, 13.6\" Retina', 28990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033680/ReactNew/anh/Laptop/Mac/lupdjxold3ex9w0vf0ej.webp', '2025-05-06 15:29:48'),
(207, 'Apple MacBook Air M2', 50, 6, 'Laptop Apple MacBook Air M2, 8 CPU cores, 10 GPU cores, 16GB RAM, 512GB SSD, 13.6\" Retina', 31990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033679/ReactNew/anh/Laptop/Mac/pbb2cpno5ov609jrtymm.webp', '2025-05-06 15:29:48'),
(208, 'Apple MacBook Air M3', 50, 6, 'Laptop Apple MacBook Air M3, 8 CPU cores, 8 GPU cores, 16GB RAM, 256GB SSD, 13.6\" Retina', 29990000.00, 9, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033679/ReactNew/anh/Laptop/Mac/qbxgkcujr7wa3lb6rgwy.webp', '2025-05-06 15:29:48'),
(209, 'Apple MacBook Pro M3', 50, 6, 'Laptop Apple MacBook Pro M3, 8 CPU cores, 10 GPU cores, 16GB RAM, 1TB SSD, 16\" Retina', 44990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033679/ReactNew/anh/Laptop/Mac/ni4tyix0jh1ewpkwljyw.webp', '2025-05-06 15:29:48'),
(210, 'Apple MacBook Pro M3', 50, 6, 'Laptop Apple MacBook Pro M3, 8 CPU cores, 10 GPU cores, 16GB RAM, 256GB SSD, 13.3\" Retina', 31990000.00, 7, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033679/ReactNew/anh/Laptop/Mac/f7l9fzw31m79euxi2s8w.webp', '2025-05-06 15:29:48'),
(211, 'Apple MacBook Air M3', 50, 6, 'Laptop Apple MacBook Air M3, 8 CPU cores, 10 GPU cores, 16GB RAM, 512GB SSD, 13.3\" Retina', 32990000.00, 6, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033679/ReactNew/anh/Laptop/Mac/wpwgtstokjic8lldula1.webp', '2025-05-06 15:29:48'),
(212, 'Apple MacBook Pro M3', 50, 6, 'Laptop Apple MacBook Pro M3, 12 CPU cores, 18 GPU cores, 16GB RAM, 512GB SSD, 14.2\" Retina', 49990000.00, 4, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033679/ReactNew/anh/Laptop/Mac/esbfzldqmqmffmcgjaop.webp', '2025-05-06 15:29:48'),
(213, 'Apple MacBook Pro M2', 50, 6, 'Laptop Apple MacBook Pro M2, 10 CPU cores, 16 GPU cores, 16GB RAM, 256GB SSD, 13.3\" Retina', 33990000.00, 7, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033679/ReactNew/anh/Laptop/Mac/wowjujnbhkhvvmm34rf8.webp', '2025-05-06 15:29:48'),
(214, 'Apple MacBook Air M3', 50, 6, 'Laptop Apple MacBook Air M3, 8 CPU cores, 8 GPU cores, 16GB RAM, 256GB SSD, 13.3\" Retina', 28990000.00, 9, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033678/ReactNew/anh/Laptop/Mac/yv5gyq6ppxu6kurfgphv.webp', '2025-05-06 15:29:48'),
(215, 'Apple MacBook Pro M3', 50, 6, 'Laptop Apple MacBook Pro M3, 12 CPU cores, 18 GPU cores, 24GB RAM, 512GB SSD, 14.2\" Retina', 54990000.00, 3, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033678/ReactNew/anh/Laptop/Mac/s9xi9j1kr8e78shyryp0.webp', '2025-05-06 15:29:48'),
(216, 'Apple MacBook Pro M3 Max', 50, 6, 'Laptop Apple MacBook Pro M3 Max, 16 CPU cores, 40 GPU cores, 32GB RAM, 512GB SSD, 14.2\" Retina', 69990000.00, 2, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033678/ReactNew/anh/Laptop/Mac/bl6bwjx7ttw8ojv4fsna.webp', '2025-05-06 15:29:48'),
(217, 'Apple MacBook Pro M3', 50, 6, 'Laptop Apple MacBook Pro M3, 8 CPU cores, 10 GPU cores, 16GB RAM, 512GB SSD, 13.3\" Retina', 36990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033678/ReactNew/anh/Laptop/Mac/v5uq1bgqyrwxjn6w3wan.webp', '2025-05-06 15:29:48'),
(218, 'Apple MacBook Pro M2', 50, 6, 'Laptop Apple MacBook Pro M2, 10 CPU cores, 16 GPU cores, 16GB RAM, 256GB SSD, 13.3\" Retina', 32990000.00, 6, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033678/ReactNew/anh/Laptop/Mac/ogpsxb8qluaskwrvcm41.webp', '2025-05-06 15:29:48'),
(219, 'MSI Vector GP76', 51, 7, 'Laptop MSI Vector GP76, i7-12650H, RTX 4050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 25990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033681/ReactNew/anh/Laptop/MSI/ric4hmho7k98el53chqd.webp', '2025-05-06 15:29:48'),
(220, 'MSI Cyborg 15', 51, 7, 'Laptop MSI Cyborg 15, i7-13620H, RTX 4060, 16GB RAM, 1TB SSD, 15.6\" Full HD', 29990000.00, 7, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033681/ReactNew/anh/Laptop/MSI/xsgpzlh6ugh1dcngxmqq.webp', '2025-05-06 15:29:48'),
(221, 'MSI Pulse 15', 51, 7, 'Laptop MSI Pulse 15, i7-7735HS, RTX 4060, 16GB RAM, 512GB SSD, 15.6\" Full HD', 28990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033680/ReactNew/anh/Laptop/MSI/uj6gmecsdwyovz3wd8qc.webp', '2025-05-06 15:29:48'),
(222, 'MSI Katana 15', 51, 7, 'Laptop MSI Katana 15, i7-13620H, RTX 3050, 16GB RAM, 1TB SSD, 15.6\" Full HD', 24990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033680/ReactNew/anh/Laptop/MSI/girlwkjormg5lmagbg3w.webp', '2025-05-06 15:29:48'),
(223, 'MSI Cyborg 15', 51, 7, 'Laptop MSI Cyborg 15, i7-13620H, RTX 3050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 23990000.00, 9, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033680/ReactNew/anh/Laptop/MSI/xzhpky7u1vgc5043lyai.webp', '2025-05-06 15:29:48'),
(224, 'MSI Stealth 15', 51, 7, 'Laptop MSI Stealth 15, i7-13620H, RTX 4050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 26990000.00, 6, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033680/ReactNew/anh/Laptop/MSI/asi6uinip2pufooz6ckv.webp', '2025-05-06 15:29:48'),
(225, 'MSI Thin 15', 51, 7, 'Laptop MSI Thin 15, i5-12450H, RTX 3050, 16GB RAM, 512GB SSD, 15.6\" Full HD', 19990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033680/ReactNew/anh/Laptop/MSI/pdzb47kwodnkdqo6cto4.webp', '2025-05-06 15:29:48'),
(226, 'MSI Raider GE77', 51, 7, 'Laptop MSI Raider GE77, UE-285VN, RTX 4090, 32GB RAM, 1TB SSD, 17\" WQXGA', 79990000.00, 2, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033680/ReactNew/anh/Laptop/MSI/dwsbj7vylnjirsjsp7tk.webp', '2025-05-06 15:29:48'),
(227, 'MSI Modern 15', 51, 7, 'Laptop MSI Modern 15, i5-1235U, Intel Iris Xe Graphics, 16GB RAM, 512GB SSD, 15.6\" Full HD', 17990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033680/ReactNew/anh/Laptop/MSI/agopp3v34ynhxfarcohv.webp', '2025-05-06 15:29:48'),
(228, 'iPad 10.9-inch', 44, 1, 'Apple iPad 10.9-inch 2022 model', 10990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033672/ReactNew/anh/Ipad/lijuygynyw3bjamn30vz.webp', '2025-05-06 15:29:48'),
(229, 'iPad Air 11-inch', 44, 1, 'Apple iPad Air 11-inch WiFi', 16990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033671/ReactNew/anh/Ipad/hxzui51hftegjrx5kszu.webp', '2025-05-06 15:29:48'),
(230, 'iPad Air 6 M2', 44, 1, 'Apple iPad Air 6 M2 11-inch 256GB', 19990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033671/ReactNew/anh/Ipad/myz5lv40ilb8ggqohvke.webp', '2025-05-06 15:29:48'),
(231, 'iPad Pro 11-inch', 44, 1, 'Apple iPad Pro 11-inch with M-series chip', 22990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033671/ReactNew/anh/Ipad/rjljzzyznjvpclegirc0.webp', '2025-05-06 15:29:48'),
(232, 'iPhone 11', 52, 1, 'Apple iPhone 11 64GB', 9990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033683/ReactNew/anh/Phone/Iphone/jqf3lab7pp1v0knkndcy.webp', '2025-05-06 15:29:48'),
(233, 'iPhone 11s', 52, 1, 'Apple iPhone 11s 128GB', 10990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033683/ReactNew/anh/Phone/Iphone/ikm1ku3lfo19tz9qmtwg.webp', '2025-05-06 15:29:48'),
(234, 'iPhone 12', 52, 1, 'Apple iPhone 12 128GB', 14990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033683/ReactNew/anh/Phone/Iphone/gq8temqbzjgyeeldawjm.webp', '2025-05-06 15:29:48'),
(235, 'iPhone 12 128GB', 52, 1, 'Apple iPhone 12 128GB', 15990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033683/ReactNew/anh/Phone/Iphone/luxhf0wexomvljrfz4bs.webp', '2025-05-06 15:29:48'),
(236, 'iPhone 14', 52, 1, 'Apple iPhone 14 128GB', 19990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033682/ReactNew/anh/Phone/Iphone/x1wczgtg8jkfecccpi2g.webp', '2025-05-06 15:29:48'),
(237, 'iPhone 14 Plus', 52, 1, 'Apple iPhone 14 Plus 128GB', 22990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033682/ReactNew/anh/Phone/Iphone/a0495rtgdudnjnup9xcn.webp', '2025-05-06 15:29:48'),
(238, 'iPhone 14 Pro', 52, 1, 'Apple iPhone 14 Pro 256GB', 25990000.00, 6, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033682/ReactNew/anh/Phone/Iphone/ruh3vvscnzq3a8saya74.webp', '2025-05-06 15:29:48'),
(239, 'iPhone 14 Pro Max', 52, 1, 'Apple iPhone 14 Pro Max 256GB', 27990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033682/ReactNew/anh/Phone/Iphone/eymeu36lzhfzuvr10fbv.webp', '2025-05-06 15:29:48'),
(240, 'iPhone 15 Plus', 52, 1, 'Apple iPhone 15 Plus 128GB', 24990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033682/ReactNew/anh/Phone/Iphone/gkcqox2lzm7kgybirj66.webp', '2025-05-06 15:29:48'),
(241, 'iPhone 15 Pro', 52, 1, 'Apple iPhone 15 Pro 256GB', 28990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033682/ReactNew/anh/Phone/Iphone/rfweclgus5v5feyj0eux.webp', '2025-05-06 15:29:48'),
(242, 'iPhone 15 Pro Max', 52, 1, 'Apple iPhone 15 Pro Max 512GB', 32990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033682/ReactNew/anh/Phone/Iphone/cdeqftd3so9jvawkjnde.webp', '2025-05-06 15:29:48'),
(243, 'iPhone 16', 52, 1, 'Apple iPhone 16 128GB', 24990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033681/ReactNew/anh/Phone/Iphone/rqd1set3fezkux81ssvq.webp', '2025-05-06 15:29:48'),
(244, 'iPhone 16 Plus', 52, 1, 'Apple iPhone 16 Plus 256GB', 27990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033681/ReactNew/anh/Phone/Iphone/vc7siyomtgjtapmlgucy.webp', '2025-05-06 15:29:48'),
(245, 'iPhone 16 Pro', 52, 1, 'Apple iPhone 16 Pro 256GB', 30990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033681/ReactNew/anh/Phone/Iphone/ilpe3n5b9jwyd8tjc9su.webp', '2025-05-06 15:29:48'),
(246, 'iPhone 16 Pro Max', 52, 1, 'Apple iPhone 16 Pro Max 512GB', 34990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033681/ReactNew/anh/Phone/Iphone/pggh0epd7mou14rukych.webp', '2025-05-06 15:29:48'),
(247, 'Samsung Galaxy A05s', 53, 2, 'Samsung Galaxy A05s 6GB 128GB', 3990000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033684/ReactNew/anh/Phone/Samsum/fp9jrcwdilgtnyr8t3t5.webp', '2025-05-06 15:29:48'),
(248, 'Samsung Galaxy A16', 53, 2, 'Samsung Galaxy A16 128GB', 5990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033684/ReactNew/anh/Phone/Samsum/mvcgfp9gghrfdpkvzqrr.webp', '2025-05-06 15:29:48'),
(249, 'Samsung Galaxy A26', 53, 2, 'Samsung Galaxy A26 6GB 128GB', 6990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033684/ReactNew/anh/Phone/Samsum/uzpyrqgujdihg8m80s4y.webp', '2025-05-06 15:29:48'),
(250, 'Samsung Galaxy A36', 53, 2, 'Samsung Galaxy A36 8GB 128GB', 7990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033684/ReactNew/anh/Phone/Samsum/arsbhob7bhsylogigd0d.webp', '2025-05-06 15:29:48'),
(251, 'Samsung Galaxy A56', 53, 2, 'Samsung Galaxy A56 8GB 256GB', 9990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033684/ReactNew/anh/Phone/Samsum/mttqkbx4ig4mkpykh55z.webp', '2025-05-06 15:29:48'),
(252, 'Samsung Galaxy M55', 53, 2, 'Samsung Galaxy M55 5G 128GB', 8990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033684/ReactNew/anh/Phone/Samsum/eqvtkgp4xifqgoxaisih.webp', '2025-05-06 15:29:48'),
(253, 'Samsung Galaxy S24 FE', 53, 2, 'Samsung Galaxy S24 FE 8GB 256GB', 14990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033684/ReactNew/anh/Phone/Samsum/kqcmwqekgzsxpdckutyg.webp', '2025-05-06 15:29:48'),
(254, 'Samsung Galaxy S25', 53, 2, 'Samsung Galaxy S25 8GB 256GB', 20990000.00, 6, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033684/ReactNew/anh/Phone/Samsum/feavcqcryzgfc9mn6i38.webp', '2025-05-06 15:29:48'),
(255, 'Samsung Galaxy S25 Ultra', 53, 2, 'Samsung Galaxy S25 Ultra 12GB 512GB', 30990000.00, 4, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033683/ReactNew/anh/Phone/Samsum/i3lc1fiyk6xuerlxdsoz.webp', '2025-05-06 15:29:48'),
(256, 'Samsung Galaxy A15', 53, 2, 'Samsung Galaxy A15 6GB 128GB', 4990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033683/ReactNew/anh/Phone/Samsum/zzosax7aruomvym4vngl.webp', '2025-05-06 15:29:48'),
(257, 'Samsung Galaxy Z Fold 6', 53, 2, 'Samsung Galaxy Z Fold 6 12GB 512GB', 39990000.00, 3, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033683/ReactNew/anh/Phone/Samsum/c7z0dwzhuiiisfkjmzmq.webp', '2025-05-06 15:29:48'),
(258, 'Samsung Galaxy S24 Ultra', 53, 2, 'Samsung Galaxy S24 Ultra 12GB 512GB', 29990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033683/ReactNew/anh/Phone/Samsum/c5tqzqoq9it0h2bzdf2q.webp', '2025-05-06 15:29:48'),
(259, 'Xiaomi Poco X7 Pro', 54, 3, 'Xiaomi Poco X7 Pro 5G 8GB 256GB', 7990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033686/ReactNew/anh/Phone/xiaomi/bmuzbggfjekb9qifii14.webp', '2025-05-06 15:29:48'),
(260, 'Xiaomi Poco X7 Pro 5G', 54, 3, 'Xiaomi Poco X7 Pro 5G 12GB 256GB', 8990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033686/ReactNew/anh/Phone/xiaomi/t467qikdzglqkyhplbig.webp', '2025-05-06 15:29:48'),
(261, 'Xiaomi 15', 54, 3, 'Xiaomi 15 8GB 256GB', 14990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033686/ReactNew/anh/Phone/xiaomi/pwctcfhwkq3jlfkxurtx.webp', '2025-05-06 15:29:48'),
(262, 'Xiaomi 15 Ultra', 54, 3, 'Xiaomi 15 Ultra 12GB 512GB', 24990000.00, 5, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033686/ReactNew/anh/Phone/xiaomi/bf8hw4uog9ebhkhfsjvu.webp', '2025-05-06 15:29:48'),
(263, 'Xiaomi Redmi Note 14', 54, 3, 'Xiaomi Redmi Note 14 8GB 128GB', 5990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033686/ReactNew/anh/Phone/xiaomi/pmglyqubglpxrduvcxob.webp', '2025-05-06 15:29:48'),
(264, 'Xiaomi 14', 54, 3, 'Xiaomi 14 8GB 256GB', 16990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033686/ReactNew/anh/Phone/xiaomi/b6qdpmofpzr7lbitohvx.webp', '2025-05-06 15:29:48'),
(265, 'Redmi Note 14 Pro Plus', 54, 3, 'Redmi Note 14 Pro Plus 12GB 256GB', 9990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033685/ReactNew/anh/Phone/xiaomi/tqlbvhsym2rrjhgqdeoc.webp', '2025-05-06 15:29:48'),
(266, 'Xiaomi 14T', 54, 3, 'Xiaomi 14T 8GB 256GB', 12990000.00, 8, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033685/ReactNew/anh/Phone/xiaomi/fqlnqvfbwtmhebfzdvpf.webp', '2025-05-06 15:29:48'),
(267, 'Xiaomi 14T Pro', 54, 3, 'Xiaomi 14T Pro 12GB 512GB', 15990000.00, 6, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033685/ReactNew/anh/Phone/xiaomi/kzbadvexvuytatircxhd.webp', '2025-05-06 15:29:48'),
(268, 'Xiaomi Redmi 14C', 54, 3, 'Xiaomi Redmi 14C 4GB 128GB', 3490000.00, 20, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033685/ReactNew/anh/Phone/xiaomi/oirnuwyrtgs72ltnxdnh.webp', '2025-05-06 15:29:48'),
(269, 'Xiaomi Redmi Note 13', 54, 3, 'Xiaomi Redmi Note 13 6GB 128GB', 4990000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033685/ReactNew/anh/Phone/xiaomi/b013leet8euza9m4da3r.webp', '2025-05-06 15:29:48'),
(270, 'Xiaomi Redmi Note 13 Pro', 54, 3, 'Xiaomi Redmi Note 13 Pro 8GB 256GB', 7990000.00, 12, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033685/ReactNew/anh/Phone/xiaomi/w9cu2kw4xhzbeshrhqv3.webp', '2025-05-06 15:29:48'),
(271, 'Xiaomi Redmi Note 13 Pro Plus', 54, 3, 'Xiaomi Redmi Note 13 Pro Plus 12GB 512GB', 9990000.00, 10, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033685/ReactNew/anh/Phone/xiaomi/aygpwpfzedecxit3rx09.webp', '2025-05-06 15:29:48'),
(272, 'Xiaomi Redmi Pad SE', 54, 3, 'Xiaomi Redmi Pad SE 4GB 128GB', 4490000.00, 15, 'In Stock', 'https://res.cloudinary.com/ddd20pmdb/image/upload/v1745033685/ReactNew/anh/Phone/xiaomi/ayzbgx5n7elclnyx1jpa.webp', '2025-05-06 15:29:48');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `reviewID` int(11) NOT NULL,
  `productID` int(11) DEFAULT NULL,
  `customerID` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `reviewDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`reviewID`, `productID`, `customerID`, `rating`, `comment`, `reviewDate`) VALUES
(1, 1, 1, 5, 'Excellent phone! The camera quality is amazing and battery life is impressive.', '2023-11-20 02:30:00'),
(2, 21, 2, 5, 'The M3 chip is incredibly fast. Perfect for my video editing needs.', '2023-11-25 07:15:00'),
(3, 5, 3, 4, 'Great phone overall, though the UI takes some getting used to.', '2023-12-10 09:20:00'),
(4, 61, 3, 5, 'Best noise cancellation I\'ve ever experienced. Worth every penny!', '2023-12-11 03:45:00'),
(5, 6, 4, 4, 'Good upgrade from my previous iPhone. Camera and speed improvements are noticeable.', '2023-12-20 06:10:00'),
(6, 65, 5, 5, 'Incredible sound quality and very comfortable for long listening sessions.', '2024-01-15 04:25:00'),
(7, 27, 6, 5, 'Lightweight yet powerful. Perfect for students and professionals on the go.', '2024-01-25 08:40:00'),
(8, 91, 7, 4, 'Stunning display quality, though a bit pricey compared to alternatives.', '2024-02-05 02:50:00'),
(9, 40, 8, 5, 'The innovative design makes this laptop stand out. Performance is stellar.', '2024-02-15 07:30:00'),
(10, 51, 8, 5, 'Dream camera for any photographer. Image quality is outstanding!', '2024-02-16 09:45:00'),
(11, 56, 9, 4, 'Great action camera with excellent stabilization. Battery life could be better.', '2024-02-25 03:20:00'),
(12, 7, 10, 4, 'Beautiful display and smooth performance. Camera system is impressive.', '2024-03-10 05:35:00'),
(13, 73, 1, 5, 'Perfect smart watch with great health features and attractive design.', '2024-03-15 07:50:00');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplierID` int(11) NOT NULL,
  `supplierName` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplierID`, `supplierName`, `address`, `phoneNumber`, `email`) VALUES
(1, 'Công ty TNHH Thế Giới Số', '125 Nguyễn Trãi, Quận 1, TP.HCM', '028-38123456', 'contact@thegioiso.vn'),
(2, 'Mai Hoàng Computer', '78 Lê Thanh Nghị, Quận Hai Bà Trưng, Hà Nội', '024-36417892', 'sales@maihoangcomp.vn'),
(3, 'Phong Vũ Computer', '264A Nguyễn Thị Minh Khai, Quận 3, TP.HCM', '028-73001234', 'info@phongvu.vn'),
(4, 'Hanoicomputer', '129 Thái Hà, Quận Đống Đa, Hà Nội', '024-35380636', 'support@hanoicomputer.vn'),
(5, 'An Phát Computer', '49 Thái Hà, Quận Đống Đa, Hà Nội', '024-35380119', 'orders@anphatpc.com.vn'),
(6, 'FPT Shop', '261-263 Khánh Hội, Quận 4, TP.HCM', '028-73000880', 'fptshop@fpt.com.vn'),
(7, 'Gearvn', '78-80-82 Hoàng Hoa Thám, Quận Tân Bình, TP.HCM', '028-73006200', 'sales@gearvn.com'),
(8, 'Tân Doanh Computer', '154 Thái Hà, Quận Đống Đa, Hà Nội', '024-35641111', 'info@tandoanh.vn'),
(9, 'Memoryzone', '95 Trần Đăng Ninh, Quận Cầu Giấy, Hà Nội', '024-35599588', 'global@memoryzone.com.vn'),
(10, 'Thiết bị số HACOM', '131 Lê Thanh Nghị, Quận Hai Bà Trưng, Hà Nội', '024-35689939', 'components@hacom.vn'),
(11, 'Công ty Tin học Ngôi sao', '262 Bà Triệu, Quận Hai Bà Trưng, Hà Nội', '024-36285551', 'contact@ngoisao.net'),
(12, 'Công ty TNHH Công nghệ Máy tính Vĩnh Xuân', '42 Thái Hà, Quận Đống Đa, Hà Nội', '024-38574589', 'info@vinaxuantech.com');

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `voucherID` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `discount` decimal(5,2) DEFAULT NULL,
  `expirationDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`voucherID`, `code`, `discount`, `expirationDate`) VALUES
(1, 'WELCOME10', 10.00, '2025-12-31'),
(2, 'SUMMER25', 25.00, '2025-06-30'),
(3, 'FLASH15', 15.00, '2025-05-15'),
(4, 'HOLIDAY20', 20.00, '2025-12-25'),
(5, 'NEWUSER', 5.00, '2025-12-31'),
(6, 'LOYALTY50', 50.00, '2025-08-31'),
(7, 'WEEKEND30', 30.00, '2025-07-31'),
(8, 'BIRTHDAY', 15.00, '2025-12-31'),
(9, 'CLEARANCE', 40.00, '2025-04-30'),
(10, 'BLACKFRIDAY', 35.00, '2025-11-30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointmentID`),
  ADD KEY `customerID` (`customerID`),
  ADD KEY `employeeID` (`employeeID`);

--
-- Indexes for table `appointment_parts`
--
ALTER TABLE `appointment_parts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointmentID` (`appointmentID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employeeID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`orderDetailID`),
  ADD KEY `orderID` (`orderID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `customerID` (`customerID`),
  ADD KEY `employeeID` (`employeeID`),
  ADD KEY `voucherID` (`voucherID`);

--
-- Indexes for table `paymentmethods`
--
ALTER TABLE `paymentmethods`
  ADD PRIMARY KEY (`paymentID`),
  ADD UNIQUE KEY `methodName` (`methodName`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`paymentID`),
  ADD KEY `orderID` (`orderID`),
  ADD KEY `paymentMethodID` (`paymentMethodID`);

--
-- Indexes for table `productattributes`
--
ALTER TABLE `productattributes`
  ADD PRIMARY KEY (`attributeID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `productcategories`
--
ALTER TABLE `productcategories`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `categoryID` (`categoryID`),
  ADD KEY `supplierID` (`supplierID`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`reviewID`),
  ADD KEY `productID` (`productID`),
  ADD KEY `customerID` (`customerID`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplierID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`voucherID`),
  ADD UNIQUE KEY `code` (`code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointmentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `appointment_parts`
--
ALTER TABLE `appointment_parts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `orderDetailID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `paymentmethods`
--
ALTER TABLE `paymentmethods`
  MODIFY `paymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `paymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `productattributes`
--
ALTER TABLE `productattributes`
  MODIFY `attributeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `productcategories`
--
ALTER TABLE `productcategories`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=273;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `reviewID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplierID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `voucherID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`) ON DELETE SET NULL,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`) ON DELETE SET NULL;

--
-- Constraints for table `appointment_parts`
--
ALTER TABLE `appointment_parts`
  ADD CONSTRAINT `appointment_parts_ibfk_1` FOREIGN KEY (`appointmentID`) REFERENCES `appointments` (`appointmentID`) ON DELETE CASCADE;

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`employeeID`) REFERENCES `employees` (`employeeID`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`voucherID`) REFERENCES `vouchers` (`voucherID`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`paymentMethodID`) REFERENCES `paymentmethods` (`paymentID`);

--
-- Constraints for table `productattributes`
--
ALTER TABLE `productattributes`
  ADD CONSTRAINT `productattributes_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `productcategories` (`categoryID`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `productcategories` (`categoryID`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`supplierID`) REFERENCES `suppliers` (`supplierID`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
