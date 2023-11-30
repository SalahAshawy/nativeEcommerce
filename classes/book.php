<?php

class Book extends Product
{
    public $weight;

    public function __construct($sku, $name, $price, $type,$weight)
    {
        parent::__construct($sku, $name, $price,$type);
        $this->weight = $weight;
    }

    // Setters
    public function setWeight($weight)
    {
        $this->weight = $weight;
    }

    // Getters
    public function getWeight()
    {
        return $this->weight;
    }

    public function saveToDatabase(PDO $conn)
    {
        $stmt = $conn->prepare("INSERT INTO products (sku, name, price, type,weight) VALUES (:sku, :name, :price, :type,:weight)");
        $stmt->bindValue(':sku', $this->getSKU());
        $stmt->bindValue(':name', $this->getName());
        $stmt->bindValue(':price', $this->getPrice());
        $stmt->bindValue(':type', get_class($this));
        $stmt->bindValue(':weight', $this->getWeight());
        $stmt->execute();
    }
}
?>