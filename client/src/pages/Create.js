import { useState, useEffect, useContext} from 'react'
import Context from '../components/Context'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Form from '../components/Form/Form'

const Create = () => {
    const {countries, users, isLoading, setLoading} = useContext(Context)
    let data = [JSON.stringify(users), isLoading]
    return (
        <div className='menuCreate load'>
            <Header text='Create' />
            <Form origin='create' countries={countries} setLoading={setLoading}/>
            {!isLoading ? <Table origin='create' countries={countries} users={users} /> : <></>}
        </div>
    )
}

export default Create