import {useState, useContext, useRef} from 'react'


import Context from '../components/Context'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Form from '../components/Form/Form'
import Text from '../components/Text/Text'

const Read = () => {
    const {countries, users, isLoading, setLoading} = useContext(Context)
    let data = [JSON.stringify(users), isLoading]
    const [searching, setSearching] = useState(true)
    const [searchData, setSearchData] = useState([])

    const submitPlaceholder = 'Find user'
    const resetPlaceholder = 'Clear'
    const disclaimerText = `Fill one or more fields and click ${submitPlaceholder} to search for a registered user. Click ${resetPlaceholder} in order to clear all fields.`
    const errorMessage = 'Please fill at least one field.'

    return (
        <div className='menuRead load'>
            <Header text='Read' />
            <Text className='disclaimer pagePadding baseMarginTop' content={disclaimerText} />
            <Form origin='read' countries={countries} setSearching={setSearching} setSearchData={setSearchData} submitPlaceholder={submitPlaceholder} resetPlaceholder={resetPlaceholder} errorMessage={errorMessage}/>
            {!searching ? <Table className='largeMarginTop' countries={countries} users={searchData} isLoading={isLoading}/> : <></>}
        </div>
    )
 }

export default Read