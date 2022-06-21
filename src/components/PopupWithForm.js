function PopupWithForm({title, name, children, isOpen, onClose}) {
    return (
        <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form name={name} className={`form ${name}-form`} noValidate>
                    {children}
                    <button type="submit" className="popup__submit-button opacity">Да</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
