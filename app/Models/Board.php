<?php

namespace App\Models;

use App\Classes\DB;

class Board
{
    public function create(array $data)
    {
        $query = "INSERT INTO `records` (`created`, `deposit_amount`, `user_id`, `category_id`, `account_id`, `type_id`, `create_time`) VALUES (:created, :amount, :userId, :category, :account, :type, :time)";

        $db = (new DB())->getConnection();
        $st = $db->prepare($query);
        $st->bindParam(":created", $data["date"]);
        $st->bindParam(":amount", $data["amount"]);
        $st->bindParam(":userId", $data["user"]);
        $st->bindParam(":account", $data["account"]);
        $st->bindParam(":category", $data["category"]);
        $st->bindParam(":type", $data["type"]);
        $st->bindParam(":time", $data["time"]);

        if($st->execute()) {
            return $db->lastInsertId();
        }

        return 0;
    }

    public function get($date, $type): array
    {
        $data = [];
        $result = [];
        $fullSum = 0;

        $query = "
            SELECT *,
                   (SELECT `name` FROM types WHERE id=:type_id) as type_name,
                   (SELECT `name` FROM categories WHERE id=records.category_id) as category_name,
                   (SELECT `name` FROM accounts WHERE id=records.account_id) as account_name
            FROM `records` 
            WHERE YEAR(`created`)=:year AND MONTH(`created`)=:month AND `type_id`=:type_id
            ORDER BY  created DESC"
        ;

        $db = (new DB())->getConnection();
        $st = $db->prepare($query);
        $st->bindParam(':year', $date['year']);
        $st->bindParam(':month', $date['month']);
        $st->bindParam(':type_id', $type);

        if($st->execute()) {
            while ($res = $st->fetch()) {
                $isAdd = true;
                $sum = 0;

                foreach ($data as $key => $item) {
                    if($item['date'] === $res['created']) {
                        $data[$key]['items'][] = $res;
                        $data[$key]['sum'] += $res['deposit_amount'];
                        $isAdd = false;
                    }
                }

                if($isAdd) {
                    $data[] = array(
                        "date" => $res['created'],
                        "items" => [$res],
                        "sum" => (int)$res['deposit_amount']
                    );
                }

                $fullSum += $res['deposit_amount'];
            }

            $result['elements'] = $data;
            $result['total'] = $fullSum;

            return $result;
        }

        return [];
    }
}