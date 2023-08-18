import './Button.css'

const Button = ({id, className, placeholder, type, clickHandler}) => {
    return (
            <button className={className} id={id} type={type} onClick={clickHandler}>{placeholder}</button>
    )
}

export default Button