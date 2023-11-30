
<?php
$allowedMethods ="GET ,POST , DELETE";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: $allowedMethods");
header('Content-Type:application/json');


// Include your Product, Book, DVD, Furniture classes here
require 'classes/Products.php';
require 'classes/Book.php';
require 'classes/dvd.php';
require 'classes/Furniture.php';

// Database configuration
$dbHost = 'localhost';
$dbName = 'ecommerce';
$dbUser = 'root';
$dbPassword = '';

// Connect to the database using PDO
try {
    $conn = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
// Set the content type header to JSON

// Handle HTTP POST request to save a new product
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
   
    if (isset($data['type']) && isset($data['sku']) && isset($data['name']) && isset($data['price'])) {
        $type = $data['type'];
        $sku = $data['sku'];
        $name = $data['name'];
        $price = $data['price'];
         
        switch ($type) {
            case 'book':
                if (isset($data['weight'])) {
                    $weight = $data['weight'];
                    $product = new Book($sku, $name, $price,$type,$weight);
                    $product->saveToDatabase($conn);
                }
                break;
            case 'dvd':
                if (isset($data['size'])) {
                    $size= $data['size'];
                    $product = new DVD($sku, $name, $price,$type, $size);             
                    $product->saveToDatabase($conn);
                }
                break;
            case 'furniture':
                if (isset($data['height']) && isset($data['width']) && isset($data['length'])) {
                    $height = $data['height'];
                    $width = $data['width'];
                    $length = $data['length'];
                    $product = new Furniture($sku, $name, $price, $type,$length, $width, $height);
                    $product->saveToDatabase($conn);
                   
                }
                break;
            default:
                // Bad Request - Invalid product type
                http_response_code(400);
                echo json_encode(array('message' => 'Invalid product type provided.'));
                break;
        }
       
         echo json_encode(array('message' => 'Product created successfully.'));
    } elseif(isset($data['sku'])&&$data['sku']!=[]){
        $ids =$data['sku'];
        foreach($ids as $id){
            $stmt = $conn->prepare("DELETE FROM products WHERE sku = :sku");
                  $stmt->bindValue(':sku', $id);
                  $stmt->execute();  
        }
         echo json_encode(array('message' => 'Products deleted successfully.'));
        }
        elseif(!isset($data['sku'])){
        
            echo json_encode(array('message' => 'SKU not provided.'));
        }
        else {
        // Bad Request - Missing or invalid data
       
        echo json_encode(array('message' => 'Invalid data provided.'));
        }
}

// Handle HTTP GET request to fetch all products
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM products ORDER BY sku");
    $productsData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $products=array();
    foreach ($productsData as $productData) {
        if($productData['type']==='Book'){
            $product = new Book(
                $productData['sku'],
                $productData['name'],
                $productData['price'],
                $productData['type'],
                $productData['weight']
            );
        }
        elseif($productData['type']==='Furniture'){
            $product = new Furniture(
                $productData['sku'],
                $productData['name'],
                $productData['price'],
                $productData['type'],
                $productData['hight'],
                $productData['width'],
                $productData['length']
            );  
        }
        elseif($productData['type']==='DVD'){
            $product = new DVD(
                $productData['sku'],
                $productData['name'],
                $productData['price'],
                $productData['type'],
                $productData['size']
               
            );  
        }
      

     array_push($products,$product);
    }

    echo json_encode($products);
}





?>






