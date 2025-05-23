<?php
header('Content-Type: application/json');

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'candy_database';

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection failed']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Example: insert a hardcoded product (id is auto-incremented, so use NULL or omit it)
    $sql = "INSERT INTO products (name, description, price, image_url) VALUES ('Sample Candy', 'A sweet sample candy.', 1.99, 'sample_candy.jpg')";
    if ($conn->query($sql) === TRUE) {
        echo '<h2>Product inserted with direct SQL.</h2>';
    } else {
        echo '<h2>Error: ' . $conn->error . '</h2>';
    }
    exit;
}

// Fetch all products
$sql = "SELECT * FROM products";
$result = $conn->query($sql);
$products = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}
echo json_encode($products);
$conn->close();
