<?php
  include ('./connect.php');

  $disabled = empty($_GET['goal_id'])? "": "disabled";


  echo "<form id='setup-goal-form' name='setup-goal-form'>" .
    "Work on <input type='text' name='goal-text' value='quitting caffeine' onClick='clearText(this);' $disabled />" .
    " for <input type='text' name='goal-days' value='3' size='1' onClick='clearText(this);' $disabled /> days" .
    ' with <div id="goal-participants-box"><input type="text" name="goal-participants" id="goal-participants" onKeyUp="autocomplete(\'friend-select\', friendFilter, \'goal-participants-box\');" /></div>' .
    '<input type="hidden" name="recipients" id="goal-recipients" />' . 
    '<input type="hidden" name="sender" value="' . $_GET['user_id'] .'"/>'.
    "<br/><input type='button' value='Send!'/>";

?>
