import logo from "../../images/icons/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({
  additionalClass,
  isLoggedIn,
  userEmail,
  isMenuOpened,
  handleChangeMenuVisability,
  onLogOut,
}) {
  const location = useLocation().pathname;
  const replaceData = {
    signIn: {
      replaceLink: "/sign-up",
      replaceText: "Регистрация",
    },
    signUp: {
      replaceLink: "/sign-in",
      replaceText: "Войти",
    },
    signOut: {
      replaceText: "Выйти",
    },
  };

  const onSignOut = () => {
    onLogOut();
  };

  let currentLocationData;

  if (location === "/sign-in") {
    currentLocationData = replaceData.signIn;
  } else if (location === "/sign-up") {
    currentLocationData = replaceData.signUp;
  } else if (location === "/home") {
    currentLocationData = replaceData.signOut;
  }

  const handleBurgerClick = () => {
    handleChangeMenuVisability();
  };

  return (
    <header className={`header ${isLoggedIn && additionalClass}`}>
      <Link to="/" className="header__link">
        <img src={logo} alt="Mesto Russia" className="logo" />
      </Link>
      {!isLoggedIn && location !== "/home" && (
        <Link
          to={currentLocationData?.replaceLink || ""}
          className="header__replace-link"
        >
          {currentLocationData?.replaceText || ""}
        </Link>
      )}
      {isLoggedIn && location === "/home" && (
        <>
          <div
            onClick={handleBurgerClick}
            className={`burger${isMenuOpened ? " burger_open" : ""}`}
          >
            <span className="burger-line"></span>
          </div>
          <div className="header__menu menu">
            <ul className="menu__list">
              <li className="menu__item">{userEmail}</li>
              <li className="menu__item menu__itme_grey" onClick={onSignOut}>
                {currentLocationData.replaceText}
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
