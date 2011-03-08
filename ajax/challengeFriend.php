<?php 

	include ('./connect.php');
  // some query to check if the friend is using CEL


// if (friend is using cel)
echo "" .
	'<form id="challenge-friend-form" name ="challengeFriend" action = "ajax/addChallenge.php" method = "post" onSubmit="return validateChallenge();">'.	
  'Challenge ' .$_GET['fname']. 'to quit <input type = "text" id = "challenge" name = "challenge" /><br />'.
	'Wager: $<input type = "text" name = "stake" /> <br />'.
	'<input type = "hidden" name = "from_user" value = "' . $_GET['from'] . '"/> <br />' .
  '<input type = "hidden" name = "to_user" value = "' . $_GET['to'] . '" /> <br/>' .
  '<input type = "submit" value = "Send"> <br/>' .
	'</form>';
// else 
//    instead of send, should publish a feed to ask the friend to join CEL and accept the challenge

?>
