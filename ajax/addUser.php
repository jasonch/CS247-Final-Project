<?php

	include ('./connect.php');

<<<<<<< HEAD:ajax/addUser.php
	$userId = $_POST["user_id"];
	$name = $_POST["name"];
	$bool = false;
	$checkExistQuery = "SELECT COUNT(*) FROM users WHERE user_id = '".$userId."'";
	$insertQuery = "INSERT INTO users ('user_id', 'name') VALUES ('".$userId."','".$name."')";
	try {
		$exist = $db->query($checkExistQuery);
		foreach($exist as $row) {
=======
	$userId = $_POST['user_id'];
	$aFirstName = $_POST['first_name'];
	$aLastName = $_POST['last_name'];
	
	$bool = "false";
	
	$checkExists = "SELECT COUNT(*) FROM users WHERE user_id = '".$userId."'";
	$insertQuery = "INSERT INTO users (`user_id`, `first_name`, `last_name`) VALUES ('".$userId."','".$aFirstName."', '".$aLastName."')";
	
	try {
		$exists = $db->query($checkExists);
		
		foreach($exists as $row) {
			
>>>>>>> 2d0c781cc0efbf144565a6477d94973a21c8df3e:ajax/addUser.php
			if ($row[0] = 1) {
				$bool = true;
				echo json_encode($bool);
				exit();
			}
		}
<<<<<<< HEAD:ajax/addUser.php
		$db->query($insertQuery);
		$bool = true;
		echo json_encode($bool);
	} catch (PDOException $e) {
=======
		
		$db->query($insertQuery);
		$bool = "true";
		echo json_encode($bool);
	} catch (PDOException $e) {
		echo json_encode($bool);
>>>>>>> 2d0c781cc0efbf144565a6477d94973a21c8df3e:ajax/addUser.php
		echo $e;
	}
	
?>