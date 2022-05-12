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

    public function create($name, $typeId = 0)
    {
        $typeId = (int)$typeId;

        if($typeId && $name) {
            $query = "INSERT INTO {$this->tableName}(`name`, `type_id`) VALUES (:name, :type_id)";
            $db = (new DB())->getConnection();

            $st = $db->prepare($query);
            $st->bindParam(":name", $name);
            $st->bindParam(":type_id", $typeId);
            $st->execute();
            return $db->lastInsertId();
        }
        return 0;
    }
}