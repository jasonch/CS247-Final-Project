<?php

	include ("./connect.php");
	
	if (empty ($_POST["challenge_id"]) || empty ($_POST["option"])
		exit();
	}
	
	$aChallengeId = $_POST["challenge_id"];
	$anOption = $_POST["option"];
	
	$query = "UPDATE challenges SET status = '".$option."' WHERE challenge_id = '".$challengeId."'"; 
	
	try {
		$db->query($query);
	} catch (PDOException $e) {
		echo $e
	}

?>