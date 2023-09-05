import './Button.css'

const Button = ({id, className, placeholder, type, clickHandler, onMouseOver, onMouseOut, disabled}) => {
    return (
            <button disabled={disabled ? 'disabled' : ''} className={className} id={id} type={type} onClick={clickHandler} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>{placeholder}</button>
    )
}

export default Button