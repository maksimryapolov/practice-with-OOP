<?php


namespace App\classes\Validate;


use App\classes\Validate\InterfaceV\MainValidate;
use Respect\Validation\Validator as v;

class ValidateNumber extends MainValidate
{
    /**
     * @var string
     */
    protected $nameParam = "Сумма";
    protected $input;
    protected $descError = "не число";

    /**
     * @var v
     */
    protected $validated;

    public function __construct($input)
    {
        parent::__construct($input);
        $this->validated = v::number()->setName($this->nameParam);
    }

    /**
     * @return string
     */
    protected function getDesc()
    {
        return $this->descError;
    }
}