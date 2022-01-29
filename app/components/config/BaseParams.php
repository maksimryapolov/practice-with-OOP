<?php

namespace App\components\config;


use App\Models\User;

class BaseParams
{
    private $params = [];

    public function __construct()
    {
        $this->setUserParams();
    }

    /**
     * set user auth data
     */
    protected function setUserParams()
    {
        $this->params["USER_AUTH"] = User::isAuth();

        if($this->params["USER_AUTH"]) {
            $user = new User();
            $userId = User::getCurUserID();
            $this->params["USER_AUTH"] = $user->getUserById($userId);
        }
    }

    /**
     * @return array
     */
    public function getParams()
    {
        return $this->params;
    }
}