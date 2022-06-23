import {api} from '../utils/Api';
import { useEffect, useState } from 'react';
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);

      })
      .catch((err) => {
        console.log(`Ошибка в загрузке данных пользователя: ${err}`);
      });
  }, []);
  
  useEffect(() => {
    api.getCards()
      .then((data) => {
        setCards(data.map((item) => ({
          id: item._id,
          link: item.link,
          name: item.name,
          likes: item.likes.length,
        })));

      })
      .catch((err) => {
        console.log(`Ошибка в загрузке данных карточек: ${err}`);
      });
  }, []); 
  
    return (
        <main className="content">
            <section className="profile">
              <div className="profile__avatar">
                <button type="button" className="profile__avatar-edit-button" onClick={onEditAvatar }></button>
                <img className="profile__avatar-pic" src={userAvatar} alt='Аватар пользователя'/>
              </div>
              <div className="profile__info">
                <h1 className="profile__title">{userName}</h1>
                <button className="button profile__edit-button opacity" onClick={onEditProfile}></button>
                <p className="profile__subtitle">{userDescription}</p>
              </div>
              <button type="button" className="profile__add-button opacity" onClick={onAddPlace}></button>
            </section>

            <section className="photo-grid">
              <ul className="photo-grid__items">
                {cards.map((card) => (
                  <Card 
                    key={card.id}
                    link={card.link} 
                    name={card.name} 
                    likes={card.likes}
                    onCardClick={onCardClick}
                    
                  />
                ))}
              </ul>
            </section>

        </main>
    );
}

export default Main;