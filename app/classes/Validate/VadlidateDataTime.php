<?php


namespace App\classes\Validate;

use App\classes\Validate\InterfaceV\MainValidate;
use Respect\Validation\Exceptions\ValidationException;
use Respect\Validation\Validator as v;

class VadlidateDataTime extends MainValidate
{

    /**
     * @var string
     */
    protected $nameParam = "Дата:";
    protected $input;
    protected $descError = "неверный формат";
    protected $format = "Y-m-d hi:s";

    /**
     * @var v
     */
    protected $validated;

    public function __construct($input, $format = "")
    {
        parent::__construct($input);
        $this->format = $format ?: $this->format;
        $this->validated = v::dateTime($format)->setName($this->nameParam);
    }

    /**
     * @return string
     */
    protected function getDesc()
    {
        return $this->descError;
    }

}