<?php

namespace App\controllers;

use App\classes\Validate\VadlidateEmail;
use App\classes\Validate\ValidateLogin;
use App\classes\Validate\ValidatePassword;
use App\Models\User;

class UserController
{

    public function ActionRegister()
    {
        $data = [
            "ERROR" => false,
            "RESULT" => false
        ];

        if(isset($_POST["SUBMIT"]) && $_POST["SUBMIT"]) {

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

        if(isset($_POST["SUBMIT"]) && $_POST["SUBMIT"] && !isset($_SESSION["USER_AUTH"])) {
            $userData = null;

            if($user->checkUserData(["login" => $login, "password" => $password])) {
                $_SESSION["USER_AUTH"] = $user->getUserID();
            } else { // TODO: Убрать блок else
                $data["ERROR"] = "Неверный логин или пароль";
            }
        }

        if($user->isAuth()) {
            $data["RESULT"] = "Вы успешно авторизовались!";
        }

        view('user/auth', $data);
        return true;
    }
}