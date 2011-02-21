<?php
	
	include ("./connect.php");
	
	$aUserId = $_POST["user_id"];
	$aNum = $_POST["num"];
	
	$query = "SELECT COUNT(resolution_id) AS numRes FROM completed_resolutions GROUP BY user_id";
	
	try {
		$result = $db->query($query);
		
		foreach($result as $row) {
			$achievement = $row["numRes"];
			echo json_encode($achievement);
		}
	} catch(PDOException $e) {
		echo $e;
	}
	
?>