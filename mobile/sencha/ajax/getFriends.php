<?php
  $id = $_GET['user_id'];
  if (empty($id))
    exit ();

  

  $output = new stdClass;
  $output->data = array();
  $output->data[0] = new stdClass;
  $output->data[0]->name = "name" . $id;
  $output->data[0]->id = $id;
  $output->data[0]->points = 0;
  echo json_encode($output);

?>
