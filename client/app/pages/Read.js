import {useState, useContext, useRef} from 'react'


import Context from '../components/Context'
import translations from '../constants/translations.json'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Form from '../components/Form/Form'
import Text from '../components/Text/Text'

const Read = () => {
    const {language} = useContext(Context)
    const [searching, setSearching] = useState(true)
    const [searchData, setSearchData] = useState([])

    const {submitPlaceholder, resetPlaceholder, disclaimerText, errorMessage} = translations[language]['read']

    return (
        <div className='menuRead load'>
            <Header text='Read' />
            <Text className='disclaimer pagePadding baseMarginTop' content={disclaimerText} />
            <Form origin='read' setSearching={setSearching} setSearchData={setSearchData} submitPlaceholder={submitPlaceholder} resetPlaceholder={resetPlaceholder} errorMessage={errorMessage}/>
            {!searching ? <Table origin='read' className='largeMarginTop' data={searchData}/> : <></>}
        </div>
    )
 }

export default Read