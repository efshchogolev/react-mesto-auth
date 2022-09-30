import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import api from "../utils/Api";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    return api.authorize(email, password).then((data) => {
      if (!data.token) {
        return Promise.reject("No data ");
      }
      localStorage.setItem("jwt", data.token);
      setLoggedIn(true);
    });
  };
  const handleLogout = () => {
    localStorage.setItem("jwt", null);
    setLoggedIn(false);
  };

  const handleRegister = (email, password) => {
    return api.register(email, password).then(() => {
      navigate("/sign-up");
    });
  };

  const handleTokenCheck = () => {
    if (!localStorage.getItem("jwt")) return;
    const jwt = localStorage.getItem("jwt");
    api.getContent(jwt).then((res) => {
      if (res) {
        const userEmail = res.data.email;
        setLoggedIn(true);
        setEmail(userEmail);
        navigate("/");
      }
    });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  // const handleSeccessPopupOpen = () => {
  //   setIsSuccessPopupOpen(true)
  // }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsDeletePopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (link) => {
    api
      .setUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    api
      .getUserInfoFromServer()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(
          data.map((item) => ({
            name: item.name,
            likes: item.likes,
            link: item.link,
            _id: item._id,
            owner: item.owner,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    navigate("/");
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(
        setCards((prevState) =>
          prevState.filter((item) => item._id !== card._id)
        )
      )
      .catch((err) => console.log(err));
  }

  const handleAddPlaceSubmit = (card) => {
    api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err));
  };

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route
              path="/"
              element={
                <>
                  <Header>
                    <div className="header__container">
                      <p className="header__email">{email}</p>
                      <p
                        className="header__text header__text_exit"
                        onClick={handleLogout}
                      >
                        Выйти
                      </p>
                    </div>
                  </Header>
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onCardClick={handleCardClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                  />
                  <Footer />
                  <EditProfilePopup
                    onUpdateUser={handleUpdateUser}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                  />
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddCard={handleAddPlaceSubmit}
                  />

                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                  />

                  <PopupWithForm
                    title="Вы уверены?"
                    name="delete"
                    buttonText="Да"
                    onClose={closeAllPopups}
                  />
                  <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </>
              }
            ></Route>
          </Route>

          <Route
            path="/sign-up"
            element={
              <>
                <Header>
                  <p className="header__text">
                    <Link to="/sign-in" className="header__link">
                      Войти
                    </Link>
                  </p>{" "}
                </Header>
                <Register onRegister={handleRegister} />
                <InfoTooltip />
                {/* text={} imgPath={} */}
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header>
                  <p className="header__text">
                    <Link to="/sign-up" className="header__link">
                      Зарегистрироваться
                    </Link>
                  </p>
                </Header>
                <Login onLogin={handleLogin} />
                <InfoTooltip />
              </>
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
