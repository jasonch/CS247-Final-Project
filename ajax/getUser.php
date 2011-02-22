<?php

	include ("./connect.php");
	$user_id = $_POST['user_id'];
	$query = "SELECT * FROM users WHERE user_id = '".$userId."'";
	$toReturn = array();
	try {
		$result = $db->query($query);
		foreach ($result as $row) {
			$user = new stdClass;
			$user->user_id = $row["user_id"];
			$user->name = $row["name"];
			$user->points = $row["points"];
			$user->message = $row["message"];
			$toReturn[$row->user_id] = $user;
		}
	} catch (PDOException $e) {
		echo $e;
	}
	echo json_encode($toReturn);
	
?>