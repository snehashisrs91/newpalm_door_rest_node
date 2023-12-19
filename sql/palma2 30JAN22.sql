-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 30, 2022 at 04:16 PM
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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `customer_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exterior_colours`
--

DROP TABLE IF EXISTS `exterior_colours`;
CREATE TABLE IF NOT EXISTS `exterior_colours` (
  `exterior_colours_id` int NOT NULL AUTO_INCREMENT,
  `exterior_colour` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`exterior_colours_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `exterior_colours`
--

INSERT INTO `exterior_colours` (`exterior_colours_id`, `exterior_colour`, `user_id`, `is_active`, `created_date`, `created_by`, `modified_by`, `modified_date`) VALUES
(1, 'Exterior Colour1', 30, 1, '2022-01-30 15:40:14', 30, 30, '2022-01-30 15:40:14');

-- --------------------------------------------------------

--
-- Table structure for table `fixed_window_profiles`
--

DROP TABLE IF EXISTS `fixed_window_profiles`;
CREATE TABLE IF NOT EXISTS `fixed_window_profiles` (
  `fixed_window_profiles_id` int NOT NULL AUTO_INCREMENT,
  `fixed_window_profile` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`fixed_window_profiles_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `fixed_window_profiles`
--

INSERT INTO `fixed_window_profiles` (`fixed_window_profiles_id`, `fixed_window_profile`, `user_id`, `is_active`, `created_date`, `created_by`, `modified_by`, `modified_date`) VALUES
(1, 'FixedWindow 1', 30, 1, '2022-01-30 15:39:52', 30, 30, '2022-01-30 15:39:52');

-- --------------------------------------------------------

--
-- Table structure for table `glass_types`
--

DROP TABLE IF EXISTS `glass_types`;
CREATE TABLE IF NOT EXISTS `glass_types` (
  `glass_type_id` int NOT NULL AUTO_INCREMENT,
  `glass_type` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`glass_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `glass_types`
--

INSERT INTO `glass_types` (`glass_type_id`, `glass_type`, `user_id`, `is_active`, `created_date`, `created_by`, `modified_by`, `modified_date`) VALUES
(1, 'Glass Type 1', 30, 1, '2022-01-30 15:39:34', 30, 30, '2022-01-30 15:39:34');

-- --------------------------------------------------------

--
-- Table structure for table `global_property`
--

DROP TABLE IF EXISTS `global_property`;
CREATE TABLE IF NOT EXISTS `global_property` (
  `global_property_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `user_id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `series_id` int DEFAULT NULL,
  `measurement_type_id` int DEFAULT NULL,
  `rso_gap_id` int DEFAULT NULL,
  `glass_type_id` int DEFAULT NULL,
  `grilles_id` int DEFAULT NULL,
  `fixed_window_profiles_id` int DEFAULT NULL,
  `exterior_colours_id` int DEFAULT NULL,
  `interior_colours_id` int DEFAULT NULL,
  `hardware_type_id` int DEFAULT NULL,
  `hardware_finish_id` int DEFAULT NULL,
  `exterior_id` int DEFAULT NULL,
  `interior_id` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`global_property_id`),
  UNIQUE KEY `project_id` (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `global_property`
--

INSERT INTO `global_property` (`global_property_id`, `project_id`, `user_id`, `customer_id`, `series_id`, `measurement_type_id`, `rso_gap_id`, `glass_type_id`, `grilles_id`, `fixed_window_profiles_id`, `exterior_colours_id`, `interior_colours_id`, `hardware_type_id`, `hardware_finish_id`, `exterior_id`, `interior_id`, `is_active`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 1, 30, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 30, '2022-01-30 15:42:43', 30, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `grilles`
--

DROP TABLE IF EXISTS `grilles`;
CREATE TABLE IF NOT EXISTS `grilles` (
  `grilles_id` int NOT NULL AUTO_INCREMENT,
  `grill` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`grilles_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `grilles`
--

INSERT INTO `grilles` (`grilles_id`, `grill`, `user_id`, `is_active`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'Grille1 ', 30, 1, 30, '2022-01-30 15:39:44', 30, '2022-01-30 15:39:44');

-- --------------------------------------------------------

--
-- Table structure for table `hardware_finish_master`
--

DROP TABLE IF EXISTS `hardware_finish_master`;
CREATE TABLE IF NOT EXISTS `hardware_finish_master` (
  `hardware_finish_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `hardware_finish_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`hardware_finish_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hardware_finish_master`
--

INSERT INTO `hardware_finish_master` (`hardware_finish_id`, `user_id`, `hardware_finish_name`, `is_active`, `created_date`, `created_by`, `modified_by`, `modified_date`, `price`) VALUES
(1, 30, 'test1 Finish ', 1, '2022-01-30 15:41:03', 30, 30, '2022-01-30 15:41:03', '0.00'),
(2, 30, 'test3 Finish ', 1, '2022-01-30 15:41:03', 30, 30, '2022-01-30 15:41:03', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `hardware_type_master`
--

DROP TABLE IF EXISTS `hardware_type_master`;
CREATE TABLE IF NOT EXISTS `hardware_type_master` (
  `hardware_type_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `hardware_type_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`hardware_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hardware_type_master`
--

INSERT INTO `hardware_type_master` (`hardware_type_id`, `user_id`, `hardware_type_name`, `is_active`, `created_date`, `created_by`, `modified_by`, `modified_date`, `price`) VALUES
(1, 30, 'Hardware Type1', 1, '2022-01-30 15:40:26', 30, 30, '2022-01-30 15:40:26', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `interior_colours`
--

DROP TABLE IF EXISTS `interior_colours`;
CREATE TABLE IF NOT EXISTS `interior_colours` (
  `interior_colours_id` int NOT NULL AUTO_INCREMENT,
  `interior_colour` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`interior_colours_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `interior_colours`
--

INSERT INTO `interior_colours` (`interior_colours_id`, `interior_colour`, `user_id`, `is_active`, `created_date`, `created_by`, `modified_by`, `modified_date`) VALUES
(1, 'Interior Colour1', 30, 1, '2022-01-30 15:40:06', 30, 30, '2022-01-30 15:40:06');

-- --------------------------------------------------------

--
-- Table structure for table `manufac_customer_master`
--

DROP TABLE IF EXISTS `manufac_customer_master`;
CREATE TABLE IF NOT EXISTS `manufac_customer_master` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `customer_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `manufac_customer_master`
--

INSERT INTO `manufac_customer_master` (`customer_id`, `user_id`, `customer_name`, `is_active`, `created_date`, `created_by`, `modified_by`, `modified_date`, `price`) VALUES
(1, 30, 'Customer1', 1, '2022-01-30 15:37:36', 30, 30, '2022-01-30 15:37:36', '0.00'),
(2, 30, 'Customer2', 1, '2022-01-30 15:38:00', 30, 30, '2022-01-30 15:38:00', '0.00'),
(3, 30, 'Customer3', 1, '2022-01-30 15:38:00', 30, 30, '2022-01-30 15:38:00', '0.00'),
(4, 30, 'Customer4', 1, '2022-01-30 15:38:00', 30, 30, '2022-01-30 15:38:00', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `manufac_exterioraccessories_master`
--

DROP TABLE IF EXISTS `manufac_exterioraccessories_master`;
CREATE TABLE IF NOT EXISTS `manufac_exterioraccessories_master` (
  `exterior_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `exterior_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`exterior_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `manufac_exterioraccessories_master`
--

INSERT INTO `manufac_exterioraccessories_master` (`exterior_id`, `user_id`, `exterior_name`, `is_active`, `created_date`, `created_by`, `modified_by`, `modified_date`, `price`) VALUES
(1, 30, 'Exterior Accessories1', 1, '2022-01-30 15:41:47', 30, 30, '2022-01-30 15:41:47', '0.00'),
(2, 30, 'Exterior Accessories2', 1, '2022-01-30 15:41:47', 30, 30, '2022-01-30 15:41:47', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `manufac_interioraccessories_master`
--

DROP TABLE IF EXISTS `manufac_interioraccessories_master`;
CREATE TABLE IF NOT EXISTS `manufac_interioraccessories_master` (
  `interior_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `interior_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`interior_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `manufac_interioraccessories_master`
--

INSERT INTO `manufac_interioraccessories_master` (`interior_id`, `user_id`, `interior_name`, `is_active`, `created_date`, `created_by`, `modified_by`, `modified_date`, `price`) VALUES
(1, 30, 'Accessories 1', 1, '2022-01-30 15:41:20', 30, 30, '2022-01-30 15:41:20', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `measurement_type`
--

DROP TABLE IF EXISTS `measurement_type`;
CREATE TABLE IF NOT EXISTS `measurement_type` (
  `measurement_type_id` int NOT NULL AUTO_INCREMENT,
  `measurement_type_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`measurement_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `measurement_type`
--

INSERT INTO `measurement_type` (`measurement_type_id`, `measurement_type_name`, `user_id`, `is_active`, `created_date`, `created_by`, `modified_by`, `modified_date`) VALUES
(1, 'Frame Size', 30, 1, '2022-01-30 15:38:34', 30, 30, '2022-01-30 15:38:34'),
(2, 'Brickmould', 30, 1, '2022-01-30 15:38:52', 30, 30, '2022-01-30 15:38:52'),
(3, 'Rough Opening', 30, 1, '2022-01-30 15:38:52', 30, 30, '2022-01-30 15:38:52');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `project_name`, `project_for_user_id`, `created_by`, `created_date`, `modified_by`, `modified_date`, `is_active`) VALUES
(1, 'ProjectTest', 30, 30, '2022-01-15 12:11:15', 30, '2022-01-15 12:11:15', 1),
(2, 'ProjectTest2', 30, 30, '2022-01-29 05:12:34', 30, '2022-01-29 05:12:34', 1),
(3, 'ProjectTest3', 30, 30, '2022-01-29 05:15:19', 30, '2022-01-29 05:15:19', 1),
(4, 'ProjectTest4', 30, 30, '2022-01-29 05:16:28', 30, '2022-01-29 05:16:28', 1);

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

DROP TABLE IF EXISTS `quotes`;
CREATE TABLE IF NOT EXISTS `quotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quotes_id` int DEFAULT NULL,
  `quotes_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quotes_project_id` int DEFAULT NULL,
  `quotes_for_user_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quotes_status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `unit_price` double DEFAULT NULL,
  `unit_cost` double DEFAULT NULL,
  `quotes_info_id` int DEFAULT NULL,
  `frame_height` double DEFAULT NULL,
  `frame_width` double DEFAULT NULL,
  `quotes_image_path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quotes_info`
--

DROP TABLE IF EXISTS `quotes_info`;
CREATE TABLE IF NOT EXISTS `quotes_info` (
  `quotes_info_id` int NOT NULL AUTO_INCREMENT,
  `quotes_id` int NOT NULL,
  `frame_height` double(12,4) DEFAULT NULL,
  `frame_width` double(12,4) DEFAULT NULL,
  `quotes_image_path` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`quotes_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quotes_info`
--

INSERT INTO `quotes_info` (`quotes_info_id`, `quotes_id`, `frame_height`, `frame_width`, `quotes_image_path`) VALUES
(1, 1, 78.0000, 45.0000, 'images/quotes_image/quotes.png'),
(2, 2, 60.0000, 80.0000, 'images/quotes_image/quotes.png'),
(3, 3, 50.0000, 89.0000, 'images/quotes_image/quotes.png'),
(4, 4, 90.0000, 90.0000, 'images/quotes_image/quotes.png'),
(5, 5, 10.0000, 20.0000, 'images/quotes_image/quotes.png'),
(6, 6, 23.0000, 32.0000, 'images/quotes_image/quotes.png'),
(7, 7, 2.0000, 2.0000, 'images/quotes_image/quotes.png'),
(8, 8, 10.0000, 20.0000, 'images/quotes_image/quotes.png');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quotes_master`
--

INSERT INTO `quotes_master` (`quotes_id`, `quotes_code`, `quotes_project_id`, `quotes_for_user_id`, `created_by`, `created_date`, `modified_by`, `modified_date`, `quotes_status`, `qty`, `unit_price`, `cost`) VALUES
(1, 'abcdrtrt', 1, 30, 30, '2022-01-15 12:12:17', 30, '2022-01-15 12:12:17', 'incomplete', 5, 300.000, 78.000),
(2, 'Quotes1', 1, 30, 30, '2022-01-15 12:21:20', 30, '2022-01-15 12:21:20', 'incomplete', 3, 60.000, 70.000),
(3, 'wewedsd', NULL, 30, 30, '2022-01-15 12:21:50', 30, '2022-01-15 12:21:50', 'incomplete', 7, 80.000, 90.000),
(4, 'trtrt', NULL, 30, 30, '2022-01-15 12:22:31', 30, '2022-01-15 12:22:31', 'incomplete', 6, 8.000, 9.000),
(5, 'wewedsd', NULL, 30, 30, '2022-01-29 05:00:42', 30, '2022-01-29 05:00:42', 'incomplete', 70, 9.000, 60.000),
(6, 'wewedsd', NULL, 30, 30, '2022-01-29 05:01:53', 30, '2022-01-29 05:01:53', 'incomplete', 2, 23.000, 3.000),
(7, 'project2 quotes', 2, 30, 30, '2022-01-29 05:13:05', 30, '2022-01-29 05:13:05', 'incomplete', 1, 12.000, 21.000),
(8, 'quotes1', NULL, 30, 30, '2022-01-30 12:46:07', 30, '2022-01-30 12:46:07', 'incomplete', 1, 10.000, 10.000);

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
-- Table structure for table `rso_gaps`
--

DROP TABLE IF EXISTS `rso_gaps`;
CREATE TABLE IF NOT EXISTS `rso_gaps` (
  `rso_gap_id` int NOT NULL AUTO_INCREMENT,
  `rso_gap` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rso_gap_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `rso_gaps`
--

INSERT INTO `rso_gaps` (`rso_gap_id`, `rso_gap`, `user_id`, `is_active`, `created_date`, `created_by`, `modified_by`, `modified_date`) VALUES
(1, '3/4', 30, 1, '2022-01-30 15:39:09', 30, 30, '2022-01-30 15:39:09');

-- --------------------------------------------------------

--
-- Table structure for table `series`
--

DROP TABLE IF EXISTS `series`;
CREATE TABLE IF NOT EXISTS `series` (
  `series_id` int NOT NULL AUTO_INCREMENT,
  `series_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`series_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`series_id`, `series_name`, `user_id`, `is_active`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 'Classic', 30, 1, 30, '2022-01-30 15:38:16', 30, '2022-01-30 15:38:16');

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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

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
(28, 'Manufacturerstest', 6565656565, 'Manufacturerstest@mmm.com', '$2a$08$FQcQTwxnaY8Hie0qTzg9ieKd3QpQJK0B0zkStodIl5pw7DUYVa.TK', 4, 1, 1, '2021-12-16 04:00:42', '2021-12-16 04:00:42', 28, 28),
(29, 'systemadmin', 966321668, 'systemadmin@rrr.ppp', '$2a$08$MsACAPdICuke6c5ea1GQ8uulswRIlQ.HM6Lz6rlwE6W7Vd/i1gn.S', 2, 1, 1, '2022-01-14 20:30:14', '2022-01-14 20:30:14', 29, 29),
(30, 'Manufacturers1111', 9898985655, 'Manufacturers1111@ggg.com', '$2a$08$A5gX1sFLSyocwrvZy5mUheQIPTiCN/8SPc4RIY6GB8qPyR/Z42xm6', 4, 1, 1, '2022-01-15 12:10:39', '2022-01-15 12:10:39', 30, 30);

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
(2, 30, '2022-01-15 12:10:39', '2022-01-15 12:10:39'),
(3, 14, '2021-11-13 03:33:49', '2021-11-13 03:33:49'),
(3, 15, '2021-11-13 18:55:17', '2021-11-13 18:55:17'),
(3, 23, '2021-11-18 02:56:33', '2021-11-18 02:56:33'),
(3, 24, '2021-11-18 03:05:33', '2021-11-18 03:05:33'),
(3, 25, '2021-11-18 03:06:54', '2021-11-18 03:06:54'),
(3, 28, '2021-12-16 04:00:42', '2021-12-16 04:00:42'),
(3, 30, '2022-01-15 12:10:39', '2022-01-15 12:10:39'),
(4, 15, '2021-11-13 18:55:17', '2021-11-13 18:55:17'),
(4, 23, '2021-11-18 02:56:33', '2021-11-18 02:56:33'),
(4, 24, '2021-11-18 03:05:33', '2021-11-18 03:05:33'),
(4, 25, '2021-11-18 03:06:54', '2021-11-18 03:06:54'),
(4, 28, '2021-12-16 04:00:42', '2021-12-16 04:00:42'),
(4, 30, '2022-01-15 12:10:39', '2022-01-15 12:10:39'),
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
(9, 29, '2022-01-14 20:30:14', '2022-01-14 20:30:14'),
(10, 17, '2021-11-15 20:12:20', '2021-11-15 20:12:20'),
(10, 27, '2021-12-16 03:59:10', '2021-12-16 03:59:10'),
(10, 29, '2022-01-14 20:30:14', '2022-01-14 20:30:14'),
(11, 17, '2021-11-15 20:12:20', '2021-11-15 20:12:20'),
(11, 27, '2021-12-16 03:59:10', '2021-12-16 03:59:10'),
(11, 29, '2022-01-14 20:30:14', '2022-01-14 20:30:14');

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
