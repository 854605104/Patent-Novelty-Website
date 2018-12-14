<?php
session_start();

if ( $_SERVER['REQUEST_METHOD']=='GET' && realpath(__FILE__) == realpath( $_SERVER['SCRIPT_FILENAME'] ) ) {
        /* 
           Up to you which header to send, some prefer 404 even if 
           the files does exist for security
        */
        header( 'HTTP/1.0 403 Forbidden', TRUE, 403 );

        /* choose the appropriate page to redirect users */
        die( header( 'location: /error.php' ) );

}

$servername = "127.0.0.1";
$username = "root";
$password = "Ab123456";
$dbname = "ideation_db";

$conn = mysqli_connect($servername, $username, $password, $dbname);

$email = $_POST['email'];
$feedback = $_POST['feedback'];

$sql_insert = "INSERT INTO central_extreme_matrix (email, feedback) VALUES('$email', '$feedback')";
mysqli_query($conn, $sql_insert);
mysqli_close($conn);

echo $email . '; ' . $feedback;

?>