<?php

  $dummy = array();
    $goal = new stdClass;
    $goal->goal_id = "1";
    $goal->goal = "Going to the gym";
    $goal->num_days = "7";
    $goal->num_following = "3";
    $goal->status = "1";
  $dummy[] = $goal;
    $goal = new stdClass;
    $goal->goal_id = "2";
    $goal->goal = "Quit TV";
    $goal->num_days = "4";
    $goal->num_following = "2";
    $goal->participants = json_encode (array("Sean", "Darius"));
    $goal->status = "0";
  $dummy[] = $goal;
    $goal = new stdClass;
    $goal->goal_id = "3";
    $goal->goal = "Going to class on time";
    $goal->num_days = "7";
    $goal->num_following = "10";
    $goal->participants = json_encode (array("Jeff", "Sep", "Sean"));
    $goal->status = "0";
  $dummy[] = $goal;
    $goal = new stdClass;
    $goal->goal_id = "4";
    $goal->goal = "quit caffeine";
    $goal->num_days = "3";
    $goal->num_following = "3";
    $goal->status = "1";
  $dummy[] = $goal;



  echo json_encode ($dummy);
  exit ();



    


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
