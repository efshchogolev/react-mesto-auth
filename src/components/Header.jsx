import logoPath from "../images/logo.svg";

function Header({ text }) {
  return (
    <header className="header">
      <img src={logoPath} className="header__logo" alt="Логотип Mesto" />
      {text}
    </header>
  );
}
export default Header;
