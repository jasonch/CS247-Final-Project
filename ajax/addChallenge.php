<?php


	include ('./connect.php');

	$aFromUser = $_POST["from_user"];
	$aToUser = $_POST["to_user"];
	$aChallenge = $_POST["challenge"];
	##$aNumDays = $_POST["num_days"];
	$aStake = $_POST["stake"];
	$bool = false;
	$insertQuery = "INSERT INTO challenges ('from_user', 'to_user', 'challenge', 'stake') VALUES ('".$aFromUser."','".$aToUser."', '".$challenge."', '".$aNumDays."', '".$aStake."')";	
	try {
		$db->query($insertQuery);	
	  echo "true";	
	} catch (PDOException $e) {
		echo $e;
	}
	
?>
