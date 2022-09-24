function Login() {
  return (
    <div className="auth">
      <h1 className="auth__title">Вход</h1>
      <form className="auth__form">
        <input className="auth__input auth__input_email" placeholder="Email" />
        <input
          className="auth__input auth__input_password"
          placeholder="Пароль"
          type="password"
        />
        <button className="auth__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
