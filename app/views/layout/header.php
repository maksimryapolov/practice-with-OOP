<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тестовый шаблон</title>
    <link rel="stylesheet" href="/app/assets/dist/styles/main.css">

</head>
<body>

<div class="container">
    <div class="row">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <span class="fs-4">Логотип</span>
            </a>
            <div class="col-md-3 text-end">
                {{^USER_AUTH}}
                    <a href="/user/auth/" type="button" class="btn btn-outline-primary me-2">Войти</a>
                    <a href="/user/register/" type="button" class="btn btn-primary">Регистрация</a>
                {{/USER_AUTH}}

                {{#USER_AUTH}}
                    <div class="d-flex justify-content-around align-items-center">
                        <div class="d-flex flex-row align-items-center">
                            <div class="flex-shrink-0 me-3">
                                <a href="/user/personal/" class="btn btn-primary">
                                    В кабинет
                                </a>
                            </div>
                            <div class="border-bottom">
                                <strong> {{username}}</strong>
                            </div>
                        </div>
                        <div>
                            <a href="/user/logout/">
                                Выйти
                            </a>
                        </div>
                    </div>
                {{/USER_AUTH}}
            </div>
        </header>
    </div>
</div>