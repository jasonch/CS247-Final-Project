<?php

    include ('./connect.php');
    
    $user_id = $_POST['user_id'];
    $user_id = '536865381';
    $challengesSentQuery = "SELECT " .
      " from_user, to_user, challenge, num_days, stake, strftime, status ('%s', time_created) AS time_created ".
      " FROM challenges WHERE from_user = '".$user_id."'";
    $challengesRecievedQuery = "SELECT " .
      " from_user, to_user, challenge, num_days, stake, strftime, status ('%s', time_created) AS time_created ".
      " FROM challenges WHERE to_user = '".$user_id."'"; // TODO: MERGE into one query.	

	try {
		$challengesSent = $db->query ($challengesSentQuery);
		$challengesRecieved = $db->query ($challengesRecievedQuery);
		$toReturn = array();
		$sent = array();
		$received = array();
    	foreach ($challengesSent as $row) {
    		$challenge = new stdClass;
      		$challenge->from_user = $row["from_user"];
      		$challenge->to_user = $row["to_user"];
      		$challenge->challenge = $row["challenge"];
      		$challenge->num_days = $row["num_days"];
      		$challenge->stake = $row["stake"];
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
      		$challenge->stake = $row["stake"];
      		$challenge->timestamp = $row["time_created"];
      		$challenge->message = $row["status"];
      		$received[] = $challenge;
    	}
   		echo json_encode((object)array('sent'=>$sent, 'received' =>$received));
   	} catch (PDOException $e) {
   		echo $e;
   	}
?>
