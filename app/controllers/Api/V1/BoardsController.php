<?php


namespace App\controllers\Api\V1;


use App\classes\Validate\VadlidateDataTime;
use App\classes\Validate\ValidateNumber;
use App\Models\Board;
use App\Models\ComponentOfBoards\Account;
use App\Models\ComponentOfBoards\Category;
use App\Models\ComponentOfBoards\TypeRecords;
use App\Models\User;
use Slim\Http\Request;
use Slim\Http\Response;

class BoardsController extends BaseController
{
    private const TPL_FORMAT_DATE_TIME = "Y-m-d h:i:s";

    public function add(Request $request, Response $response)
    {
        $result = [
            'error' => ['status' => false]
        ];
        $date = $request->getParam("date") ?: date($this->getDateFormat()); // Определить формат
        $amount = $request->getParam("amount");
        // ids records
        $recordID = $request->getParam("record_type") ?: 1; // Доход или расход
        $accountID = $request->getParam("account") ?: 1 ;
        $categoryID = $request->getParam("category") ?: 1;
        $userID = $request->getParam("user") ?: 28;

        $vDareTime = new VadlidateDataTime($date, $this->getDateFormat());
        if(!isset($date) && !$date && !$vDareTime->check()) {
            $result['error']['status'] = true;
            $result['error']['messages'][] = $vDareTime->getError();
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
        $userId = User::getCurUser(explode(' ', $request->getHeader('HTTP_AUTHORIZATION')[0])[1]);
        if($userId === 0) {
            $result['error']['status'] = true;
            $result['error']['messages'][] = 'Ошибка сохранения пользователя!';
        }

        if(!$result['error']['status']) {
            $board = new Board();
            return $board->create([
                "DATE" => $date,
                "ACCOUNT" => $accountID,
                "CATEGORY" => $categoryID,
                "AMOUNT" => $amount,
                "USER" => $userID,
                "TYPE" => $recordID
            ]);
        }

        return $response->withJson($result);
    }

    private function getDateFormat()
    {
        return self::TPL_FORMAT_DATE_TIME;
    }

    public function getFieldsValue(Request $request, Response $response)
    {
        return $response->withJson([
            "category" => (new Category())->getListIdRecords(),
            "recordType" => (new TypeRecords)->getListIdRecords(),
            "account" => (new Account())->getListIdRecords()
        ]);
    }
}