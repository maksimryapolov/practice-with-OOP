<?php

use App\Classes\IncludeView;

function view(string $file, array $params = [])
{
    $view = new IncludeView($file);
    $view->render($params);
}