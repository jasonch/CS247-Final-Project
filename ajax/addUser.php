<?php

	include ('./connect.php');

	$userId = $_POST["user_id"];
	$name = $_POST["name"];
	$selectQuery = "SELECT user_id, name, points, message FROM users WHERE user_id = '".$userId."'";
	$insertQuery = "INSERT INTO users ('user_id', 'name') VALUES ('".$userId."','".$name."')";
	try {
		$exist = $db->query($selectQuery);
		foreach($exist as $row) {
      echo json_encode ((object)$row);
	  	exit();
	  }
	
		$count = $db->exec($insertQuery);
    if ($count == 0) {
      echo "false";
      exit ();
    }

		$exist = $db->query($selectQuery);
		foreach($exist as $row) {
      echo json_encode ((object)$row);
	  	exit();
	  }

		echo json_encode($bool);
	} catch (PDOException $e) {
		echo "false"; 
	}
	
?>
