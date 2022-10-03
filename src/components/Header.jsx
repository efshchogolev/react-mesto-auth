import { Link, useLocation } from "react-router-dom";
import logoPath from "../images/logo.svg";

function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={logoPath} className="header__logo" alt="Логотип Mesto" />
      <div className="header__container">
        {props.email && location.pathname === "/" && (
          <p className="header__email">{props.email}</p>
        )}
        <p
          className={`header__text ${
            location.pathname !== "/" ? "header__text_invisible" : ""
          }`}
          onClick={props.onLogout}
        >
          Выйти
        </p>
        <p
          className={`header__text ${
            location.pathname !== "/sign-in" ? "header__text_invisible" : ""
          }`}
        >
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </p>
        <p
          className={`header__text ${
            location.pathname !== "/sign-up" ? "header__text_invisible" : ""
          }`}
        >
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </p>
      </div>
    </header>
  );
}
export default Header;
