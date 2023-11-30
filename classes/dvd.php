<?php

class DVD extends Product
{
    public $size;

    public function __construct($sku, $name, $price, $type,$size)
    {
        parent::__construct($sku, $name, $price,$type);
        $this->size = $size;
    }

    // Setters
    public function setSize($size)
    {
        $this->size = $size;
    }

    // Getters
    public function getSize()
    {
        return $this->size;
    }

    public function saveToDatabase(PDO $conn)
    {
        $stmt = $conn->prepare("INSERT INTO products (sku, name, price,type,size) VALUES (:sku, :name, :price, :type,:size)");
        $stmt->bindValue(':sku', $this->getSKU());
        $stmt->bindValue(':name', $this->getName());
        $stmt->bindValue(':price', $this->getPrice());
        $stmt->bindValue(':type', get_class($this));
        $stmt->bindValue(':size', $this->getSize());
        $stmt->execute();
    }
}
?>