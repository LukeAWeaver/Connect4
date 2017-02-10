<?php 

//=========== SET TIMEZONE =======================
date_default_timezone_set('America/Denver');

//=========== PHP ERROR REPORTING ================
error_reporting(E_ALL);
ini_set("display_errors", 1);


$file = file_get_contents("access.txt");
$myfile = fopen("access.txt", "w") or die("Unable to open file!");
fwrite($myfile, $file."\n".date("F j, Y, g:i a"));
fclose($myfile);

echo "<script>";
echo "gCodeChanged = true;".$_POST['code']."</script>";


?>