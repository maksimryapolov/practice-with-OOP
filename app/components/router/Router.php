<?php

namespace App\Components\Router;

use App\Components\Router\Helpers\QueryStringHelper;
use App\Components\Router\Helpers\InstallController;
use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;


/**
 *
 * Использовать Router как фасад, для определения контроллера исходя из URI
 *
 * Class Router
 * @package App\Components\Router
 */
class MV
{
    public function __invoke($request, $response, $next)
    {
        $response->getBody()->write('BEFORE');
        $response = $next($request, $response);
        $response->getBody()->write('AFTER');

        return $response;
    }
}
class Router
{
    /**
     * @var array
     */
	private $routes;
    /**
     * @var string
     */
	private $path;
    /**
     * @var QueryStringHelper
     */
	private $queryStringHelper;
    /**
     * @var InstallController
     */
	private $installController;

    /**
     * Router constructor.
     * @param array $routes
     * @param QueryStringHelper|null $queryStringHelper
     * @param InstallController|null $installController
     */
	public function __construct (
		array $routes,
		QueryStringHelper $queryStringHelper = null,
		InstallController $installController = null
	) {
		$this->routes = $routes;
		$this->queryStringHelper = $queryStringHelper ?: new QueryStringHelper($_SERVER['REQUEST_URI']);
		$this->installController = $installController ?: new InstallController();
	}

    /**
     * Инициализация контроллера
     */
	public function init()
    {
        $this->path = $this->getCurPath();
        $this->installController->install($this->routes, $this->path);
    }

    /**
     * Возов контроллера
     */
	public function run()
	{
        
        // Create and configure Slim app
        $config = [
            'settings' => [
                'displayErrorDetails' => true,
                'debug' => true
            ]
        ];
        $app = new App($config);

        // Define app routes
        $app->get('/api', function (Request $request, Response $response) {
            $headers = $request->getParams();
            echo "<pre>";
            var_dump($headers);
            echo "</pre>";
            $name = $request->getAttribute('name');
            return $response->withStatus(401)->write("Hello " . $name);
        })->add((new MV));

        // Run app
        $app->run();

        die;
	    /*$this->isSetResource();

		$class = $this->installController->getNameController();
		$method = $this->installController->getNameMethod();

		$segment = new $class();
		$segment->$method($this->installController->getParams());*/
	}

    /**
     * @return string
     */
	public function getCurPath()
	{
		return $this->queryStringHelper->parseString();
	}

	// TODO: Сделать подключение 404 страницы
	private function isSetResource()
    {
        if(!$this->installController->getNameController() && !$this->installController->getNameMethod()) {
            die('404');
        }
    }

}