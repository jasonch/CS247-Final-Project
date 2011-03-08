<?php
  include ("./functions.php");
	include ("./connect.php");

  $user_id = $_GET['user_id'];
  if (empty ($user_id)) {
    echo "false";
    exit ();
  }

  $query = "SELECT friend_id, message, status, points FROM friends LEFT JOIN users ON users.user_id = friends.friend_id OR users.user_id = friends.user_id WHERE friends.user_id='$user_id' OR friends.friend_id='$user_id'";
  try {
    $result = $db->query ($query);
    $friends = array ();
    foreach ($result as $f) {
      $friends[$f["friend_id"]] = new stdClass;
      $friends[$f["friend_id"]]->message = $f["message"];
      $friends[$f["friend_id"]]->status = $f["status"];
      $friends[$f["friend_id"]]->points = $f["points"];
      $friends[$f["friend_id"]]->id = $f["friend_id"];
    }
    echo json_encode ((Object)$friends);
  } catch (PDOException $e) {
    echo $e;
  }

?>
