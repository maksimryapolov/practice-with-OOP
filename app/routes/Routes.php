<?php
namespace App\Routes;

class Routes
{
	public static function getRoutes()
	{
		return array(
			'/' => 'home@index',

            "sign_up" => "user@add",
			"user/register" => "user@register",

			'menu' => 'menu@index',
			'menu\/(\S+\D+)' => 'menu@categoty',
			'menu\/(\d+)' => 'menu@item'

		);
	}
}
