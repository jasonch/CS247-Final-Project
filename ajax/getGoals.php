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
    $goal->status = "1";
  $dummy[] = $goal;
    $goal = new stdClass;
    $goal->goal_id = "3";
    $goal->goal = "Going to class on time";
    $goal->num_days = "7";
    $goal->num_following = "10";
    $goal->status = "1";
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
    
    $goalsQuery = "SELECT * FROM goals";	
	
	try {
		$goals = $db->query ($goalsQuery);
		$toReturn = array();
    	foreach ($goals as $row) {
    		$goal = new stdClass;
      		$goal->goal_id = $row['goal_id'];
      		$goal->goal = $row['goal'];
      		$goal->num_days = $row['num_days'];
      		$goal->num_following = $row['num_following'];
      		$goal->status = $row['status'];
      		$toReturn[] = $goal; 
    	}
   		echo json_encode((object) $toReturn);
   
   } catch (PDOException $e) {
   		echo json_encode (-1);
   		echo $e;
   	}
?>
