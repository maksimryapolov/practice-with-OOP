<?php

namespace App\Models;

use App\Classes\DB;

class User
{
    private $userName;
    private $password;
    private $email;
    private $userID;

    /**
     * @param array $data
     * @return bool
     */
    public function create($data)
    {
        $db = (new DB)->getConnection();
        $query = "INSERT INTO `users` (`username`, `password`, `email`) VALUES (:username, :password, :email)";

        $data["password"] = password_hash($data["password"], PASSWORD_BCRYPT);

        $st = $db->prepare($query);
        $st->bindParam(":username", $data["name"]);
        $st->bindParam(":password", $data["password"]);
        $st->bindParam(":email", $data["email"]);

        $result = $st->execute();

        return $result;
    }


    /**
     * @param array $data
     * @return bool|mixed
     */
    public function checkUserData(array $data)
    {
        $db = (new DB)->getConnection();
        $query = "SELECT * FROM `users` WHERE email = :name OR username = :name";
        $st = $db->prepare($query);
        $st->bindParam(":name", $data['login']);

        $st->execute();
        $result = $st->fetch();

        if($result) {
            $this->setUserData($result);
            $result = password_verify($data["password"], $this->getUserPassword());
        }

        return $result;
    }

    /**
     * @return bool
     */
    public static function isAuth()
    {
        return isset($_SESSION["USER_AUTH"]) && !empty($_SESSION["USER_AUTH"]);
    }

    /**
     * @param string $email
     * @return bool|string
     */
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
                return "Другую почту, такая есть!";
            }

            return false;
        }
    }

    /**
     * @param array $data
     */
    private function setUserData($data)
    {
        $this->userID = $data["id"];
        $this->userName = $data["username"];
        $this->email = $data["email"];
        $this->password = $data["password"];
    }

    /**
     * @return string
     */
    public function getUserName()
    {
        return $this->userName;
    }

    /**
     * @return string
     */
    public function getUserEmail()
    {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getUserPassword()
    {
        return $this->password;
    }

    /*
     * @return number
     */
    public function getUserID()
    {
        return $this->userID;
    }

}