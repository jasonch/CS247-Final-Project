<<<<<<< HEAD:ajax/connect.php
<?php
  
  $dbname = "cel.sqlite";
=======
<?php #creates a handle to your database.
  
  $dbname = "cel.sqlite";
  
>>>>>>> 2d0c781cc0efbf144565a6477d94973a21c8df3e:ajax/connect.php
  try {
    $db = new PDO("sqlite:" . $dbname);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch (PDOException $e) {
    "SQLite connection failed: " . $e->getMessage();
    exit();
  }
<<<<<<< HEAD:ajax/connect.php
  
?>
=======
?>
>>>>>>> 2d0c781cc0efbf144565a6477d94973a21c8df3e:ajax/connect.php
