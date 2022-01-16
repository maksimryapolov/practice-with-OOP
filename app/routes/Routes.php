<?php
namespace App\Routes;

class Routes
{
	public static function getRoutes()
	{
		return array(
			'/' => 'home@index',

            /* user */
            "sign_up" => "user@register",
			"user/register" => "user@register",
            "user/auth" => "user@auth",
            "user/logout" => "user@logout",
            /* !user */

			'menu' => 'menu@index',
			'menu\/(\S+\D+)' => 'menu@categoty',
			'menu\/(\d+)' => 'menu@item'

		);
	}
}
