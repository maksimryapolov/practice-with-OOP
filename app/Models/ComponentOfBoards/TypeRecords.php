<?php


namespace App\Models\ComponentOfBoards;


use App\Models\ComponentOfBoards\Base;

class TypeRecords extends Base
{
    /**
     * @var string
     */
    protected $tableName = 'types';

    public function getListIdRecords() :array
    {
        return parent::getListIdRecords();
    }

}