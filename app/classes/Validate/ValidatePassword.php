<?php
/**
 * Created by PhpStorm.
 * User: maks
 * Date: 19.12.2021
 * Time: 20:35
 */

namespace App\classes\Validate;


use App\classes\Validate\InterfaceV\MainValidate;
use Respect\Validation\Validator as v;

class ValidatePassword extends MainValidate
{
    /**
     * @var string
     */
    protected $nameParam = "Пароль";
    protected $input;
    protected $descError = "должен содержать минимум #LENGTH# символов!";

    /**
     * @var int
     */
    private $length = 6;

    /**
     * @var v
     */
    protected $validated;

    public function __construct($input)
    {
        $this->input = $input;
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