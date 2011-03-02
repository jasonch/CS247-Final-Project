<?php
	include ('./connect.php');

  $challenge_id = $_POST['challenge_id'];
  $user_id = $_POST['user_id']; // just for sanity check
  
  $getChallenge = "SELECT from_user, to_user, stake FROM challenges WHERE challenge_id='$challenge_id'";
  try {
    $result = $db->query ($getChallenge);
    for ($result as $row) {
      $stake = $row['stake'];
      $to_user = $row['to_user'];
      break; // should be unique
    }
    if (empty ($user) || empty ($stake) || $user_id != $to_user) {
      echo "false";
      exit ();
    }

    $updateStake = "UPDATE OR ROLLBACK users SET points = (points - $stake)  WHERE user_id='$to_user'";
    $count = $db->exec ($updateStake);
    if ($count != 1)  {
      echo "false";
      exit ();
    }
    $updateStatus = "UPDATE challenges SET status = 2, time_started = CURRENT_TIMESTAMP WHERE challenge_id = '$challenge_id'";
    $count = $db->exec ($updateStatus);
    if ($count != 1) {
      echo "false";
      exit ();
    } 
 
    echo "true";
  } catch (PDOException $e) {
    echo "false";
    echo $e;
  }

?>
