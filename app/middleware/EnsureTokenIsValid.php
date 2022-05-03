<?php


namespace App\middleware;


use App\Models\Token;
use Slim\Http\Request;
use Slim\Http\Response;

class EnsureTokenIsValid
{
    public function run(Request $request, Response $response, $next)
    {

        if($request->getHeader('HTTP_AUTHORIZATION')) {
            $accessToken = explode(" ", $request->getHeader('HTTP_AUTHORIZATION')[0])[1];
        }

        $token = new Token();

        if(isset($accessToken) && $accessToken) {

            $userData = $token->verifyAccess($accessToken);

            if($userData["status"] === "success") {
                return $next($request, $response);
            }

            return $response->withStatus(401)->withJson($userData);;
        }

        return $response->withStatus(401)->withJson(
            ["error" => ["status" => "fail", "code" => 2, "message" => "Not authorized"]]
        );
    }
}