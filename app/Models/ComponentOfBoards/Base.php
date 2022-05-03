<?php


namespace App\Models\ComponentOfBoards;


use App\Classes\DB;

class Base
{

    /**
     * @var string
     */
    protected $tableName;

/*    public function __construct($tableName="")
    {
        $this->tableName = $tableName;
    }*/


    /**
     * @return array
     */
    public function getListIdRecords() :array
    {
        $query = "SELECT * FROM {$this->tableName}";
        $result = [];
        $db = (new DB)->getConnection();
        $st = $db->query($query);
        $st->execute();

        while($data = $st->fetch()) {
            $result[] = $data;
        }

        return $result;
    }

    public function create($name)
    {
        $query = "INSERT INTO {$this->tableName}(`name`) VALUES (:name)";
        $db = (new DB())->getConnection();

        $st = $db->prepare($query);
        $st->bindParam(":name", $name);
        $st->execute();
        return $db->lastInsertId();
    }

    public function update($name, $id)
    {
        $query = "UPDATE {$this->tableName} SET `name`=:name WHERE `id`=:id";
        $db = (new DB())->getConnection();

        $st = $db->prepare($query);
        $st->bindParam(":name", $name);
        $st->bindParam(":id", $id);
        if($st->execute()) {
            return $id;
        }
        return 0;
    }

}