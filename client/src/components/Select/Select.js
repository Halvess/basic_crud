import './Select.css'
import {useState, useRef, useEffect} from 'react'

const Select = ({countries}) => {
    const [isOpen, setOpen] = useState(false)
    const [value, setValue] = useState(0)
    return (
        <div>
            <label htmlFor='country' name='country'>Country</label>
            <ul className='selectCountries' id='country'>
                <li>{value}</li>
                    {isOpen? 
                        <div className='optionList'>
                            {countries.map(country => {
                        return <li className='option' key={`${country.name}-${country.numcode}`}>{country.name}</li>   
                    })} </div> : ''}
            </ul>
        </div>

    )
}

export default Select