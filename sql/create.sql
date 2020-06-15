DROP TABLE location;
DROP TABLE building;

CREATE TABLE building (
  buildingcode VARCHAR(20) NOT NULL PRIMARY KEY,
  buildingname VARCHAR(160) NOT NULL
);

CREATE TABLE location (
  buildingcode VARCHAR(20) NOT NULL,
  locationcode INT NOT NULL,
  longitude DOUBLE,
  latitude DOUBLE,
  PRIMARY KEY(buildingcode, locationcode),
  CONSTRAINT `fk_building`
    FOREIGN KEY (buildingcode) REFERENCES building (buildingcode)
);