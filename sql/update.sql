-- update new percentage criteria
UPDATE ssid_dbm AS old_tb
LEFT JOIN
(
	SELECT dbm_tb.form_id, dbm_tb.mac_address, dbm_tb.dbm, ((1/cs_tb.count_ch)*(100+(dbm_tb.dbm))) AS 'percent'
	FROM 
	(
		SELECT * 
		FROM	ssid_dbm AS dbm
	)  dbm_tb
	LEFT JOIN 
	(
		SELECT dbm.form_id, dbm.chanel, COUNT(dbm.chanel) AS 'count_ch'
		FROM ssid_dbm AS dbm
		GROUP BY dbm.form_id, dbm.chanel
	) cs_tb
	ON (dbm_tb.form_id = cs_tb.form_id AND dbm_tb.chanel = cs_tb.chanel)
) new_tb
ON old_tb.form_id = new_tb.form_id AND old_tb.mac_address = new_tb.mac_address AND old_tb.dbm = new_tb.dbm
SET  old_tb.percent = new_tb.percent
WHERE old_tb.form_id = new_tb.form_id AND old_tb.mac_address = new_tb.mac_address AND old_tb.dbm = new_tb.dbm