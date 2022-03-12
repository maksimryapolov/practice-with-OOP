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
        echo '<pre>';
        var_dump($_POST);
        echo '</pre>';
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

    public function ActionDelete()
    {
        if(User::isAuth()) {
            $user = new User;
            $userID = User::getCurUserID();
            $user->deleteById($userID);
            unset($_SESSION["USER_AUTH"]);
            header("Location: /");
        }
        die("Пользователь не найден");
    }

    public function ActionProfile()
    {
        $userId = User::getCurUserID();
        if(!empty($userId) && $userId) {
            $userData = null;
            $user = new User();
            $user->getUserById($userId);
            $params = [
                "name" => $user->getUserName(),
                "email" => $user->getUserEmail(),
            ];

            if(isset($_POST["SUBMIT"]) && $_POST["SUBMIT"]) {
                $data = [
                    "RESULT" => false,
                    "ERROR" => false
                ];

                $vEmail = new VadlidateEmail($_POST["EMAIL"]);
                if(!$vEmail->check()) {
                    $data["ERROR"]["EMAIL"] = $vEmail->getError();
                }

                if($_POST["PASSWORD"] !== $_POST["CONFIRM_PASSWORD"]) {
                    $data["ERROR"]["CONFIRM_PASSWORD"] = "Ошибка подтверждения пароля";
                }

                if(!isset($data["ERROR"]["EMAIL"]) &&
                    !$data["ERROR"]["EMAIL"] &&
                    User::checkUserByEmail($_POST["EMAIL"])
                ) {
                    $data["ERROR"]["EMAIL"] = User::checkUserByEmail($_POST["EMAIL"]);
                }

                if(empty($data["ERROR"]) && !$data["ERROR"]) {
                    $data["RESULT"] = $user->update([
                        "id" => $userId,
                        "password" => $_POST["PASSWORD"],
                        "email" => $_POST["EMAIL"]
                    ]);
                }

                $params["RESULT"] = $data["RESULT"];
                $params["ERROR"] = $data["ERROR"];
            }

            view("user/personal", $params);
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