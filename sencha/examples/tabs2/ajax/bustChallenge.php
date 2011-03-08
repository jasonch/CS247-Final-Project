<?php
	include ('./connect.php');

  $challenge_id = $_POST['challenge_id'];
  $user_id = $_POST['user_id']; // just for sanity check
  
  $getChallenge = "SELECT from_user, to_user, stake FROM challenges WHERE challenge_id='$challenge_id'";
  try {
    $result = $db->query ($getChallenge);
    foreach ($result as $row) {
      $stake = $row['stake'];
      $from_user = $row['from_user'];
      break; // should be unique
    }
    if (empty ($from_user) || empty ($stake) || $user_id != $from_user) {
      echo "false"; // something wrong with params passed in
      exit ();
    }

    $updateStake = "UPDATE users SET points = (points + $stake)  WHERE user_id='$from_user'";
    $updateStatus = "UPDATE challenges SET status = 3, time_ended = CURRENT_TIMESTAMP WHERE challenge_id = '$challenge_id'";

    //$db->beginTransaction ();
    $count = $db->exec ($updateStake);
    $count2 = $db->exec ($updateStatus);
    //$db->commit ();

    if ($count != 1 || $count2 != 1)  {
      //$db->rollBack ();
      echo "false\n";
      echo "count $count count2 $count2\n";
      exit ();
    }

    echo "true";

  } catch (PDOException $e) {
    //$db->rollBack ();
    echo "false";
    echo $e;
  }

?>
