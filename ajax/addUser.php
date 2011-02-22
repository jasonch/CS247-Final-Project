<?php

	include ('./connect.php');

	$userId = $_POST["user_id"];
	$name = $_POST["name"];
	$bool = false;
	$checkExistQuery = "SELECT COUNT(*) FROM users WHERE user_id = '".$userId."'";
	$insertQuery = "INSERT INTO users ('user_id', 'name') VALUES ('".$userId."','".$name."')";
	try {
		$exist = $db->query($checkExistQuery);
		foreach($exist as $row) {
			if ($row[0] == 1) {
        echo "true";
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
