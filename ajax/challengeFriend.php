	<form name ="challengeFreind" action = "addChallenge.php" method = "post">	
		Challenge <? echo $_GET['fname']; ?> to quit: <input type = "text" id = "challenge" onChange='checkChallenge()' name = "challenge" /><br />
		Wager: $<input type = "text" name = "stake" /> <br />
		<input type = 'hidden' name = 'from_user' value = '<? echo $_GET['from'] ?>'/> <br />
		<input type = "hidden" name = "to_user" value = '<? echo $_GET['to']; ?>' /> <br/>
		<input type = "submit" value = "Send"> <br/>
	</form>
