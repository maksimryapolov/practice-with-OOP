{{> layout/header }}

<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="text-center mt-5">
                <h1 class="display-4 mb-2">Личный кабинет</h1>
                {{#RESULT}}
                    <div class="alert alert-info" role="alert">
                        Данные обновлены
                    </div>
                {{/RESULT}}
                <form action="/user/personal" class="" method="POST">
                    <input type="hidden" name="register" value="Y">
                    <div class="d-flex flex-column align-items-center">
                        <div class="card-title">
                            <span class="mb-2 fs-2">
                                <strong>{{name}}</strong>
                            </span>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        {{#ERROR}}
                            {{#EMAIL}}
                                <span class="text-danger mb-2">{{EMAIL}}</span>
                            {{/EMAIL}}
                        {{/ERROR}}
                        <label for="">
                            <input class="form-control mb-2" placeholder="Email" type="text" name="EMAIL" value={{email}}>
                        </label>
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        {{#ERROR}}
                            {{#PASSWORD}}
                                <span class="text-danger mb-2">{{PASSWORD}}</span>
                            {{/PASSWORD}}
                        {{/ERROR}}
                        <label for="">
                            <input class="form-control mb-2" placeholder="Новый пароль" type="password" name="PASSWORD" value="">
                        </label>
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        {{#ERROR}}
                            {{#CONFIRM_PASSWORD}}
                                <span class="text-danger mb-2">{{CONFIRM_PASSWORD}}</span>
                            {{/CONFIRM_PASSWORD}}
                        {{/ERROR}}
                        <label for="">
                            <input class="form-control mb-2" placeholder="Подтвердите пароль" type="password" name="CONFIRM_PASSWORD" value="">
                        </label>
                    </div>
                    <div class="form-group">
                        <input type="submit" name="SUBMIT" class="btn btn-primary" value="Отправить">
                    </div>
                    <div class="form-group mt-3">
                        <a href="/user/delete" class="btn btn-danger">Удалить аккаунт</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

{{> layout/footer }}