<?php
namespace App\Routes;

class Routes
{
	public static function getRoutes()
	{
		return array(
			'/' => 'home@index',

			'menu' => 'menu@index',
			'menu\/(\S+\D+)' => 'menu@categoty',
			'menu\/(\d+)' => 'menu@item'
		);
	}
}
