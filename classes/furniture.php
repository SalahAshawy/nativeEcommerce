<?php

class Furniture extends Product
{
    public $height;
    public $width;
    public $length;

    public function __construct($sku, $name, $price, $type,$length,$width,$height)
    {
        parent::__construct($sku, $name, $price,$type);
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
    }

    // Setters
    public function setHeight($height)
    {
        $this->height = $height;
    }

    public function setWidth($width)
    {
        $this->width = $width;
    }

    public function setLength($length)
    {
        $this->length = $length;
    }

    // Getters
    public function getHeight()
    {
        return $this->height;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function getLength()
    {
        return $this->length;
    }

    public function saveToDatabase(PDO $conn)
    {
        $stmt = $conn->prepare("INSERT INTO products (sku, name, price, type,length,width,hight) VALUES (:sku, :name, :price, :type,:length,:width,:hight)");
        $stmt->bindValue(':sku', $this->getSKU());
        $stmt->bindValue(':name', $this->getName());
        $stmt->bindValue(':price', $this->getPrice());
        $stmt->bindValue(':type', get_class($this));
        $stmt->bindValue(':length', $this->getLength());
        $stmt->bindValue(':width', $this->getWidth());
        $stmt->bindValue(':hight', $this->getHeight());
        $stmt->execute();
    }
}
?>