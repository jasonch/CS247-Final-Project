<?php
	include ('./connect.php');

  $challenge_id = $_POST['challenge_id'];
  $user_id = $_POST['user_id']; // just for sanity check
  
  $getChallenge = "SELECT from_user, to_user, stake FROM challenges WHERE challenge_id='$challenge_id'";
  try {
    //$db->beginTransaction ();

    $result = $db->query ($getChallenge);
    foreach ($result as $row) {
      $stake = $row['stake'];
      $to_user = $row['to_user'];
      break; // should be unique
    }
    if (empty ($stake) || $user_id != $to_user) {
      echo "false";
      exit ();
    }

    $updateStake = "UPDATE users SET points = (points - $stake)  WHERE user_id='$to_user'";
    $updateStatus = "UPDATE challenges SET status = 1, time_started = CURRENT_TIMESTAMP WHERE challenge_id = '$challenge_id'";

    $count = $db->exec ($updateStake);
    $count2 = $db->exec ($updateStatus);
    //$db->commit ();

    if ($count != 1 || $count2 != 1)  {
      echo "false";
      echo "count $count count2 $count2";
      //$db->rollBack ();
      exit ();
    }
    echo "true";
  } catch (PDOException $e) {
    //$db->rollBack();
    echo "false";
    echo $e;
  }

?>
