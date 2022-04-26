<?php

namespace App\components;


use App\controllers\Api\V1\BoardsController;
use App\controllers\Api\V1\BaseBoardSegmentController;
use App\controllers\Api\V1\TokenController;
use App\controllers\Api\V1\AuthController;
use App\controllers\Api\V1\UsersController;
use App\middleware\EnsureTokenIsValid;
use App\Models\User;
use Slim\App;
use Slim\Container;

/**
 * Class Kernel
 * @package App\components
 */
class Kernel
{
    /**
     * @var App
     */
    private $app;

    /**
     * Kernel constructor.
     * @param array $settings
     */
    public function __construct(array $settings)
    {
        $container = new Container($settings);
        $this->app = new App($container);
    }

    /**
     * Run app
     *
     * @throws \Throwable
     */
    public function run()
    {
        $this->routes();
        $this->app->run();
    }

    /**
     * Define app routes
     */
    private function routes()
    {
        $this->app->group('/api', function (App $app) {
            $app->group('/user', function (App $app) {
                $app->post('/register', AuthController::class . ':signUp');
                $app->post('/login', AuthController::class . ':signIn');
                $app->post('/logout', AuthController::class . ':logout');

                $app->post('/refresh', TokenController::class . ':refresh');

                $app->post('/check-email', AuthController::class . ':checkEmail');
                $app->post('/check-register', AuthController::class . ':checkRegister');
            });

            $app->post('/boards', BoardsController::class . ":add")->add(EnsureTokenIsValid::class . ":run");
            $app->post('/boards/get-field-list', BoardsController::class . ":getFieldsValue")->add(EnsureTokenIsValid::class . ":run");
            $app->post('/boards/set-record', BaseBoardSegmentController::class . ":set")->add(EnsureTokenIsValid::class . ":run");
//            $app->post('/boards/type/get', TypyController::class . ":getFieldsValue")->add(EnsureTokenIsValid::class . ":run");
//            $app->post('/boards/account/get', AccountController::class . ":getFieldsValue")->add(EnsureTokenIsValid::class . ":run");

            $app->post('/users', UsersController::class . ":getUsers")->add(EnsureTokenIsValid::class . ":run");
        });
    }
}
