import './Button.css'
import Context from '../Context'
import { useContext } from 'react'

const Button = ({id, className, placeholder, type, clickHandler, onMouseOver, onMouseOut, disabled=false}) => {
    const {isLoading} = useContext(Context)
    const btnLoader = <div className='loaderWrapper'><span className='loader'></span></div>
    return (
            <button disabled={disabled || isLoading? 'disabled' : ''} className={className} id={id} type={type} onClick={clickHandler} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>{isLoading && type == 'submit' ? btnLoader: placeholder}</button>
    )
}

export default Button