-- palma2.global_property definition

CREATE TABLE `global_property` (
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
  `created_date` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`global_property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;