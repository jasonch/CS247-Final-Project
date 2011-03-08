<?php


	include ('./connect.php');

	if(empty ($_POST['from_user']) || empty ($_POST['to_user']) ||
	   empty ($_POST['challenge']) || empty ($_POST['stake'])) {
	   echo "false";
	   exit();
	}

	$aFromUser = $_POST["from_user"];
	$aToUser = $_POST["to_user"];
	$aChallenge = $_POST["challenge"];
	//$aNumDays = $_POST["num_days"];
	$aStake = $_POST["stake"];
	
	$query = "SELECT ".$aStake." < points AS sufficient ".
		" FROM users WHERE user_id='". $aFromUser . "' OR user_id='".$aToUser."'";
	$result = $db->query($query);
	$suff = $result->fetch();
	if ($suff["sufficient"] == 0) {
		echo "false";
		exit();
	}
	
	
	$bool = false;
	$insertQuery = "INSERT INTO challenges ('from_user', 'to_user', 'challenge', 'stake') VALUES 
		('".$aFromUser."','".$aToUser."', '".$aChallenge."', '".$aStake."')";
	try {
		$db->query($insertQuery);	
	  echo "true";	
	} catch (PDOException $e) {
		echo $e;
	}
	
?>
