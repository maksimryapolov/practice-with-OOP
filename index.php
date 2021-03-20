<?php
require __DIR__ . '/vendor/autoload.php';

define('ROOT', $_SERVER['DOCUMENT_ROOT']);

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

use App\Routes\Routes;
use App\Components\Router\Router;

$router = new Router(Routes::getRoutes());

include_once ROOT . '/app/bootstrap/functions.php';

$router->init();
$router->run();
