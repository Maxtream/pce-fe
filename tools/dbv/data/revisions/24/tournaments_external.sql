ALTER TABLE `tournaments_external` CHANGE `status` `status` ENUM('upcoming','registration','check_in','live','ended') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;