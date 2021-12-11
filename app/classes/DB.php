<?php

namespace App\Classes;


class DB
{
    /**
     * @var string
     */
    private $login = "root";

    /**
     * @var string
     */
    private $dbName = "finance_db";

    /**
     * @var string
     */
    private $password = "";

    /**
     * @var \PDO
     */
    private $pdo;

    /**
     * DB constructor.
     */
    public function __construct()
    {
        $this->pdo = new \PDO("mysql:host=localhost; dbname={$this->dbName}; charset=UTF8", $this->login, $this->password);
    }

    /**
     * @return \PDO
     */
    public function getConnection()
    {
        return $this->pdo;
    }
}