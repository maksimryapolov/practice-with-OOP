<?php


namespace App\controllers\Api\V1;


use App\Models\Token;
use App\Models\User;
use Slim\Http\Request;
use Slim\Http\Response;

class UsersController
{
    public function getUsersOld(Request $request, Response $response)
    {
        $token = new Token();
        $headers = apache_request_headers();

        if(isset($headers["Authorization"]) && $headers["Authorization"]) {
            $accessTokenCook = explode(" ", $headers["Authorization"])[1];

            $userData = $token->verifyAccess($accessTokenCook);

            if($userData["status"] === "success") {
                echo json_encode(["user list"]);
                return true;
            }

            echo json_encode($userData);
            return true;
        }

        echo json_encode(["status" => "fail", "message" => "Authorization error!"]);
        return true;
    }

    public function getUsers(Request $request, Response $response)
    {
        return $response->withJson((new User)->getUsersList(), 200);
    }
}