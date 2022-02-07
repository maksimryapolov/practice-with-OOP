{{> layout/header }}

<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="text-center mt-5">
                {{^RESULT}}
                    <h1 class="display-4 mb-2">Регистрация</h1>
                    <form action="/user/register" class="" method="POST">
                        <input type="hidden" name="register" value="Y">
                        <div class="d-flex flex-column align-items-center">
                            {{#ERROR}}
                                {{#LOGIN}}
                                    <div class="text-danger mb-2">{{LOGIN}}</div>
                                {{/LOGIN}}
                            {{/ERROR}}
                            <label class="" for="">
                                <input class="form-control mb-2 border" placeholder="Логин" type="text" name="LOGIN">
                            </label>
                        </div>
                        <div class="d-flex flex-column align-items-center">
                            {{#ERROR}}
                                {{#EMAIL}}
                                    <span class="text-danger mb-2">{{EMAIL}}</span>
                                {{/EMAIL}}
                            {{/ERROR}}
                            <label for="">
                                <input class="form-control mb-2" placeholder="Email" type="text" name="EMAIL">
                            </label>
                        </div>
                        <div class="d-flex flex-column align-items-center">
                            {{#ERROR}}
                                {{#PASSWORD}}
                                    <span class="text-danger mb-2">{{PASSWORD}}</span>
                                {{/PASSWORD}}
                            {{/ERROR}}
                            <label for="">
                                <input class="form-control mb-2" placeholder="Пароль" type="password" name="PASSWORD">
                            </label>
                        </div>
                        <div class="form-group">
                            <input type="submit" name="SUBMIT" class="btn btn-primary" value="Отправить">
                        </div>
                    </form>
                {{/RESULT}}

                {{#RESULT}}
                    <div class="">
                        <div class="alert alert-info" role="alert">
                            {{RESULT}}
                        </div>
                        <a class="btn btn-link" href="/user/auth/">
                            Авторизация
                        </a>
                    </div>
                {{/RESULT}}
            </div>
        </div>
    </div>
</div>

{{> layout/footer }}