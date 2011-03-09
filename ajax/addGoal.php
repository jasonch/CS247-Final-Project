<?php

	include ('./connect.php');

	if (empty ($_POST['from_user']) || empty ($_POST['to_user']) ||
	   empty ($_POST['goal']) || empty ($_POST['num_days'])) {
	   echo json_encode(FALSE);
     echo "Invalid parameters";
	   exit();
	}

	$aFromUser = $_POST['from_user'];
	$aToUser = $_POST['to_user'];
	$aGoal = $_POST['goal'];
	$aNumDays = $_POST['num_days'];

	$insertGoalQuery = "INSERT INTO goals ('goal', 'num_days') VALUES  ('".$aGoal."','".$aNumDays."')";
	$getGoalIdQuery = "SELECT goal_id FROM goals ORDER BY time_created LIMIT 1";
	$getPoolIdQuery = "SELECT goal_id FROM pools ORDER BY time_created LIMIT 1";

	try {
    	$db->beginTransaction();
    	
    	$countOne = $db->exec($insertGoalQuery);
    	$goalId = $db->lastInsertId('goal_id');
    	$insertPoolQuery = "INSERT INTO pools ('goal_id') VALUES ('".$goalId."')";
    	$countTwo = $db->exec($insertPoolQuery);
    	$poolId = $db->lastInsertId('pool_id');
    	$insertParticipantsQuery = "INSERT INTO participants ('pool_id', 'user_id') VALUES ('".$poolId."', '".$aFromUser."');
    							    INSERT INTO participants ('pool_id', 'user_id') VALUES ('".$poolId."', '".$aToUser."')";
 		$countThree = $db->exec($insertParticipantQuery);
 		if ($countOne != 1 || $countTwo != 1 || $countThree != 2) {
 			$db->rollback();
 			echo json_encode(FALSE);
      echo "Insert failed. Rolling back.";
	   exit();
 		} else {
 			echo json_encode(TRUE);	
 		}
	} catch (PDOException $e) {
    	$db->rollBack();
    	echo json_encode(FALSE);
    	echo $e;
	}
	
?>
