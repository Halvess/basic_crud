import './Button.css'

const Button = ({id, placeholder, type, isMenu, clickHandler}) => {
    let className = () => {
        if (isMenu){
            return 'btnMenu'
        }
        if (type == 'submit'){
            return 'btnSubmit'
        }
        if (type == 'reset'){
            return 'btnReset'
        }
    }
    return (
            <button className={className()} id={id} type={type} onClick={clickHandler}>{placeholder}</button>
    )
}

export default Button