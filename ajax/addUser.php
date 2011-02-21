<?php

	include ('./connect.php');

	$userId = $_POST['user_id'];
	$aFirstName = $_POST['first_name'];
	$aLastName = $_POST['last_name'];
	
	$bool = "false";
	
	$checkExists = "SELECT COUNT(*) FROM users WHERE user_id = '".$userId."'";
	$insertQuery = "INSERT INTO users (`user_id`, `first_name`, `last_name`) VALUES ('".$userId."','".$aFirstName."', '".$aLastName."')";
	
	try {
		$exists = $db->query($checkExists);
		
		foreach($exists as $row) {
			
			if ($row[0] = 1) {
				$bool = true;
				echo json_encode($bool);
				exit();
			}
		}
		
		$db->query($insertQuery);
		$bool = "true";
		echo json_encode($bool);
	} catch (PDOException $e) {
		echo json_encode($bool);
		echo $e;
	}
	
?>