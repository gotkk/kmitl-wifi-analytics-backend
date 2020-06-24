DROP TABLE location;
DROP TABLE connection_speed;
DROP TABLE ssid_count;
DROP TABLE ssid_dbm;
DROP TABLE building;
DROP TABLE form;

CREATE TABLE building (
  building_code VARCHAR(24) NOT NULL PRIMARY KEY,
  building_name VARCHAR(200) NOT NULL
);

CREATE TABLE location (
  building_code VARCHAR(24) NOT NULL,
  location_code INT NOT NULL,
  lng DOUBLE NOT NULL,
  lat DOUBLE NOT NULL,
  PRIMARY KEY(building_code, location_code),
  CONSTRAINT `fk_location_building`
    FOREIGN KEY (building_code) REFERENCES building (building_code)
);

CREATE TABLE form(
	form_id VARCHAR(24) NOT NULL PRIMARY KEY,
	timestamp VARCHAR(24) NOT NULL,
	building VARCHAR(200) NOT NULL,
	building_code VARCHAR(24) NOT NULL,
	floor VARCHAR(24),
	detail VARCHAR(200)
);

CREATE TABLE connection_speed(
	form_id VARCHAR(24) NOT NULL,
	ssid VARCHAR(200) NOT NULL,
	download_inside INT NOT NULL,
	download_outside INT NOT NULL,
	youtube_cspeed INT NOT NULL,
	note VARCHAR(1000),
	PRIMARY KEY(form_id, ssid),
  CONSTRAINT `fk_connection_speed_form`
    FOREIGN KEY (form_id) REFERENCES form (form_id)
);

CREATE TABLE ssid_count(
	form_id VARCHAR(24) NOT NULL,
	channel INT NOT NULL,
	ssid_count INT NOT NULL,
	PRIMARY KEY(form_id, channel),
  	CONSTRAINT `fk_ssid_count_form`
    FOREIGN KEY (form_id) REFERENCES form (form_id)
);

CREATE TABLE ssid_dbm(
	form_id VARCHAR(24) NOT NULL,
	ssid VARCHAR(200) NOT NULL,
	mac_address VARCHAR(24) NOT NULL,
	chanel INT NOT NULL,
	dbm INT NOT NULL,
	percent DOUBLE,
	PRIMARY KEY(form_id, mac_address),
  	CONSTRAINT `fk_ssid_dbm_form`
    FOREIGN KEY (form_id) REFERENCES form (form_id)
);
