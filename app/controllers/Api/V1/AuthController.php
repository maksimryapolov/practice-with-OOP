<?php


namespace App\controllers\Api\V1;


use App\Models\Token;
use App\Models\User;
use App\classes\Validate\VadlidateEmail;
use App\classes\Validate\ValidateLogin;
use App\classes\Validate\ValidatePassword;
use Slim\Http\Request;
use Slim\Http\Response;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\FirePHPHandler;

class AuthController extends BaseController
{
    private static $authTextSuccess = "Вы успешно авторизовались!";

    public function signIn(Request $request, Response $response)
    {
        $keyToken = $this->getTokenKeyName();

        $data = [
            "RESULT" => false,
            "ERROR" => false
        ];

        ['LOGIN' => $login, 'PASSWORD' => $pass, "SUBMIT" => $submit] = $request->getParams();

        $login = !empty($login) ? trim($login) : "";
        $password = !empty($pass) ? trim($pass) : "";
        $user = new User();

        if(isset($submit) && $submit) {
            $userData = null;

            if($user->checkUserData(["login" => $login, "password" => $password])) {
                $dataPayload = [
                    "USER" => [
                        "ID" => $user->getUserID(),
                        "EMAIL" => $user->getUserEmail(),
                    ],
                ];

                $token = new Token();

                $data["TOKEN"]["REFRESH"] = $token->processingRecord($user->getUserID(), $token->generateRefresh($dataPayload));
                $data["TOKEN"]["ACCESS"] = $token->generateAccess($dataPayload);

                $data["user"]["email"] = $user->getUserEmail();
                $data["user"]["ID"] = $user->getUserID();
                $data["user"]["username"] = $user->getUserName();
                $data["RESULT"] = self::$authTextSuccess;

                setcookie(
                    $keyToken,
                    $data["TOKEN"]["REFRESH"],
                    time()+60*60*24*30,
                    "/",
                     "",
                    false,
                    true
                );

                return $response->withJson($data, 200);
            }

            return $response->withJson(["error" => ["status" => "fail", "code" => 3, "message" => ["Неверный логин или пароль"]]], 401);
        }

        return $response->withJson($data, 401);
    }

    public function signUp(Request $request, Response $response)
    {
        $data = [
            "ERROR" => false,
            "RESULT" => false
        ];

        ['LOGIN' => $login, 'PASSWORD' => $pass, "EMAIL" => $email, "SUBMIT" => $submit] = $request->getParams();


        if(isset($submit) && $submit && !USER::isAuth()) {
            $vLogin = new ValidateLogin($login);
            if(!$vLogin->check()) {
                $data["ERROR"]["STATUS"] = true;
                $data["ERROR"]["MESSAGES"][] = $vLogin->getError();
            }

            $vEmail = new VadlidateEmail($email);
            if(!$vEmail->check()) {
                $data["ERROR"]["STATUS"] = true;
                $data["ERROR"]["MESSAGES"][] = $vEmail->getError();
            }

            $vPass = new ValidatePassword($pass);
            if(!$vPass->check()) {
                $data["ERROR"]["STATUS"] = true;
                $data["ERROR"]["MESSAGES"][] = $vPass->getError();
            }

            if(!isset($data["ERROR"]["LOGIN"]) && User::checkUserByEmail($login)) {
                $data["ERROR"]["AUTH"] = User::checkUserByEmail($login);

                if($data["ERROR"]["AUTH"]) {
                    $data["ERROR"]["IS_EXISTS_LOGIN"] = true;
                }
            }

            if(!isset($data["ERROR"]["EMAIL"]) && User::checkUserByEmail($email)) {
                $data["ERROR"]["AUTH"] = User::checkUserByEmail($email);

                if($data["ERROR"]["AUTH"]) {
                    $data["ERROR"]["IS_EXISTS_EMAIL"] = true;
                }
            }

            if(empty($data["ERROR"]) && !$data["ERROR"]) {
                $user = new User;
                $data["RESULT"] = $user->create([
                    "name" => $login,
                    "password" => $pass,
                    "email" => $email
                ]);

                return $response->withJson($data, 200);
            }
        }

        if(isset($data["ERROR"]["IS_EXISTS_LOGIN"]) && isset($data["ERROR"]["IS_EXISTS_EMAIL"])) {
            $data["ERROR"]["STATUS"] = true;
            $data["ERROR"]["FULL_EXISTS_STATUS"] = true;
            $data["ERROR"]["MESSAGES"][] = "Логин или почта уже используется!";
        }

        if(isset($data["ERROR"]["IS_EXISTS_LOGIN"]) && $data["ERROR"]["IS_EXISTS_LOGIN"] && !isset($data["ERROR"]["FULL_EXISTS_STATUS"])) {
            $data["ERROR"]["STATUS"] = true;
            $data["ERROR"]["MESSAGES"][] = "Логин уже используется!";
        }

        if(isset($data["ERROR"]["IS_EXISTS_EMAIL"]) && $data["ERROR"]["IS_EXISTS_EMAIL"] && !isset($data["ERROR"]["FULL_EXISTS_STATUS"])) {
            $data["ERROR"]["STATUS"] = true;
            $data["ERROR"]["MESSAGES"][] = "Почта уже используется!";
        }

        return $response->withJson($data, 400);
    }

    public function logout(Request $request, Response $response)
    {
        $keyToken = $this->getTokenKeyName();
        $refresh = $request->getCookieParam($keyToken) && '';
        $token = new Token();

        if($result = $token->delete($refresh)) {
            setcookie(
                $keyToken,
                "",
                time() - 3600,
                "/",
                "",
                false,
                true
            );

            return $response->withJson(['status' => 'success'], 200);
        }

        return $response->withJson($result, 200);
    }

    public function checkEmail(Request $request, Response $response)
    {
        $name = $request->getParam('email');
        $result = [];

        if($name) {
            $user = new User();

            if($user->checkUserByEmail($name)) {
                $result["status"] = "fail";
                $result["message"] = "Такой пользователь уже есть!";
                return $response->withJson($result, 200);
            }

            return $response->withJson(['status' => 'success', 'message' => ''], 200);
        }

        return $response->withJson(['status' => 'fail', 'message' => 'Укажите логин или email'], 200);
    }

    private function getTokenKeyName()
    {
        return $this->getContainer()->get('settings')['nameTokenKey'];
    }
}
