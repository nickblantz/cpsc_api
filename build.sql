CREATE TABLE IF NOT EXISTS `user` (
    PRIMARY KEY `user_id` INT(11) NOT NULL AUTO_INCREMENT,
    `email` CHAR(64) NOT NULL,
    `password` CHAR(64) NOT NULL,
    `first_name` CHAR(64) NOT NULL,
    `user_type` enum('Manager', 'Investigator', 'Vendor') NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `recall` (
    `recall_id` INT(11) NOT NULL PRIMARY KEY,
    `recall_number` VARCHAR(64),
    `recall_date` VARCHAR(64),
    `description` VARCHAR(8192),
    `high_priority` BOOLEAN NOT NULL,
    `url` VARCHAR(512),
    `title` VARCHAR(256),
    `consumer_contact` VARCHAR(8192),
    `last_publish_date` VARCHAR(64),
) ENGINE=InnoDB

CREATE TABLE IF NOT EXISTS `recall_products` (
    `recall_products_id` INT(11) NOT NULL PRIMARY KEY,
    `recall_id` INT(11) FOREIGN KE
) ENGINE=InnoDB