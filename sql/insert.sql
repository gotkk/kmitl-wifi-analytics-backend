LOAD DATA LOW_PRIORITY LOCAL INFILE 'C:\\Users\\Kuser\\Downloads\\building.csv' 
REPLACE INTO TABLE `kmitl_wifi`.`building` 
CHARACTER SET utf8 
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"' 
ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES 
(`building_code`, `building_name`);


LOAD DATA LOW_PRIORITY LOCAL INFILE 'C:\\Users\\Kuser\\Downloads\\form.csv' 
REPLACE INTO TABLE `kmitl_wifi`.`form` 
CHARACTER SET utf8 
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' 
ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES 
(`form_id`, `timestamp`, `building`, `building_code`, `floor`, `detail`);


LOAD DATA LOW_PRIORITY LOCAL INFILE 'C:\\Users\\Kuser\\Downloads\\location.csv' 
REPLACE INTO TABLE `kmitl_wifi`.`location` 
CHARACTER SET utf8 
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' 
ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES 
(`building_code`, `location_code`, `lng`, `lat`);


LOAD DATA LOW_PRIORITY LOCAL INFILE 'C:\\Users\\Kuser\\Downloads\\connection_speed.csv' 
REPLACE INTO TABLE `kmitl_wifi`.`connection_speed` 
CHARACTER SET utf8 
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' 
ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES 
(`form_id`, `ssid`, `download_inside`, `download_outside`, `youtube_cspeed`, `note`);


LOAD DATA LOW_PRIORITY LOCAL INFILE 'C:\\Users\\Kuser\\Downloads\\ssid_dbm.csv' 
REPLACE INTO TABLE `kmitl_wifi`.`ssid_dbm` 
CHARACTER SET utf8 
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' 
ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES (`form_id`, `ssid`, `mac_address`, `chanel`, `dbm`);


LOAD DATA LOW_PRIORITY LOCAL INFILE 'C:\\Users\\Kuser\\Downloads\\ssid_count.csv' 
REPLACE INTO TABLE `kmitl_wifi`.`ssid_count` 
CHARACTER SET utf8 
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' 
ESCAPED BY '"' 
LINES TERMINATED BY '\r\n' 
IGNORE 1 LINES 
(`form_id`, `channel`, `ssid_count`);


ALTER TABLE ssid_dbm
ADD percent DOUBLE;