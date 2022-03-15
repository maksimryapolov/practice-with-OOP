<?php
namespace App\Routes;

class Routes
{
	public static function getRoutes()
	{
		return array(
			'/' => 'home@index',

            /* user
            "sign_up" => "user@register",
			"user/register" => "user@register",
            "user/auth" => "user@auth",
            "user/logout" => "user@logout",
            "user/personal" => "user@profile",
            "user/delete" => "user@delete",
            !user */

            "api/user/refresh" => "userAPI@refresh",
            "api/user/register" => "userAPI@register",
            "api/user/login" => "userAPI@auth",
            "api/user/logout" => "userAPI@logout",

            "api/users" => "usersAPI@index",


			/*'menu' => 'menu@index',
			'menu\/(\S+\D+)' => 'menu@categoty',
			'menu\/(\d+)' => 'menu@item'*/

		);
	}
}
