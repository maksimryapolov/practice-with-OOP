<?php

namespace App\Models;

use App\Classes\DB;

class Board
{
    public function create(array $data)
    {
        $query = "INSERT INTO `records` (`created`, `deposit_amount`, `user_id`, `category_id`, `account_id`, type_id) VALUES (CURRENT_TIME(), 120.22, 28, 1, 1, 1)";

        $db = (new DB())->getConnection();
        $st = $db->prepare($query);

        // $st->bindParam();
        return $st->execute();


    }
}