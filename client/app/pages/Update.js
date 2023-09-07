import { useState, useEffect, useContext} from 'react'
import Context from '../components/Context'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Form from '../components/Form/Form'
import Text from '../components/Text/Text'

const Update = () => {
    const {countries, users, isLoading, setLoading} = useContext(Context)
    const updateInitialState = {id: -1, name: '', age: 0, numcode: -1}
    const [updateData, setUpdateData] = useState(updateInitialState)

    const clearUpdateData = () => {
        return setUpdateData(prevState => {return {...updateInitialState}})
    }

    const submitPlaceholder = 'Update user'
    const resetPlaceholder = 'Reset'
    const disclaimerText = `Click on a row at the table and then edit the user data in the form, then click on ${submitPlaceholder} to update its value. Click on ${resetPlaceholder} to clear all changes`
    const errorMessage = 'Please fill at least one field.'

    
    return (
        <div className='menuUpdate load'>
            <Header text='Update' />
            <Text className='disclaimer pagePadding baseMarginTop' content={disclaimerText} />
            <Form origin='update' updateData={updateData} clearUpdateData={clearUpdateData} countries={countries} setLoading={setLoading} submitPlaceholder={submitPlaceholder} resetPlaceholder={resetPlaceholder} errorMessage={errorMessage}/>
            {!isLoading
                ? <Table origin='update' className='largeMarginTop' countries={countries} users={users} updateSelected={updateData.id} setUpdateData={setUpdateData} clearUpdateData={clearUpdateData} isLoading={isLoading}/>
                : <Table origin='update' className='largeMarginTop' countries={countries} users={users} updateSelected={updateData.id} setUpdateData={setUpdateData} clearUpdateData={clearUpdateData} isLoading={isLoading}/>
            }
        </div>
    )
}

export default Update