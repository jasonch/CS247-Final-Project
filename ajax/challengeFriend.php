<?php 

  include ("./functions.php");
	include ('./connect.php');
  // some query to check if the friend is using CEL
  $to_user = $_GET['to'];
  $from_user = $_GET['from'];
  $fname = $_GET['fname'];

  $target = getUser ($to_user);
  $target_exist = !empty ($target);


if ($target_exist) {
  // load friend info into javascript
  // happens only for friends you've clicked on for performance?
  echo "<script type='text/javascript'>" .
    "window.FRIENDS['".$to_user ."'].points = ".$target->points .";
     window.FRIENDS['".$to_user ."'].message ='".$target->message ."'</script>";
  echo '<form id="challenge-friend-form" name ="challengeFriend">'.	
    'Set a goal for ' .$_GET['fname']. ' to stop <input type = "text" id = "challenge" name = "challenge" /> for 3 days<br />'.
  	'bounty $<input type = "text" name = "stake" value="(up to '. $target->points . ')"/> <br />'.
  	'<input type = "hidden" name = "from_user" value = "' . $_GET['from'] . '"/> <br />' .
    '<input type = "hidden" name = "to_user" value = "' . $_GET['to'] . '" /> <br/>' .
    '<input type="button" value = "Send" onClick="return validateChallenge();"> <br/>' .
    '<input type="button" value = "Cancel" onClick="return clearLightbox();"> <br/>' .
  	'</form>' ;
} else {
  //echo "<div>" .$_GET['fname'] . " is not using C&Eacute;L yet!<br/>Send an invite on Facebook!</div>";
  echo '<form action="#" id="invite friend" method="post">';
  echo '<fb:friend-selector name="uid" prefill_id="' . $to_user .'"/>';
  echo '<input type="submit" value="Invite '. $_GET['fname'] . '" />';
  echo '</form>';
//    instead of send, should publish a feed to ask the friend to join CEL and accept the challenge
}
?>
