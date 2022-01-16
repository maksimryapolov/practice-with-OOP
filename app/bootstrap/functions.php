<?php

use App\Classes\IncludeView;

function view(string $file, array $params = [])
{
    $view = new IncludeView($file);
    $view->render($params);
}

/**
 * Определяет окончание в зависимости от числа
 *
 * @param $n
 * @param $titles
 * @return mixed
 */
function definesEnding($n, $titles) {
    $cases = array(2, 0, 1, 1, 1, 2);
    return $titles[($n % 100 > 4 && $n % 100 < 20) ? 2 : $cases[min($n % 10, 5)]];
}