<?php

namespace App\Components\Router\Helpers;

/**
* Класс преобразования URI в строку формата catalog/id без index.[php|html]
*/
class QueryStringHelper
{
    /**
     * @var string
     */
	private $string;
    /**
     * @var string
     */
	private $requesUri;

    /**
     * @var int
     */
    private const LIMIT = 2;

    /**
     * @var string
     */
    private const DELIMITER = '/';

    /**
     * QueryStringHelper constructor.
     * @param string $requesUri
     */
	public function __construct(string $requesUri)
    {
        $this->requesUri = $requesUri;
    }

    /**
     * @param string $requesUri
     * @return string
     */
	public function parseString()
    {
        $this->string = $this->pathInArr();
        $this->checkIndex();

        if(count($this->string) >= self::LIMIT) {
            return implode(self::DELIMITER, $this->string);
        }

        return empty($this->string) ? self::DELIMITER : implode(self::DELIMITER, $this->string);
    }

    /**
     * Преобразует строку запроса в массив
     *
     * @return false|string[]
     *
     */
    private function pathInArr()
    {
        return array_filter(explode(self::DELIMITER, $this->requesUri));
    }

    /**
     * Игнорирует в строке запроса index.[php|html]
     */
    private function checkIndex()
	{
		foreach ($this->string as $key => $value) {
			if(preg_match('/index.(html|php)$/', $value)) {
				unset($this->string[$key]);
			}
		}
	}
}