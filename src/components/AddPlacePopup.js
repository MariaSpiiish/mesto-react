import { CardsContext } from "../contexts/CardsContext";
import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const card = useContext(CardsContext);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName(card.name);
        setLink(card.link);
    }, [card]); 
    
    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name,
            link
        })

        props.onClose();
    }

    return (
        <PopupWithForm title={'Новое место'} name={'place-edit'} buttonText={'Создать'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}> 
              <input 
                name="name"
                id="title-input"
                type="text"
                minLength="2"
                maxLength="30" 
                required
                placeholder="Название" 
                className="popup__input popup__input_type_place-title"
                onChange={(e) => {
                    return setName(e.target.value);
                }}
              />
              <span id="title-error" className="title-input-error popup__error"></span>
              <input 
                name="link"
                id="pic-link-input" 
                type="url" 
                required
                placeholder="Ссылка на картинку" 
                className="popup__input popup__input_type_pic-link"
                onChange={(e) => {
                return setLink(e.target.value);
                }}
              />
              <span id="pic-link-error" className="pic-link-input-error popup__error"></span>
            </PopupWithForm>
    )
}

export default AddPlacePopup;