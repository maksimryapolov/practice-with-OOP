<?php


namespace App\controllers\Api\V1;


use App\classes\Validate\ValidateString;
use Slim\Http\Request;
use Slim\Http\Response;

class BaseBoardSegmentController
{
    /**
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function processing(Request $request, Response $response) :Response
    {
        $result = [];
        $model = '';
        $name = $request->getParam("name");
        $segment = $request->getParam("segment");
        $id = $request->getParam("id");
        $vName = new ValidateString($name);
        if(!$vName->check()) {
            $result["ERROR"]["STATUS"] = !$vName->check();
            $result["ERROR"]["MESSAGE"] = $vName->getError();
            return $response->withJson($result);
        }

        $model = $this->getModel($segment);

        if($model) {
            $category = new $model();
            switch ($request->getMethod()) {
                case 'POST':
                    $result["id"] = $category->create($name);
                    break;
                case 'PUT':
                    $result["id"] = $category->update($name, $id);
                    break;
            }
            $result["name"] = $name;
            $result["success"]["status"] = true;
            return $response->withJson($result);
        }

        $result["ERROR"]["STATUS"] = true;
        $result["ERROR"]["MESSAGE"] = "Не указан метод";
        return $response->withJson($result);
    }

    /**
     * @param string $table
     * @return string
     */
    private function getModel(string $table) :string
    {
        switch ($table) {
            case 'category':
                return 'App\Models\ComponentOfBoards\Category';
            case 'account':
                return 'App\Models\ComponentOfBoards\Account';
            default:
                return '';
        }

    }



}