import { useEffect, useState } from 'react';
import { api } from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: ''});
  const [cards, setCards] = useState([]);


  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка в загрузке текущего пользователя: ${err}`);
      });
  }, []);

  useEffect(() => {
    api.getCards()
      .then((cardsData) => {
        
        setCards(cardsData.map((item) => ({
            
            _id: item._id,
            link: item.link,
            name: item.name,
            likes: item.likes,
            owner: item.owner
          })));
      })
      .catch((err) => {
        console.log(`Ошибка в загрузке данных карточек: ${err}`);
      });
  }, [])

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  const handleUpdateUser = (currentUser) => {
    api.patchUserInfo(currentUser)
      
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(`Ошибка в обновлении данных пользователя: ${err}`);
      });
  }

  const handleUpdateAvatar = (currentUser) => {
    api.patchUserAvatar(currentUser)
      .then((userAvatar) => {
        setCurrentUser(userAvatar)
      })
      .catch((err) => {
        console.log(`Ошибка в обновлении аватара пользователя: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page-container">
          <div className="page">
            <Header />
            <Main onEditAvatar={setIsEditAvatarPopupOpen} onEditProfile={setIsEditProfilePopupOpen} onAddPlace={setIsAddPlacePopupOpen} onCardClick={setSelectedCard} onCardLike={setCards} onCardDelete={setCards}/>
            
            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 

            <PopupWithForm title={'Новое место'} name={'place-edit'} buttonText={'Создать'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}> 
              <input 
                name="name"
                id="title-input"
                type="text"
                minLength="2"
                maxLength="30" 
                required
                placeholder="Название" 
                className="popup__input popup__input_type_place-title"
              />
              <span id="title-error" className="title-input-error popup__error"></span>
              <input 
                  name="link"
                  id="pic-link-input" 
                  type="url" 
                  required
                  placeholder="Ссылка на картинку" 
                  className="popup__input popup__input_type_pic-link"
              />
              <span id="pic-link-error" className="pic-link-input-error popup__error"></span>
            </PopupWithForm>

            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

            {/* 

            <div className="popup popup_type_trash">
              <div className="popup__trash-container">
                <button type="button" className="popup__close-button popup__close-button_type_trash"></button>
                <form name="trash" className="form trash-form" novalidate>
                  <h2 className="popup__title">Вы уверены?</h2>
                  <button type="submit" className="popup__submit-button popup__submit-button_type_trash opacity">Да</button>
                </form>
              </div>
            </div> */}
            
          </div>
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>  
  );
}

export default App;
