function Register() {
  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form">
        <input className="auth__input auth__input_email" placeholder="Email" />
        <input
          className="auth__input auth__input_password"
          placeholder="Пароль"
          type="password"
        />
        <button className="auth__button">Зарегистрироваться</button>
        <p className="auth__entrance">Уже зарегистрированы? Войти</p>
      </form>
    </div>
  );
}

export default Register;
