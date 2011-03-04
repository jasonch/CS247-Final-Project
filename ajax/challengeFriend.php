<?php 

  include ("./functions.php");
	include ('./connect.php');
  // some query to check if the friend is using CEL
  $to_user = $_GET['to'];
  $from_user = $_GET['from'];
  $fname = $_GET['fname'];

  $target = getUser ($to_user);
  $target_exist = !empty ($target);


  // load friend info into javascript
  // happens only for friends you've clicked on for performance?
  echo "<script type='text/javascript'>" .
    "window.FRIENDS['".$to_user ."'].points = ".$target->points .";
     window.FRIENDS['".$to_user ."'].message ='".$target->message ."'</script>";
  echo '<form id="challenge-friend-form" name ="challengeFriend">'.	
  	'<input type = "hidden" name = "from_user" value = "' . $_GET['from'] . '"/> <br />' .
    '<input type = "hidden" name = "to_user" value = "' . $_GET['to'] . '" /> <br/>' .
    'Set a goal for ' .$_GET['fname']. ' to stop <input type = "text" id = "challenge" name = "challenge" onClick= "clearText(this);" value="drinking coffee"/> for 3 days<br />';
if ($target_exist) {
  echo	'wager $<input type = "text" name = "stake" value="(up to '. $target->points . ')" onClick="clearText(this);"/> <br />'.
    '<input type="button" value = "Send" onClick="return validateChallenge();"> <br/>' .
    '<input type="button" value = "Cancel" onClick="return clearLightbox();"> <br/>' ;
} else {
  echo	'wager $<input type = "text" name = "stake"/> <br />'.
    '<a href="#" onClick="inviteFriend (' .$to_user. ');">Invite on Facebook!</a>' ;
}
  echo '</form>' ;
?>
