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
/*	
	$query = "SELECT ".$aStake." < points AS sufficient ".
		" FROM users WHERE user_id='". $aFromUser . "' OR user_id='".$aToUser."'";
	$result = $db->query($query);
	$suff = $result->fetch();
	if ($suff["sufficient"] == 0) {
		echo "false";
		exit();
	}
*/


	$insertQuery = "INSERT INTO challenges ('from_user', 'to_user', 'challenge', 'stake') VALUES 
		('".$aFromUser."','".$aToUser."', '".$aChallenge."', '".$aStake."')";
  $updateStake = "UPDATE users SET points = (points - $aStake) WHERE user_id = '$aFromUser'";

	try {
    $db->beginTransaction ();

		$count = $db->exec($insertQuery);	
    $count2 = $db->exec ($updateStake);
    $db->commit ();
    if ($count != 1 || $count2 != 1) {
      $db->rollBack ();
      echo "false";
    } else 
  	  echo "true";	
	} catch (PDOException $e) {
		echo $e;
	}
	
?>
