<?php


namespace App\Models;


use App\Classes\DB;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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
     * @param string $token
     * @return bool
     */
    public function delete(string $token) :bool
    {
        $db = (new DB)->getConnection();

        $query = "DELETE FROM tokens WHERE refresh=:refresh";

        $st = $db->prepare($query);
        $st->bindParam(":refresh", $token);

        return $st->execute();
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
     * @param string $access
     * @return array
     */
    public function verifyAccess(string $access) :array
    {
        $result = [];
        $key = new Key($this->signatureAccess, $this->alg);

        try {
            $decodedData = JWT::decode($access, $key);
            $result["status"] = "success";
            $result["data"] = $decodedData->data;
        } catch (\Exception $exception) {
            $result["status"] = "fail";
            $result["message"] = $exception->getMessage();
        }

        return $result;
    }

    public function verifyRefresh(string $refresh)
    {
        /**
         * $decodedData->iat - Дата создание токена
         * $decodedData->exp - Дата срока токена
         */
        $key = new Key($this->signatureRefresh, $this->alg);
        $decodedData = JWT::decode($refresh, $key);
        $userId = (int)$decodedData->data->id;

        $dateExpirationToken = $decodedData->exp;

        if($dateExpirationToken < time()) { // decode сам валидирует
            return [];
        }

        $db = (new DB())->getConnection();
        $query = "SELECT `refresh` FROM `tokens` WHERE user_id=:user_id";

        $st = $db->prepare($query);
        $st->bindParam("user_id", $userId);

        $st->execute();
        $tokenFromDb = $st->fetch();

        if($refresh === $tokenFromDb["refresh"]) {
            return $decodedData->data;
        }

        return [];
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
        if(empty($data["exp"])) {
            $data["exp"] = time()+60*15;
        }
        return $this->generateToken($data, $this->signatureAccess);
    }

    /**
     * @param array $data
     * @return string
     */
    public function generateRefresh(array $data) :string
    {
        if(empty($data["exp"])) {
            $data["exp"] = time()+60*60*24*30;
        }
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
            "exp" => $data["exp"],
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