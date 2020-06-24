-- visualize map
SELECT l.building_code, b.building_name, l.location_code, l.lat, l.lng
FROM location AS l
JOIN building AS b ON l.building_code  = b.building_code
ORDER BY l.building_code, l.location_code;

-- visualize map with percent
SELECT b_location.*,b_avg.max, b_avg.min, b_avg.quantity, b_avg.avg_percent
FROM 
	(
		SELECT l.building_code, b.building_name, l.location_code, l.lat, l.lng
		FROM location AS l
		JOIN building AS b ON l.building_code  = b.building_code
		ORDER BY l.building_code, l.location_code
	) b_location
LEFT JOIN 
	(
		SELECT f.building_code, b.building_name, MAX(dbm.percent) AS 'max' , MIN(dbm.percent) AS 'min', 
		COUNT(*) AS 'quantity', AVG(dbm.percent) AS 'avg_percent'
		FROM form AS f, building AS b, ssid_dbm AS dbm
		WHERE  f.building_code = b.building_code AND f.form_id = dbm.form_id
		GROUP BY f.building_code
	) b_avg
ON (b_location.building_code = b_avg.building_code)


-- building avarage
SELECT f.building_code, b.building_name, MAX(dbm.percent) AS 'max' , MIN(dbm.percent) AS 'min', 
COUNT(*) AS 'quantity', AVG(dbm.percent) AS 'avarage percent'
FROM form AS f, building AS b, ssid_dbm AS dbm
WHERE  f.building_code = b.building_code AND f.form_id = dbm.form_id
GROUP BY f.building_code;

-- form avreage by building
SELECT f.form_id, f.timestamp, f.building_code, b.building_name, f.floor, f.detail, MAX(dbm.percent) AS 'max',
MIN(dbm.percent) AS 'min',COUNT(*) AS 'quantity', AVG(dbm.percent) AS 'average_percent'
FROM form AS f, building AS b, ssid_dbm AS dbm
WHERE b.building_code = 'RS-OF' AND f.building_code = b.building_code AND f.form_id = dbm.form_id
GROUP BY f.form_id;

-- dbm data by building and form
SELECT f.form_id, f.timestamp, f.building_code, b.building_name, f.floor, f.detail, dbm.ssid, dbm.mac_address, 
dbm.chanel, dbm.dbm, dbm.percent
FROM form AS f, building AS b, ssid_dbm AS dbm
WHERE b.building_code = 'RS-14' AND f.form_id = '1061' AND f.building_code = b.building_code AND dbm.form_id = f.form_id;



