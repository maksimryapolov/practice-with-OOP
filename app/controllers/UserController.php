<?php

namespace App\controllers;

use Respect\Validation\Validator as v;

class UserController
{

    public function ActionRegister()
    {
        view('user/register', []);
    }

    public function ActionAdd()
    {
        echo '<pre>';
        var_dump($_POST);
        // var_dump(v::email()->validate());
        echo '</pre>';

        die("ActionRegister");
    }
}