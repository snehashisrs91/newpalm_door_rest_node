-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2021 at 07:58 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `palma2`
--

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `user_type_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

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

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `mobile` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_type_id` int(11) NOT NULL DEFAULT '1',
  `client_id` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `mobile`, `email`, `password`, `user_type_id`, `client_id`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 0, 'admin@admin.com', '$2a$08$ai38dAPTGf.WtorG8Z5VseT55Qv4xVU6ISMOBF1pH8PX7K3XU6plW', 2, 1, 1, '2021-11-05 06:57:29', '2021-11-05 06:57:29'),
(14, 'test3', 2147483647, 'aaa@test.com', '$2a$08$nq79bYhWXTTNfLqQaVHv/u.ENxgxs7yvaOdWPkcIga0h7qxZiBt8i', 4, 1, 1, '2021-11-13 03:33:49', '2021-11-13 14:24:02'),
(15, 'test', 99788877, '99@test.com', '$2a$08$m/WgNVLn9E2DSuoLM/bJ4eIb/gJcOMAYguILGWtO9ox18CGTdqB5u', 4, 1, 1, '2021-11-13 14:00:37', '2021-11-13 18:55:17');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE IF NOT EXISTS `user_roles` (
  `roleId` int(11) NOT NULL DEFAULT '0',
  `userId` int(11) NOT NULL DEFAULT '0',
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
(3, 14, '2021-11-13 03:33:49', '2021-11-13 03:33:49'),
(3, 15, '2021-11-13 18:55:17', '2021-11-13 18:55:17'),
(4, 15, '2021-11-13 18:55:17', '2021-11-13 18:55:17');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE IF NOT EXISTS `user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `name`, `label`) VALUES
(1, 'customer', 'Customer'),
(2, 'systemadmin', 'System Admin'),
(3, 'client', 'Client'),
(4, 'manufacturer', 'Manufacturer'),
(5, 'reseller', 'Reseller');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
