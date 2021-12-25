<?php

namespace App\Models;

use App\Classes\DB;

class User
{
    private $userName;
    private $password;
    private $email;

    public function create($data)
    {
        $db = (new DB)->getConnection();
        $query = "INSERT INTO `users` (`username`, `password`, `email`) VALUES (:username, :password, :email)";

        $data["password"] = password_hash($data["password"], PASSWORD_BCRYPT);

        // для авторизации password_verify
        
        $st = $db->prepare($query);
        $st->bindParam(":username", $data["name"]);
        $st->bindParam(":password", $data["password"]);
        $st->bindParam(":email", $data["email"]);

        $result = $st->execute();

        return $result;
    }

    static public function checkUserByEmail($email)
    {
        if($email) {
            $key = "COUNT_EMAIL";

            $db = (new DB)->getConnection();
            $query = "SELECT COUNT(*) AS $key FROM `users` WHERE email=:email";

            $st = $db->prepare($query);
            $st->bindParam(":email", $email);
            $st->execute();
            $result = (int)$st->fetch()[$key];

            if($result > 0) {
                return "Пользователь с такой почтой уже существует";
            }

            return false;
        }
    }
}