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
            $data["ERROR"] = "Неверный логин или пароль";
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
                $data["ERROR"]["LOGIN"] = $vLogin->getError();
            }

            $vEmail = new VadlidateEmail($email);
            if(!$vEmail->check()) {
                $data["ERROR"]["EMAIL"] = $vEmail->getError();
            }

            $vPass = new ValidatePassword($pass);
            if(!$vPass->check()) {
                $data["ERROR"]["PASSWORD"] = $vPass->getError();
            }

            if(
                (
                    (!isset($data["ERROR"]["EMAIL"]) && !$data["ERROR"]["EMAIL"]) ||
                    (!isset($data["ERROR"]["LOGIN"]) && !$data["ERROR"]["LOGIN"])
                ) &&
                User::checkUserByEmail($email, $login)
            ) {
                $data["ERROR"]["AUTH"] = User::checkUserByEmail($email, $login);
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

    private function getTokenKeyName()
    {
        return $this->getContainer()->get('settings')['nameTokenKey'];
    }
}
