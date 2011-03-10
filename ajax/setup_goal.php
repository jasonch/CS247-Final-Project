<?php
  include ('./connect.php');

  $disabled = empty($_GET['goal_id'])? "": "disabled";

  if (!empty($_GET['goal_id'])) {

  }

  $defaults = array ("quitting caffeine", "waking up on time", "going to the gym", "quitting chocolate");

  echo "<form id='setup-goal-form' name='setup-goal-form'>" .
    "Work on <input type='text' name='goal-text' value='". $defaults[array_rand($defaults)]. "' onClick='clearText(this);' $disabled />" .
    " for <input type='text' name='goal-days' value='3' size='1' onClick='clearText(this);' $disabled /> days" .
    ' with <div id="goal-participants-box"><input type="text" name="goal-participants" id="goal-participants" onKeyUp="autocomplete(\'friend-select\', friendFilter, \'goal-participants-box\');" /></div>' .
    '<input type="hidden" name="recipients" id="goal-recipients" />' . 
    '<input type="hidden" name="pid" id="pool-id" value="' .$_GET['goal_id'] . '"/>' . 
    '<input type="hidden" name="sender" value="' . $_GET['user_id'] .'"/>'.
    '<br/><input type="checkbox" name="private" id="goal-private" /><label for="goal-private">Private</label>' . 
    "<input type='button' value='Send!' onClick='setupGoal();'/>";

?>
