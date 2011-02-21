<?php

	include ('./connect.php');

	$aUserId = $_POST['user_id'];
	$aResolution = $_POST['resolution'];
	$aDay = $_POST['day'];
	
	$bool = "-1";
	$insertQuery = "INSERT INTO resolutions (`creator`,`resolution`, `num_days`) VALUES ('".$aUserId."','".$aResolution."', '".$aDay."')";
	//$resolutionIdQuery = "SELECT MAX('resolution_id') AS RID FROM resolutions";
	$resolutionIdQuery = "SELECT resolution_id FROM resolutions ORDER BY resolution_id DESC LIMIT 1";
	
	try {
		$db->query($insertQuery);
		$result = $db->query($resolutionIdQuery);
		
		//print_r ($result->fetch(PDO::FETCH_ASSOC));
		
		foreach($result as $row) {
			$bool = $row['resolution_id'];
			$insertResolution = "INSERT INTO user_resolutions (`user_id`, `resolution_id`) VALUES ('".$aUserId. "', '".$bool. "')";
			$db->query($insertResolution);
			echo json_encode($bool);
			break;
		}
		
		
	} catch (PDOException $e) {
		echo json_encode($bool);
		echo $e;
	}
	
?>