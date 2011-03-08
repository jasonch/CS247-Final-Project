<?php

	include ('./functions.php');
	include ('./connect.php');
	
	if (empty ($_POST['user_id'])) {
	   echo json_encode(-1);
	   exit();
	}
	
	$user_id = $_POST['user_id'];
  	$user = getUser ($user_id);

	echo json_encode($user);
	
?>
