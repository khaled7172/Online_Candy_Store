<?php
// config.php
// Database connection and other global settings

$host = 'sql103.infinityfree.com';
$username = 'if0_39038599';
$password = 'butWHYqui54op';
$database = 'if0_39038599_online_candyy';

try {
    $conn = new mysqli($host, $username, $password, $database);
    if ($conn->connect_error) {
        throw new Exception('Connection failed: ' . $conn->connect_error);
    }
} catch (Exception $e) {
    echo $e->getMessage();
    exit();
}
