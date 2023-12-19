CREATE TABLE IF NOT EXISTS `series` (
  `series_id` int NOT NULL AUTO_INCREMENT,
  `series_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`series_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;