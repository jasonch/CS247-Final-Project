<?php

	include ('./connect.php');

	if (empty ($_POST['user_id']) || empty ($_POST['pool_id'])) {	   
		echo json_encode(-1);
	   exit();
	}

	$aUser = $_POST['user_id'];
	$aPool = $_POST['pool_id'];

	$joinPoolQuery = "INSERT INTO participants ('pool_id', 'user_id') VALUES ('".$aPool."', '".$aUser."')";
	$updateNumFollowersQuery = "UPDATE goals SET num_followers = num_followers + 1 WHERE goal_id = 
								(SELECT goal_id FROM pools WHERE pool_id = '".$pool_id."')";
	

	try {
    	$db->beginTransaction();
    	
    	$countOne = $db->exec($joinPoolQuery);
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