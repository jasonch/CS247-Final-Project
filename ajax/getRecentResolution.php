<?php


  if (!empty ($_GET['user_id'])) {
    include ('./connect.php');
    $query = "SELECT resolution_id, resolution, num_days, time_stamp ". 
      " FROM user_resolutions LEFT JOIN resolutions ON user_resolutions.resolution_id = resolutions.resolution_id WHERE user_resolutions.user_id = '".$_GET['user_id']."'";

    if (!empty($_GET['num'])) $total = $_GET['num'];
    else $total = 100;

    $toReturn = array();
    foreach ($db->query ($query) as $row) {
      $res = new stdClass;
      $res->resolution_id = $row["resolution_id"];
      $res->resolution = $row["resolution"];
      $toReturn[] = $res;
    }
    echo json_encode($toReturn);
  }
  
?>
