import { useState, useEffect, useContext} from 'react'
import Context from '../components/Context'
import translations from '../constants/translations.json'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Form from '../components/Form/Form'
import Text from '../components/Text/Text'

const Update = () => {
    const {language} = useContext(Context)
    const updateInitialState = {id: -1, name: '', age: 0, numcode: -1}
    const [updateData, setUpdateData] = useState(updateInitialState)

    const clearUpdateData = () => {
        return setUpdateData(prevState => {return {...updateInitialState}})
    }

    const {submitPlaceholder, resetPlaceholder, disclaimerText} = translations[language]['update']
    
    return (
        <div className='menuUpdate load'>
            <Header text='Update' />
            <Text className='disclaimer pagePadding baseMarginTop' content={disclaimerText} />
            <Form origin='update' updateData={updateData} clearUpdateData={clearUpdateData} submitPlaceholder={submitPlaceholder} resetPlaceholder={resetPlaceholder}/>
            <Table origin='update' className='largeMarginTop' updateSelected={updateData.id} setUpdateData={setUpdateData} clearUpdateData={clearUpdateData}/>
        </div>
    )
}

export default Update