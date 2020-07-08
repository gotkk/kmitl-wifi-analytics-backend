-- count form and channel
SELECT dbm_tb.*, count_tb.chanel, count_tb.count_channel, count_tb.count_form
FROM 
(
	SELECT *
	FROM ssid_dbm
)  dbm_tb
LEFT JOIN 
(
	SELECT ch_tb.*, form_tb.count_form
	FROM 
	(
		SELECT ch.form_id, ch.chanel, COUNT(*) AS count_channel FROM ssid_dbm AS ch
		GROUP BY ch.form_id, ch.chanel
		)  ch_tb
	LEFT JOIN 
	(
		SELECT f.form_id, COUNT(*) AS count_form FROM ssid_dbm AS f
		GROUP BY f.form_id
	) form_tb
	ON (ch_tb.form_id  = form_tb.form_id)
) count_tb
ON (dbm_tb.form_id  = count_tb.form_id AND dbm_tb.chanel = count_tb.chanel)


-- max and min of connection speed
SELECT MAX(c.download_inside) AS max_in, MAX(c.download_outside) AS max_out, MAX(c.youtube_cspeed) AS max_you, 
MIN(c.download_inside) AS min_in, MIN(c.download_outside) AS min_out, MIN(c.youtube_cspeed) AS min_you
FROM connection_speed AS c
WHERE c.download_inside != 0 AND c.download_outside != 0 AND c.youtube_cspeed != 0
