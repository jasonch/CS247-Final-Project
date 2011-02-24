<?php
	
	$friendName = $_GET["fname"];
	$fromUserId = $_GET["from"];
	$toUserId = $_GET["to"];
?>

	<form name ="challengeFreind" action = "addChallenge.php" method = "post">	
		Challenge <? echo $friendName; ?> to quit: <input type = "text" name = "challenge" /><br />
		Wager: <input type = "text" name = "stake" /> <br />
		<input type = "hidden" name = "from_user" value ="<? echo $fromUserID; ?>"/> <br />
		<input type = "hidden" name = "to_user" value = "<? echo $toUserID; ?>" /> <br/>
		<input type = "submit" value = "Send"> <br/>
	</form>