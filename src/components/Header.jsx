import logoPath from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logoPath} className="header__logo" alt="Логотип Mesto" />
      {props.children}
    </header>
  );
}
export default Header;
