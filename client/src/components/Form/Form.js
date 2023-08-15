import './Form.css'
import { useState, useEffect } from 'react'
import SelectCountries from '../SelectCountries/SelectCountries'
import Button from '../Button/Button'
import api from '../../api/api'

const Form = ({crud, countries, isLoading, setLoading}) => {

    const initialState = {name: '', age: 0, numcode: 4}
    const [formData, setFormData] = useState(initialState)
    const clearFields = () => {setFormData(prevState => {return {...initialState}})}
    useEffect(() => {console.log(formData)}, [formData])
    const addUser = async () => {
        await api.put('/users', formData)
        .then(response => {if (response.status == 200){
            console.log(response.data)
            setLoading(true)
        }
        if (response.status == 400){
            throw new Error(response.data)
        }})
        .catch(err => {console.log(err)})
    }
    const clickHandler = e => {
        e.preventDefault();
        console.log(e.target.id)
        if (e.target.id == 'submit'){
            clearFields()
            addUser()
        }
        if (e.target.id == 'reset'){
            clearFields()
        }
    }
    const changeFormData = (input, value) => {
        switch(input){
            case 'text': return setFormData(prevState => {return {...prevState, name: value}})
            case 'number': return setFormData(prevState => {return {...prevState, age: parseInt(value)}})
            case 'select': return setFormData(prevState => {return {...prevState, numcode: value}})
        }
    }

    let ageValue = formData.age == 0 || formData.age == NaN ? '' : formData.age
    return (
        <form className='baseMarginTop'>
            <div className='nameDiv'>
                <label htmlFor='name' name='name'>Name</label>
                <input onChange={e => {changeFormData('text', e.target.value)}} id='name' type='text' value={formData.name}/>                
            </div>
            <div className='formRow'>
                <div className='ageDiv'>
                    <label htmlFor='age' name='age'>Age</label>
                    <input onChange={e => {changeFormData('number', e.target.value)}} id='age' type='number' value={ageValue}/>
                </div>
                <div className='countryDiv'>
                    <label htmlFor='country' name='country'>Country</label>
                    <SelectCountries countries={countries} changeFormData={changeFormData}/>
                </div>
            </div>
            <div className='formRow'>
                    <Button id='submit' placeholder='Add User' type='submit' isMenu={false} clickHandler={clickHandler}/>
                    <Button id='reset' placeholder='Clear' type='reset' isMenu={false} clickHandler={clickHandler}/>
                </div>
        </form>
    )
}

/*                     <label htmlFor='country' name='country'>Country</label>
                    <select id='country' className='selectCountries'>
                    {countries.map(countryData => {
                        let name = countryData.name
                        let numcode = countryData.numcode
                        return <option key={`option-country-${numcode}`} value={numcode}>{name}</option>
                    })} 
                    </select> */

export default Form