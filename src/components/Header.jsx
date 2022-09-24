import logoPath from "../images/logo.svg";

function Header({ text }) {
  return (
    <header className="header">
      <img src={logoPath} className="header__logo" alt="Логотип Mesto" />
      <p className="header__text">{text}</p>
    </header>
  );
}
export default Header;
