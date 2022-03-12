<?php


namespace App\controllers;


use App\Models\Token;
use App\Models\User;
use App\classes\Validate\VadlidateEmail;
use App\classes\Validate\ValidateLogin;
use App\classes\Validate\ValidatePassword;

header("Content-Type: application/json; charset=UTF-8");


class UserAPIController
{
    private static $authTextSuccess = "Вы успешно авторизовались!";

    public function ActionAuth()
    {

        $data = [
            "RESULT" => false,
            "ERROR" => false
        ];

        $tst = json_decode(file_get_contents("php://input"));

        $login = !empty($tst->LOGIN) ? trim($tst->LOGIN) : "";
        $password = !empty($tst->PASSWORD) ? trim($tst->PASSWORD) : "";
        $user = new User();

        if(isset($tst->SUBMIT) && $tst->SUBMIT) {
            $userData = null;

            if($user->checkUserData(["login" => $login, "password" => $password])) {
                $_SESSION["USER_AUTH"] = $user->getUserID();
            } else {
                // TODO: Убрать блок else
                $data["ERROR"] = "Неверный логин или пароль";
            }
        }

        if(User::isAuth()) {
            $data["USER"]["EMAIL"] = $user->getUserEmail();
            $data["USER"]["ID"] = $user->getUserID();
            $data["RESULT"] = self::$authTextSuccess;
            // $data["USER"]["TOKEN"] = $this->JWTencode($data["USER"], $user->getUserPassword());
            $token = new Token();
            echo '<pre>';
            var_dump($token->encode($data["USER"]));
            echo '</pre>';
        }

        echo json_encode($data);
        return true;
    }

    public function ActionRegister()
    {
        $data = [
            "ERROR" => false,
            "RESULT" => false
        ];

        // $this->checkAuthentication();
        $response = json_decode(file_get_contents("php://input"));

        if(isset($response->SUBMIT) && $response->SUBMIT && !USER::isAuth()) {

            $vLogin = new ValidateLogin($response->LOGIN);
            if(!$vLogin->check()) {
                $data["ERROR"]["LOGIN"] = $vLogin->getError();
            }

            $vEmail = new VadlidateEmail($response->EMAIL);
            if(!$vEmail->check()) {
                $data["ERROR"]["EMAIL"] = $vEmail->getError();
            }

            $vPass = new ValidatePassword($response->PASSWORD);
            if(!$vPass->check()) {
                $data["ERROR"]["PASSWORD"] = $vPass->getError();
            }

            if(!isset($data["ERROR"]["EMAIL"]) &&
                !$data["ERROR"]["EMAIL"] &&
                User::checkUserByEmail($response->EMAIL)
            ) {
                $data["ERROR"]["EMAIL"] = User::checkUserByEmail($response->EMAIL);
            }

            if(empty($data["ERROR"]) && !$data["ERROR"]) {
                $user = new User;
                $data["RESULT"] = $user->create([
                    "name" => $response->LOGIN,
                    "password" => $response->PASSWORD,
                    "email" => $response->EMAIL
                ]);

                $datePayload = [
                    "USER" => [
                        "ID" => $data["RESULT"]["id"],
                        "EMAIL" => $response->EMAIL
                    ],
                ];

                $token = new Token();
                $modelToken = new Token($token->generateRefresh($datePayload));
                $resTokenRefresh = $modelToken->save($data["RESULT"]["id"]);

                $data["RESULT"]["TOKEN"]["REFRESH"] = $resTokenRefresh["token"];
                $data["RESULT"]["TOKEN"]["ACCEESS"] = $token->generateAccess($datePayload);

                setcookie("token", $data["RESULT"]["TOKEN"]["REFRESH"], ["expires_or_options" => time()+60*60*24*30, "httponly" => true]);
            }
        }
        echo json_encode($data);
        return true;
    }
}