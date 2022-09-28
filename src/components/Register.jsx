import { useState } from "react";

function Register(props) {
  const [state, setState] = useState({ email: "", password: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;

    props.onRegister(email, password).catch((err) => {
      console.log(err);
      setState((old) => ({
        ...old,
        message: "Что-то пошло не так!",
      }));
    });
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input auth__input_email"
          placeholder="Email"
          value={state.email}
          name="email"
          onChange={handleChange}
        />
        <input
          className="auth__input auth__input_password"
          placeholder="Пароль"
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button className="auth__button">Зарегистрироваться</button>
        <p className="auth__entrance">Уже зарегистрированы? Войти</p>
      </form>
    </div>
  );
}

export default Register;
