<?php

	include ("./connect.php");
	
	$query = "SELECT * FROM users";
	$toReturn = array();
	
	try {
		$result = $db->query($query);
		
		foreach ($result as $row) {
			$user = new stdClass;
			$user->first_name = $row["first_name"];
			$user->last_name = $row["last_name"];
			$toReturn[$row->user_id] = $user;
		}
		
	} catch (PDOException $e) {
		echo $e;
	}
	
	echo json_encode($toReturn);
	
?>