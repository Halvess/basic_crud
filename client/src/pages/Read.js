import {useState, useContext, useRef} from 'react'

import Context from '../components/Context'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Form from '../components/Form/Form'

const Read = () => {
    const {countries, users, isLoading, setLoading} = useContext(Context)
    let data = [JSON.stringify(users), isLoading]
    const [searching, setSearching] = useState(true)
    const [searchData, setSearchData] = useState([])

    return (
        <div className='menuRead load'>
            <Header text='Read' />
            <Form crud='read' countries={countries} setSearching={setSearching} setSearchData={setSearchData} submitPlaceholder='Search'/>
            {!searching ? <Table countries={countries} users={searchData} /> : <></>}
        </div>
    )
 }

export default Read