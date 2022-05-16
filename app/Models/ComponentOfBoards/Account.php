<?php


namespace App\Models\ComponentOfBoards;


use App\Classes\DB;

class Account extends Base
{
    /**
     * @var string
     */
    protected $tableName = 'accounts';

    public function getListIdRecords() :array
    {
        return parent::getListIdRecords();
    }

    public function getAccounts(): array
    {
        $data = [];
        $query = "SELECT * FROM types";
        $db = (new DB())->getConnection();

        $st = $db->prepare($query);

        if($st->execute()) {
            while($res = $st->fetch()) {
                $data[] = $res;
            }
        }

        return $data;
    }
}