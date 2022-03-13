<?php


namespace App\Models;


use App\Classes\DB;
use Firebase\JWT\JWT;

class Token
{
    private $alg = 'HS512';
    private $signatureRefresh = "REFRESH_TOKEN_HS512";
    private $signatureAccess = "ACCESS_TOKEN_HS512";

    /**
     * @param int $userID
     * @param string $token
     * @return string
     */
    public function save(int $userID, string $token) :string
    {
        $userID = (int)$userID;
        $result = "";
        $db = (new DB)->getConnection();

        $query = "INSERT INTO `tokens` (`user_id`, `refresh`) VALUES (:user_id, :refresh)";

        $st = $db->prepare($query);
        $st->bindParam(":user_id", $userID);
        $st->bindParam(":refresh", $token);

        if($st->execute()) {
            $result = $token;
        }

        return $result;
    }
    /**
     * @param int $userID
     * @param string $token
     * @return string
     */
    public function update(int $userID, string $token) :string
    {
        $userID = (int)$userID;
        $result = "";
        $db = (new DB)->getConnection();

        $query = "UPDATE tokens SET tokens.refresh = :refresh WHERE user_id=:user_id";

        $st = $db->prepare($query);
        $st->bindParam(":user_id", $userID);
        $st->bindParam(":refresh", $token);

        if($st->execute()) {
            $result = $token;
        }

        return $result;
    }

    /**
     * Метод определяет обновить токен у текущего
     * пользователя или добавить новый
     *
     * @param int $userID
     * @param string $token
     * @return string
     */
    public function processingRecord(int $userID, string $token) :string
    {
        if($this->checkTokenByUserId($userID)) {
           return $this->update($userID, $token);
        }

        return $this->save($userID, $token);
    }

    /**
     * @param int $userId
     * @return bool
     */
    public function checkTokenByUserId(int $userId) :int
    {
        $db = (new DB())->getConnection();

        $query = "SELECT COUNT(*) as `COUNT` FROM `tokens` WHERE user_id=:user_id";
        $st = $db->prepare($query);

        $st->bindParam(":user_id", $userId);
        $st->execute();
        $result = $st->fetch();

        return (int)$result['COUNT'] !== 0;
    }

    /**
     * @param array $data
     * @return string
     */
    public function generateAccess(array $data) :string
    {
        return $this->generateToken($data, $this->signatureAccess);
    }

    /**
     * @param array $data
     * @return string
     */
    public function generateRefresh(array $data) :string
    {
        return $this->generateToken($data, $this->signatureRefresh);
    }

    /**
     * @param array $data
     * @return array
     */
    private function getPayload(array $data) :array
    {
        /**
         * Полезна нагрузка — это любые данные, которые вы хотите передать в токене
         * если записать время time() + 3600 (1час) time()+60*60*24*30
         */
        return array(
            "iss" => $_SERVER["SERVER_NAME"], // issuer определяет приложение, из которого отправляется токен.
            "iat" => time(), // (issued at) время создания токена
            "exp" => time()+60*60*24*30,
            "data" => array(
                "id" => $data["USER"]["ID"],
                "email" => $data["USER"]["EMAIL"]
            )
        );
    }

    /**
     * @param array $data
     * @param string $signature
     * @return string
     */
    private function generateToken(array $data, string $signature) :string
    {
        return JWT::encode(
            $this->getPayload($data),
            $signature,
            $this->alg
        );
    }
}