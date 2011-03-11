<?php


	include ('./connect.php');

	$user_id = $_POST["user_id"];
	$status =  $db->quote($_POST["status"]);
	$updateQuery = "UPDATE users SET `status` =" . $status . " WHERE `user_id` = '" . $user_id . "'";
	try {
		$count = $db->exec($updateQuery);	
    if ($count != 0)
      echo "true";
    else
      echo "false";
	} catch (PDOException $e) {
    echo "false";
		echo $e;
	}
	
?>
