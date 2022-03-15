<?php


namespace App\controllers\Api\V1;


use Slim\Container;

/**
 * Class BaseController
 * @package App\controllers\Api\V1
 */
class BaseController
{
    /**
     * @var Container
     */
    private $container;

    /**
     * BaseController constructor.
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @return bool|Container
     */
    protected function getContainer()
    {
        if($this->container && $this->container instanceof Container) {
            return $this->container;
        }

        return false;
    }
}