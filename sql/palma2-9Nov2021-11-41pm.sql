-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2021 at 07:10 PM
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
  `user_type_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `user_type_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Full Access', 2, '2021-11-06 10:29:52', '2021-11-06 10:29:52'),
(2, 'Manufacturer User', 4, '2021-11-06 10:37:45', '2021-11-06 10:37:45'),
(3, 'Manufacturer Reports', 4, '2021-11-06 10:37:45', '2021-11-06 10:37:45'),
(4, 'Manufacturer Window Quote', 4, '2021-11-06 10:38:03', '2021-11-06 10:38:03'),
(5, 'Reseller User', 5, '2021-11-06 10:38:03', '2021-11-06 10:38:03'),
(6, 'Reseller Reports', 5, '2021-11-06 12:29:06', '2021-11-06 12:29:06'),
(7, 'Reseller Window Quote', 5, '2021-11-06 12:30:08', '2021-11-06 12:30:08'),
(8, 'Reseller Customer', 5, '2021-11-06 15:00:18', '2021-11-06 15:00:18'),
(9, 'System User', 2, '2021-11-06 15:09:19', '2021-11-06 15:09:19'),
(10, 'System Common Parts Database', 2, '2021-11-06 15:09:19', '2021-11-06 15:09:19'),
(11, 'System Reports', 2, '2021-11-06 15:09:38', '2021-11-06 15:09:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `mobile` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_type_id` int(11) NOT NULL DEFAULT '1',
  `client_id` int(11) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `mobile`, `email`, `password`, `user_type_id`, `client_id`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 0, 'admin@admin.com', '$2a$08$ai38dAPTGf.WtorG8Z5VseT55Qv4xVU6ISMOBF1pH8PX7K3XU6plW', 2, 1, 1, '2021-11-05 06:57:29', '2021-11-05 06:57:29');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE IF NOT EXISTS `user_roles` (
  `roleId` int(11) NOT NULL DEFAULT '0',
  `userId` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE IF NOT EXISTS `user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

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
