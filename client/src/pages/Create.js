import { useState, useEffect, useContext} from 'react'
import Context from '../components/Context'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'

const Create = () => {
    const {countries, users, isLoading, setLoading} = useContext(Context)

    return (
        <div className='menuCreate load'>
            <Header text='Create' />
            {!isLoading ? <Table countries={countries} users={users} /> : <></>}
        </div>
    )
}

export default Create