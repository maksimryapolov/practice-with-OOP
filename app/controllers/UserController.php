<?php

namespace App\controllers;

use App\classes\Validate\VadlidateEmail;
use App\classes\Validate\ValidateLogin;
use App\classes\Validate\ValidatePassword;
use App\Models\User;

class UserController
{

    private static $authTextSuccess = "Вы успешно авторизовались!";

    /**
     * @return bool
     */
    private function checkAuthentication()
    {
        if(USER::isAuth()) {
            header("Location: /");
            exit();
        }
        return true;
    }

    public function ActionRegister()
    {
        $data = [
            "ERROR" => false,
            "RESULT" => false
        ];

        $this->checkAuthentication();

        if(isset($_POST["SUBMIT"]) && $_POST["SUBMIT"] && !USER::isAuth()) {

            $vLogin = new ValidateLogin($_POST["LOGIN"]);
            if(!$vLogin->check()) {
                $data["ERROR"]["LOGIN"] = $vLogin->getError();
            }

            $vEmail = new VadlidateEmail($_POST["EMAIL"]);
            if(!$vEmail->check()) {
                $data["ERROR"]["EMAIL"] = $vEmail->getError();
            }

            $vPass = new ValidatePassword($_POST["PASSWORD"]);
            if(!$vPass->check()) {
                $data["ERROR"]["PASSWORD"] = $vPass->getError();
            }

            if(!isset($data["ERROR"]["EMAIL"]) &&
                !$data["ERROR"]["EMAIL"] &&
                User::checkUserByEmail($_POST["EMAIL"])
            ) {
               $data["ERROR"]["EMAIL"] = User::checkUserByEmail($_POST["EMAIL"]);
            }

            if(empty($data["ERROR"]) && !$data["ERROR"]) {
                $user = new User;
                $data["RESULT"] = $user->create([
                    "name" => $_POST["LOGIN"],
                    "password" => $_POST["PASSWORD"],
                    "email" => $_POST["EMAIL"]
                ]);
            }
        }

        view('user/register', $data);
        return true;
    }

    public function ActionAuth()
    {
        $data = [
            "RESULT" => false,
            "ERROR" => false
        ];

        $login = !empty($_POST["LOGIN"]) ? trim($_POST["LOGIN"]) : "";
        $password = !empty($_POST["PASSWORD"]) ? trim($_POST["PASSWORD"]) : "";
        $user = new User();

        if(isset($_POST["SUBMIT"]) && $_POST["SUBMIT"]) {
            $userData = null;

            if($user->checkUserData(["login" => $login, "password" => $password])) {
                $_SESSION["USER_AUTH"] = $user->getUserID();
            } else {
                // TODO: Убрать блок else
                $data["ERROR"] = "Неверный логин или пароль";
            }
        }

        if(User::isAuth()) {
            $data["RESULT"] = self::$authTextSuccess;
        }

        view('user/auth', $data);
        return true;
    }

    public function ActionProfile()
    {
        $userId = User::getCurUserID();
        if(!empty($userId) && $userId) {
            $userData = null;
            $user = new User();
            $user->getUserById($userId);

            view("user/personal", [
                "name" => $user->getUserName(),
                "email" => $user->getUserEmail()
            ]);
            return true;
        }

        header("Location: user/auth");
    }


    public function ActionLogout()
    {
        if(User::isAuth()) {
            unset($_SESSION["USER_AUTH"]);
            header("Location: /");
            exit;
        }

        return true;
    }
}