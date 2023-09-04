import { useState, useEffect, useContext} from 'react'
import Context from '../components/Context'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Form from '../components/Form/Form'

const Update = () => {
    const {countries, users, isLoading, setLoading} = useContext(Context)
    const updateInitialState = {id: 0, name: '', age: 0, numcode: -1}
    const [updateData, setUpdateData] = useState(updateInitialState)

    const clearUpdateData = () => {
        return setUpdateData(prevState => {return {...updateInitialState}})
    }

    useEffect(() => {console.log(updateData)}, [updateData])

    let data = [JSON.stringify(users), isLoading]
    return (
        <div className='menuUpdate load'>
            <Header text='Update' />
            <Form origin='update' updateData={updateData} countries={countries} setLoading={setLoading} submitPlaceholder={'Update user'} resetPlaceholder={'Revert'}/>
            {!isLoading ? <Table origin='update' countries={countries} users={users} setUpdateData={setUpdateData} clearUpdateData={clearUpdateData}/> : <></>}
        </div>
    )
}

export default Update