import './Form.css'
import { useState, useEffect } from 'react'
import SelectCountries from '../SelectCountries/SelectCountries'
import Button from '../Button/Button'
import Text from '../Text/Text'
import api from '../../api/api'
import { iterateObjToArray } from '../../utility/utility'

const Form = ({origin, countries, setLoading, submitPlaceholder = 'Submit', resetPlaceholder = 'Clear', setSearching, setSearchData, updateData, errorMessage, clearUpdateData}) => {
    const initialState = {name: '', age: 0, numcode: -1}
    const clearFields = () => {
        setFormData(prevState => {return {...initialState}})
    }
    const [formError, setFormError] = useState({name: true, age: true, numcode:true})
    const [formData, setFormData] = useState({...initialState})
    const [hasError, setHasError] = useState(false)

    const isDisabled = () => {
        return origin == 'update' && formData.numcode == -1
    }

    useEffect(() => {
        if (origin == 'update'){
            setFormData(prevState => {
                return {...prevState, name: updateData.name, age: updateData.age, numcode: updateData.numcode}
            })
        }
    }, [updateData])

    useEffect(() => {
        let {name, age, numcode} = formData
        if (name == ''){
            setFormError(prevState => {return {...prevState, name: true}})
        }
        else{
            setFormError(prevState => {return {...prevState, name: false}})
        }
        if (age == 0 || age == ''){
            setFormError(prevState => {return {...prevState, age: true}})
        }
        else{
            setFormError(prevState => {return {...prevState, age: false}})
        }
        if (numcode < 0 ){
            setFormError(prevState => {return {...prevState, numcode: true}})
        }
        else{
            setFormError(prevState => {return {...prevState, numcode: false}})
        }
    }, [formData])

    useEffect(() => {
        let {name, age, numcode} = formError
        if ((!name && !age && !numcode) && origin == 'create'){
            return setHasError(false)
        }
        if ((!name || !age || !numcode) && origin == 'read'){
            return setHasError(false)
        }
    }, [formError.name, formError.age, formError.numcode])

    const hasInputError = () => {
        const {name, age, numcode} = formError   
        if (origin == 'create'){
            if (name || age || numcode){
                return true
            }
        }
        if (origin == 'read'){
            if (name && age && numcode){
                return true
            }
        }
        if (origin == 'update'){
            if (name && age && numcode){
                return true
            }
        }
        setHasError(false)
        return false
    }

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
            setLoading(true)
        }
        else{
            throw new Error(response.data[0])
        }})
        .catch(err => {console.log(err)})
    }

    const updateUser = async () => {
        let capName = capitalizeName()
        await api.patch('/users', {id: updateData.id, ...formData, name: capName})
        .then(response => {if (response.status == 200){
            clearUpdateData()
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
        if (name !== ''){
            let capName = capitalizeName()
            query += `name=${capName}`
        }
        if (age > 0){
            if (name){
                query+='&'
            }
            query += `age=${age}`
        }
        if (numcode >= 0){
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

    const submitHandler = e => {
        e.preventDefault();
        if (isDisabled()){
            return null
        }
        if (hasInputError()){
            setHasError(true)
            return null
        }
        clearFields()
        switch(origin){
            case 'create': addUser(); break;
            case 'read': findUser(); break; 
            case 'update': updateUser(); break; 
            default: null; break;
        }
    }

    const resetHandler = e => {
        if (origin == 'update'){
            clearUpdateData()
        }
        setHasError(false)
        return clearFields()
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
                <input className={hasError && formError.name ? 'inputError' : null} onChange={e => {changeFormData('text', e.target.value)}} id='name' type='text' value={formData.name} disabled={isDisabled()}/>                
            </div>
            <div className='formRow'>
                <div className='ageDiv'>
                    <label htmlFor='age' name='age'>Age</label>
                    <input className={hasError && formError.age ? 'inputError' : null} onChange={e => {changeFormData('number', e.target.value)}} id='age' type='number' disabled={isDisabled()} value={formData.age == 0 || formData.age == NaN ? '' : formData.age}/>
                </div>
                <div className='countryDiv'>
                    <label htmlFor='country' name='country'>Country</label>
                    <SelectCountries hasError={hasError && formError.numcode} id='country' countries={countries} disabled={isDisabled()} value={formData.numcode} changeFormData={changeFormData}/>
                </div>
            </div>
            {hasError ? <Text content={errorMessage} className='error padgePadding' /> : null}
            <div className='formRow baseMarginTop'>
                    <Button id='reset' disabled={isDisabled()} className='btnReset' placeholder={resetPlaceholder} type='reset' isMenu={false} clickHandler={resetHandler}/>
                    <Button id='submit' disabled={isDisabled()} className='btnSubmit' placeholder={submitPlaceholder} type='submit' isMenu={false} clickHandler={submitHandler}/>
            </div>
        </form>
    )
}

export default Form