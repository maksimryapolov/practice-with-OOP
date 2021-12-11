<?php

use PHPUnit\Framework\TestCase;
use \App\Components\Router\Helpers\QueryStringHelper;

class QueryStringHelperTest extends TestCase
{
    /**
     * @dataProvider additionProvider
     */
    public function testParseString($expected, $arguments)
    {
        $queryStr = new QueryStringHelper($arguments);
        $this->assertEquals($expected, $queryStr->parseString());
    }

    public function additionProvider()
    {
        return [
            'main index page'                => ['/', '/'],
            'main index page with index.php' => ['/', '/index.php'],
            'page section'                   => [ 'menu', '/menu/'],
            'page section with item'         => ['menu/123','/menu/123']
        ];
    }
}