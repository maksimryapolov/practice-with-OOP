<?php

namespace App\classes\Validate;

use App\classes\Validate\InterfaceV\MainValidate;
use Respect\Validation\Validator as v;

class VadlidateEmail extends MainValidate
{
    /**
     * @var string
     */
    protected $nameParam = "Email";
    protected $input;
    protected $descError = "некорректный";

    /**
     * @var int
     */
    private $length = 3;

    /**
     * @var v
     */
    protected $validated;

    public function __construct($input)
    {
        $this->input = $input;
        $this->validated = v::email()->setName($this->nameParam);
    }

    /**
     * @return string
     */
    protected function getDesc()
    {
        return $this->descError;
    }
}