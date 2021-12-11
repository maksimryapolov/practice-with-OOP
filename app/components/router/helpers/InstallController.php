<?php

namespace App\Components\Router\Helpers;

class InstallController
{
	private $controller;
	private $method;
	private $params;

	const DF_NAMESPACE_CONTROLLER = "App\\Controllers\\";

	public function install($routes, $path) 
	{
		if(!empty($routes)) {
			foreach ($routes as $key => $value) {
				if(preg_match("~^$key$~", $path)) {
					$data = explode('@', $value);

					$this->setNameController(self::DF_NAMESPACE_CONTROLLER . ucfirst(array_shift($data)) . 'Controller');
					$this->setNameMethod('Action' . ucfirst(array_shift($data)));

					if (preg_replace("~^$key$~", "$1", $path)) {
						$this->params = preg_replace("~^$key$~", "$1", $path);
					}
				}
			}
		}
	}

    /**
     * @param $name
     */
	public function setNameController($name)
	{
		if($name) {
			$this->controller = $name;
		}
	}

	public function getNameController()
	{
		return $this->controller;
	}

	public function setNameMethod($name)
	{
		if($name) {
			$this->method = $name;
		}
	}

	public function getNameMethod()
	{
		return $this->method;
	}

	public function setParams()
	{
		//
	}

	public function getParams()
	{
		return $this->params;
	}
}