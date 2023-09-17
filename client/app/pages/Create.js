import { useState, useEffect, useContext} from 'react'
import Context from '../components/Context'
import translations from '../constants/translations.json'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Form from '../components/Form/Form'
import Text from '../components/Text/Text'

const Create = () => {
    const {language} = useContext(Context)
    const {submitPlaceholder, resetPlaceholder, disclaimerText, errorMessage} = translations[language]['create']
    return (
        <div className='menuCreate load'>
            <Header text='Create' />
            <Text className='disclaimer pagePadding baseMarginTop' content={disclaimerText} />
            <Form origin='create' submitPlaceholder={submitPlaceholder} resetPlaceholder={resetPlaceholder} errorMessage={errorMessage}/>
            <Table origin='create' className='largeMarginTop'/>
        </div>
    )
}

export default Create