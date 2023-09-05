import { useState, useEffect, useContext} from 'react'
import Context from '../components/Context'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Form from '../components/Form/Form'
import Text from '../components/Text/Text'

const Create = () => {
    const {countries, users, isLoading, setLoading} = useContext(Context)
    let data = [JSON.stringify(users), isLoading]
    const submitPlaceholder = 'Add user'
    const resetPlaceholder = 'Clear'
    const disclaimerText = `Fill all fields and click ${submitPlaceholder} to add a new user. Click ${resetPlaceholder} clear all fields.`
    const errorMessage = 'Please fill all fields.'
    return (
        <div className='menuCreate load'>
            <Header text='Create' />
            <Text className='disclaimer pagePadding baseMarginTop' content={disclaimerText} />
            <Form origin='create' countries={countries} submitPlaceholder={submitPlaceholder} resetPlaceholder={resetPlaceholder} setLoading={setLoading} errorMessage={errorMessage}/>
            {!isLoading ? <Table origin='create' className='largeMarginTop' countries={countries} users={users}/> : <></>}
        </div>
    )
}

export default Create