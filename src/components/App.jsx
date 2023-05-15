import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ApiRequestLoadingContext } from "../contexts/ApiRequestLoadingContext";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/Api";
import Popups from "./Popups/Popups";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ProtectedRouteElement from "./ProtectedRoute/ProtectedRoute";

function App() {
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState("");

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessStatus, setAccessStatus] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  function setAdditionalClass() {
    return `translate-block${isMenuOpened ? " translate-block_active" : ""}`;
  }

  function handleChangeLoggedInState(bool) {
    setLoggedIn(bool);
  }

  function handleChangeMenuVisability() {
    setIsMenuOpened(!isMenuOpened);
  }

  function handleSetEmail(email) {
    setUserEmail(email);
  }

  function changeAccessStatus(bool) {
    setAccessStatus(bool);
  }

  function handleLikeCard(card) {
    const isLiked = card.likes.some((human) => human._id === currentUser._id);

    api
      .toggleLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
        );
      })
      .catch((error) => console.log(error));
  }

  function handleDeleteCard(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(requestObj) {
    setIsLoading(true);
    api
      .setUserInfo(requestObj)
      .then((updateProfileData) => {
        setCurrentUser(updateProfileData);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(requestObj) {
    setIsLoading(true);
    api
      .postAvatar(requestObj)
      .then((updateProfileData) => {
        setCurrentUser(updateProfileData);
        closeAllPopups();
      })

      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlace(requestObj) {
    setIsLoading(true);
    api
      .postNewCard(requestObj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => setIsLoading(false));
  }

  function handleAvatarClick() {
    return setIsEditAvatarPopupOpen(true);
  }

  function handleChangeTooltipVisability(bool) {
    return setIsInfoTooltipOpen(bool);
  }

  function handleEditProfileClick() {
    return setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    return setIsAddPlacePopupOpen(true);
  }

  function handleTrashBagClick(currentCardId) {
    setIsConfirmPopupOpen(true);
    setCardId(currentCardId);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const isPopupOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isConfirmPopupOpen ||
    isImagePopupOpen ||
    isInfoTooltipOpen;

  useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isPopupOpen) {
      document.addEventListener("keydown", closeByEsc);
    }
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [isPopupOpen]);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setTimeout(() => {
      setSelectedCard({});
    }, 500);
  }

  useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getProfileData()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      setIsMenuOpened(false);
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          additionalClass={setAdditionalClass()}
          isLoggedIn={loggedIn}
          userEmail={userEmail}
          isMenuOpened={isMenuOpened}
          handleChangeMenuVisability={handleChangeMenuVisability}
          onLogOut={handleLogOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="sign-in" replace />
              )
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onCardLike={handleLikeCard}
                onEditAvatar={handleAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
                onTrashBagClick={handleTrashBagClick}
                onCardClick={handleCardClick}
                card={selectedCard}
                additionalClass={setAdditionalClass()}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                changeTooltipVisability={handleChangeTooltipVisability}
                changeAccessStatus={changeAccessStatus}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleChangeLoggedInState={handleChangeLoggedInState}
                handleSetEmail={handleSetEmail}
                changeTooltipVisability={handleChangeTooltipVisability}
                changeAccessStatus={changeAccessStatus}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {loggedIn && <Footer additionalClass={setAdditionalClass()} />}
        <ApiRequestLoadingContext.Provider value={isLoading}>
          <Popups
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            isConfirmPopupOpen={isConfirmPopupOpen}
            isImagePopupOpen={isImagePopupOpen}
            isInfoTooltipOpen={isInfoTooltipOpen}
            closeAllPopups={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onUpdateUser={handleUpdateUser}
            onAddPlace={handleAddPlace}
            onDeleteCard={handleDeleteCard}
            currentCardId={cardId}
            selectedCard={selectedCard}
            accessStatus={accessStatus}
          />
        </ApiRequestLoadingContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
