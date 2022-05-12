<?php


namespace App\controllers\Api\V1;


use App\classes\Validate\ValidateString;
use Slim\Http\Request;
use Slim\Http\Response;

class BaseBoardSegmentController
{
    /**
     * @var array
     */
    private $result = [];

    /**
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function processing(Request $request, Response $response) :Response
    {
        $model = '';
        $name = $request->getParam("name");
        $segment = $request->getParam("segment");
        $id = $request->getParam("id");
        $typeId = $request->getParam("typeId");
        $model = $this->getModel($segment);

        if($model) {
            $category = new $model();
            switch ($request->getMethod()) {
                case 'POST':
                    if(!$this->checkName($name))
                        return $response->withJson($this->result);
                    $this->result["id"] = $category->create($name, $typeId);
                    break;
                case 'PUT':
                    if(!$this->checkName($name))
                        return $response->withJson($this->result);
                    $this->result["id"] = $category->update($name, $id);
                    break;
                case 'DELETE':
                    $this->result["id"] = $category->delete($id);
                    break;
            }
            $this->result["name"] = $name;

            if($typeId) {
                $this->result["typeId"] = $typeId;
            }

            $this->result["success"]["status"] = true;

            return $response->withJson($this->result);
        }

        $this->result["ERROR"]["STATUS"] = true;
        $this->result["ERROR"]["MESSAGE"] = "Не указан метод";
        return $response->withJson($this->result);
    }

    private function checkName(string $name) :bool
    {
        $vName = new ValidateString($name);
        if(!$vName->check()) {
            $this->result["ERROR"]["STATUS"] = !$vName->check();
            $this->result["ERROR"]["MESSAGE"] = $vName->getError();
            return false;
        }

        return true;
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