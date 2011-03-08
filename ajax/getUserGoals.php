<?php

    include ('./connect.php');
    
    if (empty ($_POST['user_id'])) {
	   echo json_encode(-1);
	   exit();
	}
    
    $aUserId = $_POST['user_id'];
    
    $userGoalsQuery = "SELECT * FROM goals join
    										(SELECT pools.pool_id AS pool_id, pools.status AS pool_status, participants.status AS user_status
    										FROM participants ON pools.pool_id = participants.pool_id
    										WHERE participants.user_id = '".$aUserId."')";
	try {
		$userGoals = $db->query ($userGoalsQuery);
		$toReturn = array();
    	foreach ($userGoals as $row) {
    		$userGoal = new stdClass;
      		$userGoal->goal_id = $row['goal_id'];
      		$userGoal->goal = $row['goal'];
      		$userGoal->num_days = $row['num_days'];
      		$userGoal->pool_id = $row['pool_id'];
      		$userGoal->pool_status = $row['pool_status'];
      		$userGoal->user_status = $row['participants_status'];
      		$toReturn[] = $userGoal; 
    	}
   	echo json_encode((object) $toReturn);
   	} catch (PDOException $e) {
   		echo json_encode(-1);
   		echo $e;
   	}
?>
