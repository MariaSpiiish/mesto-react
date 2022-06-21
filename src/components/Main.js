function Main({onEditAvatar, onEditProfile, onAddPlace}) {
    

    return (
        <main className="content">
            <section className="profile">
              <div className="profile__avatar">
                <button type="button" className="profile__avatar-edit-button" onClick={onEditAvatar }></button>
                <img className="profile__avatar-pic" src="#" alt="Аватар пользователя"/>
              </div>
              <div className="profile__info">
                <h1 className="profile__title">Жак-Ив Кусто</h1>
                <button className="button profile__edit-button opacity" onClick={onEditProfile}></button>
                <p className="profile__subtitle">Исследователь океана</p>
              </div>
              <button type="button" className="profile__add-button opacity" onClick={onAddPlace}></button>
            </section>

            <section className="photo-grid">
              <ul className="photo-grid__items"></ul>
            </section>
        </main>
    );
}

export default Main;