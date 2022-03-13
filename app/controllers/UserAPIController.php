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

        $response = json_decode(file_get_contents("php://input"));

        $login = !empty($response->LOGIN) ? trim($response->LOGIN) : "";
        $password = !empty($response->PASSWORD) ? trim($response->PASSWORD) : "";
        $user = new User();

        if(isset($response->SUBMIT) && $response->SUBMIT) {
            $userData = null;

            if($user->checkUserData(["login" => $login, "password" => $password])) {
                $dataPayload = [
                    "USER" => [
                        "ID" => $user->getUserID(),
                        "EMAIL" => $user->getUserEmail()
                    ],
                ];

                $token = new Token();

                $data["TOKEN"]["REFRESH"] = $token->processingRecord($user->getUserID(), $token->generateRefresh($dataPayload));
                $data["TOKEN"]["ACCESS"] = $token->generateAccess($dataPayload);

                $data["USER"]["EMAIL"] = $user->getUserEmail();
                $data["USER"]["ID"] = $user->getUserID();
                $data["RESULT"] = self::$authTextSuccess;

                setcookie("token", $data["TOKEN"]["REFRESH"], ["expires" => time()+60*60*24*30, "httponly" => true]);
            } else {
                // TODO: Убрать блок else
                $data["ERROR"] = "Неверный логин или пароль";
            }
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
            }
        }

        echo json_encode($data);
        return true;
    }
}