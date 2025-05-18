<?php
// Database connection settings
$host = 'localhost';
$username = 'root';
$password = ''; // Default for WAMP
$database = 'candy_database';

// Create a connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch products from the database
$sql = "SELECT id, name, description, price, image_url FROM products";
$result = $conn->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

// Return products as JSON
header('Content-Type: application/json');
echo json_encode($products);

// Close the connection
$conn->close();
?>
