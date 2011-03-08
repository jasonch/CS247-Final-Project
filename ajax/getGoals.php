<?php

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