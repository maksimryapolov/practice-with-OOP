<?php

namespace App\Components\Router;

use App\Routes\Routes;
use App\Components\Router\Helpers\QueryStringHelper;
use App\Components\Router\Helpers\InstallController;

class Router
{
	private $routes;
	private $path;
	private $queryStringHelper;
	private $installController;

	public function __construct (
		$routes,
		QueryStringHelper $queryStringHelper = null,
		InstallController $installController = null
	) {
		$this->routes = $routes;
		$this->queryStringHelper = $queryStringHelper ?: new QueryStringHelper();
		$this->installController = $installController ?: new InstallController();
		$this->path = $this->getCurPath();

		$this->installController->install($this->routes, $this->path);
	}

	public function run()
	{
		$class = $this->installController->getNameController();
		$method = $this->installController->getNameMethod();
		$segment = new $class();
		$segment->$method($this->installController->getParams());
	}

	public function getCurPath()
	{
		return $this->queryStringHelper->parseString();
	}
}