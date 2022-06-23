import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page-container">
      <div className="page">
        <Header />
        <Main onEditAvatar={setEditAvatarPopupOpen} onEditProfile={setEditProfilePopupOpen} onAddPlace={setAddPlacePopupOpen} onCardClick={setSelectedCard}/>
        
        <Footer />

        <PopupWithForm title={'Обновить аватар'} name={'avatar'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input 
              name="avatar"
              id="avatar-link-input" 
              type="url" 
              required
              placeholder="https://somewebsite.com/someimage.jpg" 
              className="popup__input popup__input_type_pic-link"
          />
          <span id="avatar-link-error" className="avatar-link-input-error popup__error"></span>
        </PopupWithForm>

        <PopupWithForm title={'Редактировать профиль'} name={'profile-edit'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}> 
          <input 
            name="name"
            id="name-input"
            type="text"
            minLength="2"
            maxLength="40"
            required
            placeholder="Имя" 
            className="popup__input popup__input_type_name"
          />
          <span id="name-error" className="name-input-error popup__error"></span>
          <input 
              name="about"
              id="job-input"
              type="text"
              minLength="2"
              maxLength="200"
              required
              placeholder="О себе" 
              className="popup__input popup__input_type_info"
          />
          <span id="job-error" className="job-input-error popup__error"></span>
        </PopupWithForm>

        <PopupWithForm title={'Новое место'} name={'place-edit'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}> 
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
  );
}

export default App;
