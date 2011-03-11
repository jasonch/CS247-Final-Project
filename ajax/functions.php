<?php

function getUser ($user_id) {
  global $db;
	$query = "SELECT * FROM users WHERE user_id = '".$user_id."'";
	try {
		$result = $db->query($query);
		foreach ($result as $row) { // should be unique
			$user = new stdClass;
			$user->user_id = $row['user_id'];
			$user->name = $row['name'];
			$user->status = $row['status'];
      return $user;
	}
    return FALSE; 
	} catch (PDOException $e) {
		echo $e;
	}

}

?>
