function Card(props) {
    const handleCardClick = () => {
        props.onCardClick(props);
    }

    return (
    <li className="card">
        <img 
            src={props.link} 
            alt={props.name} 
            className="card__image" 
            onClick={handleCardClick}
        />
        <button type="button" className="card__trash opacity"></button>
        <div className="card__caption">
            <h2 className="card__title">{props.name}</h2>
            <div className="card__like-area">
            <button type="button" className="card__like opacity"></button>
            <span className="card__like-count">{props.likes}</span>
            </div>
        </div>
    </li>
    )
}

export default Card;