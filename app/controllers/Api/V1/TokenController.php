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
            return $response->withJson(["status" => "fail", "message" => "not authorized"], 401);
        }

        $token = new Token();
        $result = $token->verifyRefresh($refresh);

        if(!empty($result) && $result['status'] !== "fail") {
            $user = new User;
            $data["USER"] = $user->getUserById($result->id);

            $dataPayload = [
                "USER" => [
                    "ID" => $data["USER"]["id"],
                    "EMAIL" => $data["USER"]["email"]
                ],
            ];

            $data["TOKEN"]["REFRESH"] = $token->processingRecord($data["USER"]["id"], $token->generateRefresh($dataPayload));
            $data["TOKEN"]["ACCESS"] = $token->generateAccess($dataPayload);

            setcookie($keyToken, $data["TOKEN"]["REFRESH"], ["expires" => time()+60*60*24*30, "httponly" => true, "path" => "/"]);
            return $response->withJson($data, 200);
        }

        setcookie($keyToken, "", time() - 3600);
        return $response->withJson(["status" => "fail", "message" => "Fail validate token"], 401);
    }
}