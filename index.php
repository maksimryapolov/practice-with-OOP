<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
session_start();

require __DIR__ . '/vendor/autoload.php';

define('ROOT', $_SERVER['DOCUMENT_ROOT']);

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

use App\components\Kernel;
use App\Routes\Routes;
use App\Components\Router\Router;

// $router = new Router(Routes::getRoutes());
$config = require __DIR__ . "/app/components/config/settings.php";

$kernel = new Kernel($config);
// include_once ROOT . '/app/bootstrap/functions.php';

$kernel->run();

// $router->init();
// $router->run();
