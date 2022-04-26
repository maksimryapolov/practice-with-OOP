<?php


namespace App\Models\ComponentOfBoards;


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
}