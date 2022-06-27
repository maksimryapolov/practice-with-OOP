<?php


namespace App\controllers\Api\V1;


use App\classes\Validate\VadlidateDataTime;
use App\classes\Validate\ValidateNumber;
use App\Models\Board;
use App\Models\ComponentOfBoards\Account;
use App\Models\ComponentOfBoards\Category;
use App\Models\ComponentOfBoards\TypeRecords;
use App\Models\Token;
use App\Models\User;
use Slim\Http\Request;
use Slim\Http\Response;

class BoardsController extends BaseController
{
    private const TPL_FORMAT_DATE = "Y-m-d h:i:s";
    private const TPL_FORMAT_TIME = "h:i:";

    public function add(Request $request, Response $response)
    {
        $keyToken = $this->getContainer()->get('settings')['nameTokenKey'];
        $refresh = $request->getCookieParam($keyToken);
        $token = new Token();
        $result = [
            'error' => ['status' => false]
        ];

        if($token) {
            $result['user'] = $token->verifyRefresh($refresh);
            $user = $result['user']["data"];

            $date = $request->getParam("date") ?: date($this->getDateFormat()); // Определить формат
            $time = $request->getParam("time") ?: date($this->getTimeFormat()); // Определить формат
            $amount = $request->getParam("amount");

            $recordID = $request->getParam("recordType"); // Доход или расход
            $accountID = $request->getParam("account");
            $categoryID = $request->getParam("category");
            $userID = $request->getParam("user") ?: (int)$user->id;

            $vDate = new VadlidateDataTime($date, $this->getDateFormat());
            if(!isset($date) && !$date && !$vDate->check()) {
                $result['error']['status'] = true;
                $result['error']['messages'][] = $vDate->getError();
            }

            $vTime = new VadlidateDataTime($time, $this->getTimeFormat());
            if(!isset($time) && !$time && !$vTime->check()) {
                $result['error']['status'] = true;
                $result['error']['messages'][] = $vTime->getError();
            }

            $vNumber = new ValidateNumber($amount);
            if(!$amount && !$vNumber->check()) {
                $result['error']['status'] = true;
                $result['error']['messages'][] = $vNumber->getError();
            }

            $allRecordsId = (new TypeRecords)->getListIdRecords();
            if(!$recordID && in_array($recordID, $allRecordsId)) {
                $result['error']['status'] = true;
                $result['error']['messages'][] = 'Неверный тип записи!';
            }

            $allAccountsId = (new Account())->getListIdRecords();
            if(!$recordID && in_array($recordID, $allAccountsId)) {
                $result['error']['status'] = true;
                $result['error']['messages'][] = 'Неверный тип счета!';
            }

            $allCategoryId = (new Category())->getListIdRecords();
            if(!$recordID && in_array($recordID, $allCategoryId)) {
                $result['error']['status'] = true;
                $result['error']['messages'][] = 'Нет такой категории!';
            }

            // Если приходит запрос значит access действителен
            // $userId = User::getCurUser(explode(' ', $request->getHeader('HTTP_AUTHORIZATION')[0])[1]);
            if($userID === 0) {
                $result['error']['status'] = true;
                $result['error']['messages'][] = 'Ошибка сохранения пользователя!';
            }

            if(!$result['error']['status']) {
                $board = new Board();
                $result["result"]["id"] = $board->create([
                    "date" => $date,
                    "time" => $time,
                    "account" => (int)$accountID,
                    "category" => (int)$categoryID,
                    "amount" => $amount,
                    "user" => (int)$userID,
                    "type" => (int)$recordID
                ]);
                $result["result"]["success"]['status'] = true;
            }
        }

        return $response->withJson($result);
    }

    public function get(Request $request, Response $response)
    {
        $date = [];
        $result = [];

        $date['month'] = $request->getParam("month") ?? date("m");
        $date['year'] = $request->getParam("year") ?? date("Y");
        $type = (int)$request->getParam("type") ?? 1;

        $date['limit'] = $request->getParam("limit") ?? 2;
        $date['page'] = $request->getParam("page") ?? 1;

        $date['offset'] = ceil($date['limit'] * $date['page'] - $date['limit']);

        //TODO: more validation...
        /*
            "success" => true,
            "data" => $accounts,
            "message" => "",
            "code" => 0
         * */

        $result['data'] = (new Board())->get($date, $type);
        $result['success'] = true;
        $result['message'] = "";
        $result['code'] = 0;

        return $response->withJson($result);
    }

    private function getDateFormat() :string
    {
        return self::TPL_FORMAT_DATE;
    }

    private function getTimeFormat() :string
    {
        return self::TPL_FORMAT_TIME;
    }

    public function getFieldsValue(Request $request, Response $response)
    {
        return $response->withJson([
            "category" => (new Category())->getListIdRecords(),
            "recordType" => (new TypeRecords)->getListIdRecords(),
            "account" => (new Account())->getListIdRecords()
        ]);
    }

    public function getPages(Request $request, Response $response)
    {
        $showCount = $request->getParam("show-count") ?? 2;
        $typeId = $request->getParam("activeType") ?? 1;
        $month = $request->getParam("month") ?? date("m");
        $year = $request->getParam("year") ?? date("Y");

        $allRow = (new Board())->getRowCount($year, $month, $typeId);
        $allPages = round($allRow / $showCount);
        return $response->withJson(["allPages" => $allPages]);
    }
}