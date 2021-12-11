{{> layout/header }}

<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="text-center mt-5">
                <h1 class="display-4 mb-2">Регистрация</h1>
                <form action="sign_up" class="" method="POST">
                    <input type="hidden" name="register" value="Y">
                    <div class="form-group">
                        <label for="">
                            <input class="form-control mb-2" placeholder="Логин" type="text" name="LOGIN">
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="">
                            <input class="form-control mb-2" placeholder="Email" type="text" name="EMAIL">
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="">
                            <input class="form-control mb-2" placeholder="Пароль" type="text" name="PASSWORD">
                        </label>
                    </div>
                    <div class="form-group">
                        <input type="submit" name="submit" class="btn btn-primary" value="Отправить">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

{{> layout/footer }}