<?php


namespace App\controllers\Api\V1;


use App\Models\Token;
use App\Models\User;
use Slim\Http\Request;
use Slim\Http\Response;

class TokenController extends BaseController
{
    public function refresh(Request $request, Response $response)
    {
        $keyToken = $this->getContainer()->get('settings')['nameTokenKey'];
        $refresh = $request->getCookieParam($keyToken);

        $data = [];

        if(!$refresh) {
            return $response->withJson(["error" => ["status" => "fail", "code" => 1, "message" => "not authorized"]], 401);
        }

        $token = new Token();
        $result = $token->verifyRefresh($refresh);

        if(!empty($result) && $result['status'] !== "fail") {
            $user = new User;
            $data["user"] = $user->getUserById($result['data']->id);


            $dataPayload = [
                "USER" => [
                    "ID" => $data["user"]["id"],
                    "EMAIL" => $data["user"]["email"],
                ],
            ];

            $data["TOKEN"]["REFRESH"] = $token->processingRecord($data["user"]["id"], $token->generateRefresh($dataPayload));
            $data["TOKEN"]["ACCESS"] = $token->generateAccess($dataPayload);
            unset($data['user']['password']);

            // setcookie($keyToken, $data["TOKEN"]["REFRESH"], ["expires" => time()+60*60*24*30, "httponly" => true, "path" => "/"]);
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

        setcookie($keyToken, "", time() - 3600);
        return $response->withJson(["status" => "fail", "message" => "Fail validate token"], 401);
    }
}