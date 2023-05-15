import Popup from "./Popup";
import accessIcon from "../../images/icons/access.svg";
import accessDeniedIcon from "../../images/icons/access-denied.svg";

function InfoTooltip({ accessStatus, isOpen, onClose }) {
  const tooltipIcon = accessStatus ? accessIcon : accessDeniedIcon;
  const tooltipAlt = accessStatus ? "access" : "access denied";
  const tooltipText = accessStatus
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <Popup
      popupClass="info-tooltip"
      type="info-tooltip"
      isOpen={isOpen}
      onClose={onClose}
    >
      <img className="popup__info-img" src={tooltipIcon} alt={tooltipAlt} />
      <p className="popup__info-title">{tooltipText}</p>
    </Popup>
  );
}

export default InfoTooltip;
