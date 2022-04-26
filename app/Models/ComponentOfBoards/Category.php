<?php


namespace App\Models\ComponentOfBoards;


use App\Classes\DB;

class Category extends Base
{
    /**
     * @var string
     */
    protected $tableName = 'categories';

    public function getListIdRecords() :array
    {
        return parent::getListIdRecords();
    }

/*    public function create($name)
    {
        $query = "INSERT INTO {$this->tableName}(`name`) VALUES (:name)";
        $db = (new DB())->getConnection();

        $st = $db->prepare($query);
        $st->bindParam(":name", $name);
        $st->execute();
        return $db->lastInsertId();
    }*/
}