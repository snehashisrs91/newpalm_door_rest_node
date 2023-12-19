CREATE TABLE IF NOT EXISTS `colour_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `colour_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hex_value` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `colour_type` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `colour_option` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
