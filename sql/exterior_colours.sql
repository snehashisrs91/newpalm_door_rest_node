CREATE TABLE IF NOT EXISTS `exterior_colours` (
  `exterior_colours_id` int NOT NULL AUTO_INCREMENT,
  `exterior_colour` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`exterior_colours_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;