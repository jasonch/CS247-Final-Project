<?php

	include ('./connect.php');
	
	if (empty ($_POST['user_id']) || empty ($_POST['name'])) {
	   echo json_encode(FALSE);
	   exit();
	}

	$userId = $_POST['user_id'];
	$name = $_POST['name'];
	
	$selectQuery = "SELECT user_id, name FROM users WHERE user_id = '".$userId."'";
	$insertQuery = "INSERT INTO users ('user_id', 'name') VALUES ('".$userId."','".$name."')";
	try {
		$exist = $db->query($selectQuery);
		foreach($exist as $row) {
    		echo json_encode ((object)$row);
	  		exit();
	  	}
	
		$count = $db->exec($insertQuery);
    	if ($count == 0) {
      		echo "FALSE";
      		exit ();
    	}

		$exist = $db->query($selectQuery);
		foreach($exist as $row) {
     		echo json_encode ((object)$row);
	  		exit();
	  	}

		echo "FALSE";
	} catch (PDOException $e) {
    echo "FALSE";
	}
	
?>
