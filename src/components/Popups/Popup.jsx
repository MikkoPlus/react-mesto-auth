import closeIcon from "../../images/icons/close-icon.svg";

function Popup({ popupClass, type, children, isOpen, onClose }) {
  function closePopup(evt) {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup_active")
    ) {
      onClose();
    }
  }

  const popupClassName = popupClass ? `popup ${popupClass}` : "popup";

  return (
    <div
      onClick={closePopup}
      className={`${popupClassName} ${isOpen ? "popup_active" : ""}`}
    >
      <div className={`popup__window popup__window_type_${type}`}>
        <img src={closeIcon} alt="Close" className="popup__close" />
        {children}
      </div>
    </div>
  );
}

export default Popup;
