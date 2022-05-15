<?php

namespace App\Models;

use App\Classes\DB;

class Board
{
    public function create(array $data)
    {
        $query = "INSERT INTO `records` (`created`, `deposit_amount`, `user_id`, `category_id`, `account_id`, `type_id`) VALUES (:created, :amount, :userId, :category, :account, :type)";

        $db = (new DB())->getConnection();
        $st = $db->prepare($query);
        $st->bindParam(":created", $data["date"]);
        $st->bindParam(":amount", $data["amount"]);
        $st->bindParam(":userId", $data["user"]);
        $st->bindParam(":account", $data["account"]);
        $st->bindParam(":category", $data["category"]);
        $st->bindParam(":type", $data["type"]);

        if($st->execute()) {
            return $db->lastInsertId();
        }

        return 0;
    }
}