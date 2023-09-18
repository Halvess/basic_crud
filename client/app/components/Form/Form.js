import './Form.css'
import { useState, useEffect, useContext } from 'react'
import Context from '../Context'
import SelectCountries from '../SelectCountries/SelectCountries'
import Button from '../Button/Button'
import Text from '../Text/Text'
import api from '../../api/api'
import { iterateObjToArray, capitalizeName } from '../../utility/utility'
import translations from '../../constants/translations.json'

const Form = ({origin, submitPlaceholder = 'Submit', resetPlaceholder = 'Clear', setSearching, setSearchData, updateData, errorMessage, clearUpdateData}) => {
    const initialState = {id: -1, name: '', age: 0, numcode: -1}
    const [formData, setFormData] = useState(initialState)
    const [hasError, setHasError] = useState(false)
    const {getUsers, setLoading, language} = useContext(Context)
    const {apiError} = translations[language]

    useEffect(() => {
        if (origin == 'update'){
            setFormData(updateData)
        }
    }, [updateData])

    const sameUpdateData = () => {
        if (origin !== 'update'){
            return false
        }
        const {name: formName, age: formAge, numcode: formNumcode} = formData
        const {name: updateName, age: updateAge, numcode: updateNumcode} = updateData
        return ((formName == updateName) && (formAge == updateAge) && (formNumcode == updateNumcode))
    }


    useEffect(() => {
        if (hasError){
            hasInputError()
        }
    }, [formData])

    const clearFields = () => {
        setFormData(prevState => {return {...initialState}})
    }

    const isDisabled = () => {
        if (origin == 'update'){
            return formData.numcode == -1
        }
 
    }

    let {name, age, numcode} = formData
    let nameError = name == ''
    let ageError = age == '' || age == NaN || age <= 0
    let numcodeError = numcode < 0  

    const hasInputError = (name = nameError, age = ageError, numcode = numcodeError) => {
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



    const addUser = async () => {
        setLoading(true)
        let capName = capitalizeName(formData.name)
        await api.put('/users', {...formData, name: capName})
        .then(response => {if (response.status == 200){
            getUsers()
        }
        else{
            throw new Error(response.data)
        }})
        .catch(err => {console.log(err); alert(apiError)})
    }

    const updateUser = async () => {
        if (sameUpdateData()){
            return null
        }
        setLoading(true)
        let capName = capitalizeName(formData.name)
        await api.patch('/users', {id: updateData.id, ...formData, name: capName})
        .then(response => {if (response.status == 200){
            clearUpdateData()
            getUsers()
        }
        else{
            throw new Error(response.data)
        }})
        .catch(err => {console.log(err); alert(apiError)})
    }

    const findUser = async () => {
        let {name, age, numcode} = formData
        let query = '?'
        if (name !== ''){
            let capName = capitalizeName(name)
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
            throw new Error(response.data)
        }})
        .catch(err => {console.log(err); alert(apiError)})

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
            case 'text':             
                return setFormData(prevState => {return {...prevState, name: value}});
            case 'number': 
                if (value == '') { 
                    return setFormData(prevState => {return {...prevState, age: 0}}) ;
                }
                return setFormData(prevState => {return {...prevState, age: parseInt(value)}})
            case 'select': 
                return setFormData(prevState => {return {...prevState, numcode: value}});
            default: return null;
    }

}

    const {name: labelName, age: labelAge, country: labelCountry} = translations[language]['labels']

    return (
        <form className='baseMarginTop pagePadding'>
            <div className='nameDiv'>
                <label htmlFor='name' name='name'>{labelName}</label>
                <input className={hasError && nameError ? 'inputError' : null} onChange={e => {changeFormData('text', e.target.value)}} id='name' type='text' value={formData.name} disabled={isDisabled()}/>                
            </div>
            <div className='formRow'>
                <div className='ageDiv'>
                    <label htmlFor='age' name='age'>{labelAge}</label>
                    <input className={hasError && ageError ? 'inputError' : null} onChange={e => {changeFormData('number', e.target.value)}} id='age' type='number' disabled={isDisabled()} value={formData.age == 0 || formData.age == NaN ? '' : formData.age}/>
                </div>
                <div className='countryDiv'>
                    <label htmlFor='country' name='country'>{labelCountry}</label>
                    <SelectCountries hasError={hasError && numcodeError} id='country' disabled={isDisabled()} value={formData.numcode} changeFormData={changeFormData}/>
                </div>
            </div>
            {hasError ? <Text content={errorMessage} className='error padgePadding' /> : null}
            <div className='formRow baseMarginTop'>
                    <Button id='reset' disabled={isDisabled()} className='btnReset' placeholder={resetPlaceholder} type='reset' isMenu={false} clickHandler={resetHandler}/>
                    <Button id='submit' disabled={isDisabled() || sameUpdateData()} className='btnSubmit' placeholder={submitPlaceholder} type='submit' isMenu={false} clickHandler={submitHandler}/>
            </div>
        </form>
    )
}

export default Form