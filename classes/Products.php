<?php

class Product
{
    public $sku;
    public $name;
    public $price;
    public $type;

    public function __construct($sku, $name, $price,$type)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->type = $type;
    }
    

    // Setters
    public function setSKU($sku)
    {
        $this->sku = $sku;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }
    public function setType($type)
    {
        $this->type=$type;
    }

    // Getters
    public function getSKU()
    {
        return $this->sku;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getPrice()
    {
        return $this->price;
    }
    public function getType()
    {
        return $this->type;
    }

    public function saveToDatabase(PDO $conn)
    {
        $query="SELECT COUNT(*) as count FROM products WHERE sku =$this->sku";
        $stmt = $conn->query($query);
        $result= $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($result['count']==='0'){

        $stmt = $conn->prepare("INSERT INTO products (sku, name, price, type) VALUES (:sku, :name, :price, :type)");
        $stmt->bindValue(':sku', $this->getSKU());
        $stmt->bindValue(':name', $this->getName());
        $stmt->bindValue(':price', $this->getPrice());
        $stmt->bindValue(':type', get_class($this));
        $stmt->execute();
        return  true;
        }
        return false;
    }

    public function deleteFromDatabase(PDO $conn,$sku)
    {
        $stmt = $conn->prepare("DELETE FROM products WHERE sku = :sku");
        $stmt->bindValue(':sku', $sku);
        $stmt->execute();
    }
    public function  isAlreadyExist(PDO $conn)
    {
        $sku=$this->getSKU();
        $stmt = $conn->query("SELECT sku FROM products WHERE sku =$sku");
        $productData = $stmt->fetch(PDO::FETCH_ASSOC);
        if($productData)return true;
        return false;
    }
}
?>