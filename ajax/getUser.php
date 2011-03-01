<?php
  include ("./functions.php");
	include ("./connect.php");
	$user_id = $_POST['user_id'];
  $user_id = "624420020";
  $user = getUser ($user_id);

	echo json_encode($user);
	
?>
