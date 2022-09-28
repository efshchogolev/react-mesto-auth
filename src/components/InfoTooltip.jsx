function InfoTooltip({ name, isOpen, onClose, text, imgPath }) {
  const className = `${isOpen ? "popup_isOpen" : ""}`;
  return (
    <div className={`popup ${className}`} id={`popup_${name}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          id={`close_${name}`}
          onClick={onClose}
        ></button>
        <img src={imgPath} />
        <h2 className="popup__title">{text}</h2>
      </div>
    </div>
  );
}
export default InfoTooltip;
