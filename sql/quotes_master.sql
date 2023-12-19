-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 14, 2022 at 06:44 PM
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
-- Table structure for table `quotes_master`
--

DROP TABLE IF EXISTS `quotes_master`;
CREATE TABLE IF NOT EXISTS `quotes_master` (
  `quotes_id` int NOT NULL AUTO_INCREMENT,
  `quotes_code` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `quotes_project_id` int DEFAULT NULL,
  `quotes_for_user_id` int NOT NULL,
  `created_by` int NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quotes_status` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `qty` int NOT NULL,
  `unit_price` double(12,3) DEFAULT NULL,
  `cost` double(12,3) DEFAULT NULL,
  PRIMARY KEY (`quotes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quotes_master`
--

INSERT INTO `quotes_master` (`quotes_id`, `quotes_code`, `quotes_project_id`, `quotes_for_user_id`, `created_by`, `created_date`, `modified_by`, `modified_date`, `quotes_status`, `qty`, `unit_price`, `cost`) VALUES
(1, 'QUOTES1121212', 1, 24, 24, '2022-01-15 00:05:45', 24, '2022-01-15 00:05:45', 'incomplete', 1, 1098980.000, 1008989.000);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
