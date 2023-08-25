import {useState, useContext, useEffect} from 'react'

import Context from '../components/Context'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Button from '../components/Button/Button'
import api from '../api/api'


const Delete  = () => {
    const {countries, users, isLoading, setLoading} = useContext(Context)
    const [deleteData, setDeleteData] = useState([])

    const clickHandler = async e => {
        e.preventDefault()
        if (e.target.id == 'submit'){
            if (deleteData.length !== 0){
                let intId = deleteData.map(id => {return parseInt(id)})
                let deleteJSON = {
                    id: intId
                }
                await api.delete('/users', {data: deleteJSON})
                .then(res => {if (res.status == 200){
                    console.log(res.data)
                    return setLoading(true)
                }
                else{
                    throw new Error(res.data)
                }})
                .catch(err => {console.log(err)})

            }
        }
        if (e.target.id == 'reset'){
            setDeleteData(prevState => {return []})
        }
    }

    useEffect(() => {console.log(deleteData), []})

    return (
        <div className='menuDelete load'>
            <Header text='Delete' />
            {!isLoading ? <Table crud='delete' countries={countries} users={users} deleteData={deleteData} setDeleteData={setDeleteData}/> : <></>}
            <div className='formRow'>
                    <Button id='submit' className='btnDelete' placeholder='Delete users' type='submit' clickHandler={clickHandler}/>
                    <Button id='reset' className='btnDelete' placeholder='Cancel' type='reset' clickHandler={clickHandler}/>
            </div>
        </div>
    )
}
export default Delete