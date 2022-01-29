{{> layout/header }}

<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="text-center mt-5">
                <h1 class="display-4 mb-2">Личный кабинет</h1>
                {{#ERROR}}
                <div class="d-flex justify-content-center">
                    <div class="alert alert-danger w-50" role="alert">
                        {{ERROR}}
                    </div>
                </div>
                {{/ERROR}}
                {{^RESULT}}
                <form action="/user/auth" class="" method="POST">
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
                        {{#PASSWORD}}
                        <span class="text-danger mb-2">{{PASSWORD}}</span>
                        {{/PASSWORD}}
                        {{/ERROR}}
                        <label for="">
                            <input class="form-control mb-2" placeholder="Пароль" type="text" name="PASSWORD" value={{email}}>
                        </label>
                    </div>
                    <div class="form-group">
                        <input type="submit" name="SUBMIT" class="btn btn-primary" value="Отправить">
                    </div>
                </form>
                {{/RESULT}}
            </div>
        </div>
    </div>
</div>

{{> layout/footer }}