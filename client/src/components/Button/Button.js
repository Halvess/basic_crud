import './Button.css'

const Button = ({id, className, placeholder, type, clickHandler, onMouseOver, onMouseOut, onAnimationEnd}) => {
    return (
            <button className={className} id={id} type={type} onClick={clickHandler} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onAnimationEnd={onAnimationEnd}>{placeholder} </button>
    )
}

export default Button