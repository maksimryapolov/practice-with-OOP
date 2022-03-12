<?php


namespace App\classes\Services;


use Firebase\JWT\JWT;

class Token
{
    private $signatureRefresh = "REFRESH_TOKEN_HS512";
    private $signatureAccess = "ACCESS_TOKEN_HS512";
    private $alg = 'HS512';

    public function generateAccess($data)
    {
        return $this->generateToken($data, $this->signatureAccess);
    }

    public function generateRefresh($data)
    {
        return $this->generateToken($data, $this->signatureRefresh);
    }

    private function getPayload($data)
    {
        /**
         * Полезна нагрузка — это любые данные, которые вы хотите передать в токене
         * если записать время time() + 3600 (1час)
         */
        $payload = array(
            "iss" => $_SERVER["SERVER_NAME"], // issuer определяет приложение, из которого отправляется токен.
            "iat" => time(), // (issued at) время создания токена
            "data" => array(
                "id" => $data["USER"]["ID"],
                "email" => $data["USER"]["EMAIL"]
            )
        );
        return $payload;
    }

    private function generateToken($data, $signature)
    {
        return JWT::encode(
            $this->getPayload($data),
            $signature,
            $this->alg
        );
    }

}