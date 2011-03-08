<?php

	include ('./connect.php');

	if (empty ($_POST['user_id']) || empty ($_POST['goal_id'])
		|| empty($_POST['result'])) {	   
		echo json_encode(FALSE);
	   exit();
	}

	$aUser = $_POST['user_id'];
	$aGoal = $_POST['pool_id'];
	$aResult = $_POST['result'];
	
	$status = 0;

	if ($aResult = "true") {
		$status = 1; 
	}
	
	$updateStatusQuery = "UPDATE participants SET 'status = '".$status."' WHERE user_id = '".$aUser."'";
	$updateNumFollowersQuery = "UPDATE goals SET num_followers = num_followers - 1 WHERE goal_id = '".$aGoal."'";
	

	try {
    	$db->beginTransaction();
    	
    	$countOne = $db->exec($updateStatusQuery);
    	$countTwo = $db->exec($updateNumFollowersQuery);
    	if (countOne != 1 || countTwo != 1) {
    		$db->rollback();
    		echo json_encode(FALSE);
    	} else {
    		echo json_encode(TRUE);
    	}
	} catch (PDOException $e) {
    	$db->rollBack();
    	echo json_encode(FALSE);
    	echo $e;
	}
	
?>