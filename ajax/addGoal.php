<?php

	include ('./connect.php');
	if (empty ($_GET['from_user']) || empty ($_GET['to_user']) ||
		empty ($_GET['goal']) || empty ($_GET['num_days'])) {
		echo json_encode(FALSE);
		echo "Invalid parameters";
		exit();
	}

	$aFromUser = $_GET['from_user'];
	$aToUser = $_GET['to_user'];
	$aGoal = $_GET['goal'];
	$aNumDays = $_GET['num_days'];
	
	$names = explode(",", $aToUser);
	print_r($names);

	$insertGoalQuery = "INSERT INTO goals ('goal', 'num_days') VALUES  ('".$aGoal."','".$aNumDays."')";
	$getGoalIdQuery = "SELECT goal_id FROM goals ORDER BY time_created LIMIT 1";
	$getPoolIdQuery = "SELECT goal_id FROM pools ORDER BY time_created LIMIT 1";
	$index = 0;
	$countThree = 0;
	try {
		$countOne = $db->exec($insertGoalQuery);
    	$goalId = $db->lastInsertId('goal_id');
    	$insertPoolQuery = "INSERT INTO pools ('goal_id') VALUES ('".$goalId."')";
    	$countTwo = $db->exec($insertPoolQuery);
    	$poolId = $db->lastInsertId('pool_id');
    	$insertParticipantsQuery = "INSERT INTO participants ('pool_id', 'user_id') VALUES ('".$poolId."', '".$aFromUser."')";
    	$countThree = $db->exec($insertParticipantsQuery);
		foreach ($names as $row) {
    		$insertParticipantsQuery = "INSERT INTO participants ('pool_id', 'user_id') VALUES ('".$poolId."', '".$row."')";
 			$db->exec($insertParticipantsQuery);
 			$countThree++;
 			$index++;
 		}
 		if ($countOne != 1 || $countTwo != 1 || $countThree != count($names) + 1 ) {
 			echo json_encode(FALSE);
      		echo "Insert failed. Rolling back.";
	   		exit();
 		} else {
 			echo json_encode(TRUE);	
 		}
	} catch (PDOException $e) {
    	echo json_encode(FALSE);
    	echo $e;
	}
	
?>
