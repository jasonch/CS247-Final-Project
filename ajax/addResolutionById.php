<?php

	include ('./connect.php');

	$anId = $_POST["user_id"];
	$aResolutionId = $_POST["resolution_id"];
	$bool = "-1";
	
	$insertQuery = "INSERT INTO user_resolutions VALUES ('$anId', '$aResolutionId)";
	
	try {
		$db->query($insertQuery);
		$bool = "0";
		echo json_encode($bool);
	} catch (PDOException $e) {
		$bool = "-1";
		echo json_encode($bool);
	}
	
?>