<?php

namespace App\classes\Validate;

use App\classes\Validate\InterfaceV\MainValidate;
use Respect\Validation\Validator as v;

/**
 * Class ValidateLogin
 * @package App\classes\Validate
 */
class ValidateLogin extends MainValidate
{
    /**
     * @var string
     */
    protected $nameParam = "Логин";
    protected $input;
    protected $descError = "должен содержать минимум #LENGTH# символа"; // echo definesEnding(631, array('символ', 'символа', 'символов'));

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
        parent::__construct($input);
        $this->validated = v::stringVal()->length($this->length)->setName($this->nameParam);
    }

    /**
     * @return string
     */
    protected function getDesc()
    {
        return str_replace("#LENGTH#", $this->length, $this->descError);
    }
}