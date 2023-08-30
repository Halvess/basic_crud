import './Form.css'
import { useState, useEffect } from 'react'
import SelectCountries from '../SelectCountries/SelectCountries'
import Button from '../Button/Button'
import api from '../../api/api'
import { iterateObjToArray } from '../../utility/utility'

const Form = ({origin, countries, setLoading, submitPlaceholder, resetPlaceholder, setSearching, setSearchData}) => {
    const initialState = {name: '', age: 0, numcode: 0}
    const clearFields = () => {setFormData(prevState => {return {...initialState}})}
    const [formData, setFormData] = useState(initialState)
    useEffect(() => {console.log(formData)}, [formData])

    const capitalizeName = (name = formData.name) => {
        let nameStr = name
        let nameArr = nameStr.split(' ')
        nameArr = nameArr.map(str => {
            if (str == 'de' || str == 'dos' || str == 'e' || str == 'da'){
                return str
            }
            return str.charAt(0).toUpperCase() + str.slice(1)
        })
        nameStr = nameArr.join(' ')
        return nameStr
    }

    const addUser = async () => {
        let capName = capitalizeName()
        await api.put('/users', {...formData, name: capName})
        .then(response => {if (response.status == 200){
            console.log(response.data)
            setLoading(true)
        }
        else{
            throw new Error(response.data[0])
        }})
        .catch(err => {console.log(err)})
    }

    const findUser = async () => {
        let {name, age, numcode} = formData
        let query = '?'
        if (name){
            let capName = capitalizeName()
            query += `name=${capName}`
        }
        if (age){
            if (name){
                query+='&'
            }
            query += `age=${age}`
        }
        if (numcode){
            if (name || age){
                query += '&'
            }
            query += `numcode=${numcode}`
        }
        query = encodeURI(query)
        await api.get(`/users${query}`)
        .then(res => {if (res.status === 200){
                let data = iterateObjToArray(res.data)
                setSearchData(prevState => {return [...data]})
                setSearching(false)
        }
        else{
            throw new Error(response.data[0])
        }})
        .catch(err => {console.log(err)})

    }

    const clickHandler = e => {
        e.preventDefault();
        if (e.target.id == 'submit'){
            clearFields()
            switch(origin){
                case 'create': addUser(); break;
                case 'read': findUser(); break; 
                default: console.log('default'); break;
            }
            
            
        }
        if (e.target.id == 'reset'){
            clearFields()
        }
    }
    const changeFormData = (input, value) => {
        switch(input){
            case 'text': return setFormData(prevState => {return {...prevState, name: value}})
            case 'number': 
                if (value == '') { 
                    return setFormData(prevState => {return {...prevState, age: 0}}) 
                }
                    return setFormData(prevState => {return {...prevState, age: parseInt(value)}})
            case 'select': return setFormData(prevState => {return {...prevState, numcode: value}})
        }
    }
    return (
        <form className='baseMarginTop pagePadding'>
            <div className='nameDiv'>
                <label htmlFor='name' name='name'>Name</label>
                <input onChange={e => {changeFormData('text', e.target.value)}} id='name' type='text' value={formData.name}/>                
            </div>
            <div className='formRow'>
                <div className='ageDiv'>
                    <label htmlFor='age' name='age'>Age</label>
                    <input onChange={e => {changeFormData('number', e.target.value)}} id='age' type='number' value={formData.age == 0 || formData.age == NaN ? '' : formData.age}/>
                </div>
                <div className='countryDiv'>
                    <label htmlFor='country' name='country'>Country</label>
                    <SelectCountries id='country' countries={countries} changeFormData={changeFormData}/>
                </div>
            </div>
            <div className='formRow'>
                    <Button id='submit' placeholder='Submit' type='submit' isMenu={false} clickHandler={clickHandler}/>
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