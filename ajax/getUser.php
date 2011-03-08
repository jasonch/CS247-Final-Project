<?php
  include ("./functions.php");
	include ("./connect.php");
	$user_id = $_POST['user_id'];
  $user = getUser ($user_id);

	echo json_encode($user);
	
?>
