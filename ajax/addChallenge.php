<?php


	include ('./connect.php');

	$aFromUser = $_POST["from_user"];
	$aToUser = $_POST["to_user"];
	$aNumDays = $_POST["num_days"];
	$aStake = $_POST["stake"];
	$bool = false;
	$insertQuery = "INSERT INTO challenges ('from_user', 'to_user', 'num_days', 'stake') VALUES ('".$aFromUser."','".$aToUser."', '".$aNumDays."', '".$aStake."')";	
	try {
		$db->query($insertQuery);	
		$bool = true;
		echo json_encode($bool);
	} catch (PDOException $e) {
		echo $e;
	}
	
?>