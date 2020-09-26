<?php

namespace App\Components\Router\Helpers;

/**
* Класс преобразования URI строки и смотрит есть ли index.php|html в пути
*/
class QueryStringHelper
{
	private const LIMIT = 2;
	private const DELIMITER = '/';
	private $string;

	public function parseString()
	{
		$this->string = array_filter(explode(self::DELIMITER, $_SERVER['REQUEST_URI']));
		$this->checkIndex();

		if(count($this->string) >= self::LIMIT) {
			return implode(self::DELIMITER, $this->string);
		}

		return empty($this->string) ? self::DELIMITER : implode(self::DELIMITER, $this->string);
	}

	public function getControllerName()
	{
		return ;
	}

	private function checkIndex()
	{
		foreach ($this->string as $key => $value) {
			if(preg_match('/index.(html|php)$/', $value)) {
				unset($this->string[$key]);
			}
		}
	}

	public function setNames()
	{

	}
}