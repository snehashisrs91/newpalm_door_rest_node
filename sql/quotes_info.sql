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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `quotes_info`
--

INSERT INTO `quotes_info` (`quotes_info_id`, `quotes_id`, `frame_height`, `frame_width`, `quotes_image_path`) VALUES
(1, 1, 100.0000, 20.0000, 'images/quotes_image/quotes.png');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
