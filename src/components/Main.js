import {api} from '../utils/Api';
import { useEffect, useState, useContext } from 'react';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardsContext);
 

  function handleCardLike(card) {
   
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    if(!isLiked) {
      api.putLike(card._id)
        .then((newCard) => {
          onCardLike(stateCards => {
            return stateCards.map((c) => (
              c._id === card._id ? newCard : c
            ))
          })
        })
        .catch((err) => {
          console.log(`Ошибка в постановке лайка: ${err}`);
        });
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          onCardLike(stateCards => {
            return stateCards.map((c) => (
              c._id === card._id ? newCard : c
            ))
          })
        })
        .catch((err) => {
          console.log(`Ошибка в снятии лайка: ${err}`);
        });
    }
  }

  function handleCardDelete(card) {
      
      api.deleteCard(card, card._id)
        .then(() => {
          onCardDelete(cards.filter((c) => {
            return c.owner._id !== currentUser._id
          }))
        })
        .catch((err) => {
          console.log(`Ошибка в удалении карточки: ${err}`);
        });
  }
    
    return (
        <main className="content">
            <section className="profile">
              <div className="profile__avatar">
                <button type="button" className="profile__avatar-edit-button" onClick={onEditAvatar }></button>
                <img className="profile__avatar-pic" src={currentUser.avatar} alt='Аватар пользователя'/>
              </div>
              <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="button profile__edit-button opacity" onClick={onEditProfile}></button>
                <p className="profile__subtitle">{currentUser.about}</p>
              </div>
              <button type="button" className="profile__add-button opacity" onClick={onAddPlace}></button>
            </section>

            <section className="photo-grid">
              <ul className="photo-grid__items">
                {cards.map((card) => (
                  <Card 
                    key={card._id}
                    _id={card._id}
                    link={card.link} 
                    name={card.name} 
                    likes={card.likes}
                    owner={card.owner}
                    onCardClick={onCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    
                  />
                ))}
              </ul>
            </section>

        </main>
    );
}

export default Main;