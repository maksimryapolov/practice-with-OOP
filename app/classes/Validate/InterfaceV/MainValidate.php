<?php

namespace App\classes\Validate\InterfaceV;
use Respect\Validation\Exceptions\ValidationException;


abstract class MainValidate
{
    protected $input;
    protected $validated;
    protected $nameParam;
    protected $descError;
    private $errors;

    public function check()
    {

        try {
            $this->validated->assert($this->input);
        } catch (ValidationException $e) {
            $e->getMessages([
                $this->nameParam => "{{name}} " . $this->getDesc()
            ]);

            $this->errors = $e->getMessage();
        }

        return empty($this->errors);
    }

    public function getError()
    {
        if($this->errors) {
            return $this->errors;
        }

        return false;
    }

}