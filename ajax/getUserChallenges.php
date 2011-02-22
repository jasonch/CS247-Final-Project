<?php

    include ('./connect.php');
    
    $user_id = $_GET['user_id'];
    $challengesSentQuery = "SELECT (*) FROM challenges WHERE from_id = '".$user_id."'";
    $challengesRecievedQuery = "SELECT (*) FROM challenges WHERE to_id = '".$user_id."'";

	try {
		$challengesSent = $db->query ($challengesSentQuery);
		$challengesRecieved = $db->query ($challengesRecievedQuery);
		$toReturn = array();
		$sent = array();
		$recieved = array();
    	foreach ($challengesSent as $row) {
    		$challenge = new stdClass;
      		$challenge->from_user = $row["from_user"];
      		$challenge->to_user = $row["to_user"];
      		$challenge->challenge = $row["challenge"];
      		$challenge->num_days = $row["num_days"];
      		$challenge->stake = $row["num_days"];
      		$challenge->timestamp = $row["time_created"];
      		$challenge->message = $row["status"];
      		$sent[] = $challenge; 
    	}
    	foreach ($challengesRecieved as $row) {
    		$challenge = new stdClass;
      		$challenge->from_user = $row["from_user"];
      		$challenge->to_user = $row["to_user"];
      		$challenge->challenge = $row["challenge"];
      		$challenge->num_days = $row["num_days"];
      		$challenge->stake = $row["num_days"];
      		$challenge->timestamp = $row["time_created"];
      		$challenge->message = $row["status"];
      		$received[] = $challenge;
    	}
   		echo json_encode({sent=>$sent, received =>$received});
   	} catch (PDOException $e) {
   		echo $e;
   	}
?>
