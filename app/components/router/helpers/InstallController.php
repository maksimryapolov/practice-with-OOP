<?php

namespace App\Components\Router\Helpers;

class InstallController
{
	private $controller;
	private $method;
	private $params;

	public function install($routes, $path) 
	{
		if(!empty($routes)) {
			foreach ($routes as $key => $value) {
				if(preg_match("~^$key$~", $path)) {
					$data = explode('@', $value);
					$this->controller = "App\\Controllers\\" . ucfirst(array_shift($data)) . 'Controller';
					$this->method = 'Action' . ucfirst(array_shift($data));

					if (preg_replace("~^$key$~", "$1", $path)) {
						$this->params = preg_replace("~^$key$~", "$1", $path);
					}
				}
			}
		}
	}

	public function getNameController()
	{
		return $this->controller;
	}

	public function getNameMethod()
	{
		return $this->method;
	}

	public function getParams()
	{
		return $this->params;
	}
}