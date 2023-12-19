-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 14, 2022 at 12:36 PM
-- Server version: 8.0.21
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `palma2`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `project_for_user_id` int NOT NULL,
  `created_by` int NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`project_id`),
  KEY `fk_project_for_userid` (`project_for_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `user_type_id` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `label`, `user_type_id`, `createdAt`, `updatedAt`) VALUES
(1, 'FullAccess', 'Full Access', 2, '2021-11-06 10:29:52', '2021-11-06 10:29:52'),
(2, 'ManufacturerUser', 'Manufacturer User', 4, '2021-11-06 10:37:45', '2021-11-06 10:37:45'),
(3, 'ManufacturerReports', 'Manufacturer Reports', 4, '2021-11-06 10:37:45', '2021-11-06 10:37:45'),
(4, 'ManufacturerWindowQuote', 'Manufacturer Window Quote', 4, '2021-11-06 10:38:03', '2021-11-06 10:38:03'),
(5, 'ResellerUser', 'Reseller User', 5, '2021-11-06 10:38:03', '2021-11-06 10:38:03'),
(6, 'ResellerReports', 'Reseller Reports', 5, '2021-11-06 12:29:06', '2021-11-06 12:29:06'),
(7, 'ResellerWindowQuote', 'Reseller Window Quote', 5, '2021-11-06 12:30:08', '2021-11-06 12:30:08'),
(8, 'ResellerCustomer', 'Reseller Customer', 5, '2021-11-06 15:00:18', '2021-11-06 15:00:18'),
(9, 'SystemUser', 'System User', 2, '2021-11-06 15:09:19', '2021-11-06 15:09:19'),
(10, 'SystemCommonPartsDatabase', 'System Common Parts Database', 2, '2021-11-06 15:09:19', '2021-11-06 15:09:19'),
(11, 'SystemReports', 'System Reports', 2, '2021-11-06 15:09:38', '2021-11-06 15:09:38'),
(12, 'customer', 'Customer', 1, '2021-11-11 19:58:23', '2021-11-11 19:58:23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `mobile` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_type_id` int NOT NULL DEFAULT '1',
  `client_id` int NOT NULL DEFAULT '1',
  `status` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdBy` bigint DEFAULT NULL,
  `updatedBy` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `mobile`, `email`, `password`, `user_type_id`, `client_id`, `status`, `createdAt`, `updatedAt`, `createdBy`, `updatedBy`) VALUES
(1, 'admin', 0, 'admin@admin.com', '$2a$08$ai38dAPTGf.WtorG8Z5VseT55Qv4xVU6ISMOBF1pH8PX7K3XU6plW', 2, 1, 1, '2021-11-05 06:57:29', '2021-11-05 06:57:29', NULL, NULL),
(14, 'test3', 2147483647, 'aaa@test.com', '$2a$08$nq79bYhWXTTNfLqQaVHv/u.ENxgxs7yvaOdWPkcIga0h7qxZiBt8i', 4, 1, 1, '2021-11-13 03:33:49', '2021-11-13 14:24:02', NULL, NULL),
(15, 'test', 99788877, '99@test.com', '$2a$08$m/WgNVLn9E2DSuoLM/bJ4eIb/gJcOMAYguILGWtO9ox18CGTdqB5u', 4, 1, 1, '2021-11-13 14:00:37', '2021-11-13 18:55:17', NULL, NULL),
(16, 'johndoe@email.com', 0, 'johndoe@email.com', '$2a$08$kmm.wPsThZRh4WriW1kbxuCQVV2QXnb6hPfLuoFK9ZI2WRClXe1p6', 2, 1, 1, '2021-11-15 20:07:50', '2021-11-15 20:07:50', NULL, NULL),
(17, 'albert', 0, 'albert@phy.uk', '$2a$08$jCpjbz3Wwq9.9cNeAwhGAOspNGCyME3sd2Y41umWz6DvoTDuZO.XK', 2, 1, 1, '2021-11-15 20:12:20', '2021-11-15 20:12:20', NULL, NULL),
(18, 'test3vvv', 0, 'swarnendutest@gmail.com', '$2a$08$hyQV21TlIfB0dCJNAORzxuVYRHU7Jn6OAmk/GPhKtqCleOAuaXhGS', 2, 1, 1, '2021-11-16 18:57:21', '2021-11-16 18:57:21', NULL, NULL),
(19, 'NewUser', 0, 'newuser@gmail.com', '$2a$08$1PIvEEdRuJ1i63CaaypubePRKbi.dEXC1QvZXWyk4D9QPJMCgqayK', 2, 1, 1, '2021-11-17 04:15:38', '2021-11-17 04:15:38', NULL, NULL),
(20, 'NewUser1', 0, 'newuser2@gmail.com', '$2a$08$xU/j.kTRYiTjwC3OMVZnp.yfFG8SMiP5wCN.JNL8pAopcgvoUJTQm', 2, 1, 1, '2021-11-17 04:17:57', '2021-11-17 04:17:57', NULL, NULL),
(21, 'NewUsercccc', 0, 'johndoeccc@email.com', '$2a$08$jVIuYRgVb.uCxIhISIq8i.0.ewOiYhFj0FFmdqQsDxLEikaPbF6Ey', 2, 1, 1, '2021-11-17 04:18:17', '2021-11-17 04:18:17', NULL, NULL),
(22, 'NewUsercxx', 8348002513, 'rtdd@gmail.com', '$2a$08$gFbcp9IEDa91ahbQ2M2T..vVE4028OBsKZEJq5VIo/r0h4rZTw6Ze', 2, 1, 1, '2021-11-17 04:18:52', '2021-11-17 04:18:52', NULL, NULL),
(23, 'Manufacturers', 5566566, 'Manufacturers@mmm.com', '$2a$08$cIBHqVyvtc9SGnGhx0tvgep3b46HNKH9CRTPoK.ZFZd2Qt9hParnm', 4, 1, 1, '2021-11-18 02:56:33', '2021-11-18 02:56:33', NULL, NULL),
(24, 'Manufacturers21', 5454545454, 'nnnnt@gmail.com', '$2a$08$4UD805Ci3rYRWFK9FhlIJuVyRHjoFzQqVHTX2Ra9xlvuN0FvEEDgC', 4, 1, 1, '2021-11-18 03:05:33', '2021-11-18 03:05:33', 24, 24),
(25, 'Manufacturers21xxx', 8348004545, 'ytyty@email.com', '$2a$08$0kAfuc0qz87sXmSzTiRIz.AOWT.4rqTjz16cE9Ovaitk86.740M32', 4, 1, 1, '2021-11-18 03:06:54', '2021-11-18 03:06:54', 25, 25),
(26, 'Reseller 1', 8787878787, 'Reseller@test.com', '$2a$08$br0e0vys7aAmzehR4JH1o.Wyl4.1Q4A8.fxRD2BfGOI15eLZRHr/u', 5, 1, 1, '2021-11-18 03:37:11', '2021-11-18 03:37:11', 26, 26),
(27, 'admintest1234', 6767676767, 'admintest1234@test.com', '$2a$08$XdSbX2NUPXQrxETIJk4fL.hA1HCte.25dK0KRc6etgctPp.qcC7xu', 2, 1, 1, '2021-12-16 03:59:10', '2021-12-16 03:59:10', 27, 27),
(28, 'Manufacturerstest', 6565656565, 'Manufacturerstest@mmm.com', '$2a$08$FQcQTwxnaY8Hie0qTzg9ieKd3QpQJK0B0zkStodIl5pw7DUYVa.TK', 4, 1, 1, '2021-12-16 04:00:42', '2021-12-16 04:00:42', 28, 28);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE IF NOT EXISTS `user_roles` (
  `roleId` int NOT NULL DEFAULT '0',
  `userId` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`roleId`,`userId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`roleId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2021-11-11 14:15:56', '2021-11-11 14:15:56'),
(2, 14, '2021-11-13 03:33:49', '2021-11-13 03:33:49'),
(2, 23, '2021-11-18 02:56:33', '2021-11-18 02:56:33'),
(2, 24, '2021-11-18 03:05:33', '2021-11-18 03:05:33'),
(2, 25, '2021-11-18 03:06:54', '2021-11-18 03:06:54'),
(2, 28, '2021-12-16 04:00:42', '2021-12-16 04:00:42'),
(3, 14, '2021-11-13 03:33:49', '2021-11-13 03:33:49'),
(3, 15, '2021-11-13 18:55:17', '2021-11-13 18:55:17'),
(3, 23, '2021-11-18 02:56:33', '2021-11-18 02:56:33'),
(3, 24, '2021-11-18 03:05:33', '2021-11-18 03:05:33'),
(3, 25, '2021-11-18 03:06:54', '2021-11-18 03:06:54'),
(3, 28, '2021-12-16 04:00:42', '2021-12-16 04:00:42'),
(4, 15, '2021-11-13 18:55:17', '2021-11-13 18:55:17'),
(4, 23, '2021-11-18 02:56:33', '2021-11-18 02:56:33'),
(4, 24, '2021-11-18 03:05:33', '2021-11-18 03:05:33'),
(4, 25, '2021-11-18 03:06:54', '2021-11-18 03:06:54'),
(4, 28, '2021-12-16 04:00:42', '2021-12-16 04:00:42'),
(5, 26, '2021-11-18 03:37:11', '2021-11-18 03:37:11'),
(6, 26, '2021-11-18 03:37:11', '2021-11-18 03:37:11'),
(7, 26, '2021-11-18 03:37:11', '2021-11-18 03:37:11'),
(8, 26, '2021-11-18 03:37:11', '2021-11-18 03:37:11'),
(9, 16, '2021-11-15 20:07:50', '2021-11-15 20:07:50'),
(9, 17, '2021-11-15 20:12:20', '2021-11-15 20:12:20'),
(9, 18, '2021-11-16 18:57:21', '2021-11-16 18:57:21'),
(9, 19, '2021-11-17 04:15:38', '2021-11-17 04:15:38'),
(9, 20, '2021-11-17 04:17:57', '2021-11-17 04:17:57'),
(9, 21, '2021-11-17 04:18:17', '2021-11-17 04:18:17'),
(9, 22, '2021-11-17 04:18:52', '2021-11-17 04:18:52'),
(9, 27, '2021-12-16 03:59:10', '2021-12-16 03:59:10'),
(10, 17, '2021-11-15 20:12:20', '2021-11-15 20:12:20'),
(10, 27, '2021-12-16 03:59:10', '2021-12-16 03:59:10'),
(11, 17, '2021-11-15 20:12:20', '2021-11-15 20:12:20'),
(11, 27, '2021-12-16 03:59:10', '2021-12-16 03:59:10');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
CREATE TABLE IF NOT EXISTS `user_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `name`, `label`) VALUES
(1, 'customer', 'Customer'),
(2, 'systemadmin', 'System Admin'),
(3, 'client', 'Client'),
(4, 'manufacturer', 'Manufacturer'),
(5, 'reseller', 'Reseller');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `fk_project_for_userid` FOREIGN KEY (`project_for_user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
