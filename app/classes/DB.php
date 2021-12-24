<?php

namespace App\Classes;


class DB
{

    /**
     * Настройки подключения
     * Лучше выносить в конфиг
     * self::DB_HOST -> Config::DB_HOST
     * @var string
     */
    const DB_HOST = '127.0.0.1'; // localhost
    const DB_USER = 'root';
    const DB_PASSWORD = '';
    const DB_NAME = 'finance_db';
    const CHARSET = 'utf8';
    const DB_PREFIX = '';

    /**
     * @var PDO
     */
    static private $db;

    /**
     * @var \PDO
     */
    private $pdo;

    /**
     * @var null
     */
    protected static $instance = null;

    /**
     * DB constructor.
     */
    public function __construct()
    {
        try {
            $this->pdo = new \PDO(
                "mysql:host=localhost; dbname=" . self::DB_NAME . ";charset=UTF8",
                self::DB_USER,
                self::DB_PASSWORD,
                $options = [
                    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                    \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES ".self::CHARSET
                ]
            );
        } catch (PDOException $e) {
            throw new Exception ($e->getMessage());
        }
    }

    /**
     * @return \PDO
     */
    public function getConnection()
    {
        return $this->pdo;
    }
}