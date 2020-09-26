<?php

namespace App\Controllers;

use App\Controllers\Base\Controller;

class HomeController extends Controller
{
	public function ActionIndex()
	{
        view('index', ['name' => 'Max']);
	}
}
