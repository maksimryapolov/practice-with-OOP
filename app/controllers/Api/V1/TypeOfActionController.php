<?php


namespace App\controllers\Api\V1;


use App\Models\ComponentOfBoards\Account;
use Slim\Http\Request;
use Slim\Http\Response;

class TypeOfActionController
{
    public function getList(Request $request, Response $response): Response
    {
        $accounts = (new Account())->getAccounts();
        if($accounts) {
            return $response->withJson([
                "success" => true,
                "data" => $accounts,
                "message" => "",
                "code" => 0
            ]);
        }

        return $response->withJson([
            "success" => false,
            "data" => [],
            "message" => "Нет записей",
            "code" => 1
        ]);
    }
}