<?php
  include ('./connect.php');

  $disabled = "disabled";

  if (!empty($_GET['goal_id'])) {

  }

  $defaults = array ("quitting caffeine", "waking up on time", "going to the gym", "quitting chocolate");

  echo "<form id='join-goal-form' name='join-goal-form'>" .
    "Work on <input type='text' name='goal-text' value='". $defaults[array_rand($defaults)]. "'  $disabled />" .
    " for <input type='text' name='goal-days' value='3' size='1' $disabled /> days" .
    '<input type="hidden" name="pid" id="pool-id" value="' .$_GET['goal_id'] . '"/>' . 
    '<input type="hidden" name="sender" value="' . $_GET['user_id'] .'"/>'.
    "<input type='button' value='Confirm!' onClick='joinGoal();'/>";

?>
