<?php

namespace App\components\config;


use App\Models\User;

class BaseParams
{
    private $params = [];

    public function init()
    {
        $this->params["USER_AUTH"] = User::isAuth();

        if($this->params["USER_AUTH"]) {
            $user = new User();
            $userId = User::getCurUserID();
            $user->getUserById($userId);
        }
    }

    public function getParams()
    {
        return $this->params;
    }
}