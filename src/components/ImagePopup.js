function ImagePopup() {
    return (
        <div className="popup popup_type_image">
          <div className="popup__image-container">
            <button type="button" className="popup__close-button popup__close-button_type_image"></button>
            <img src="#" alt="Изображение" className="popup__image"/>
            <h2 className="popup__caption"></h2>
          </div>
        </div> 
    )
}

export default ImagePopup;