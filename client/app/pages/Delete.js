import {useState, useContext, useEffect} from 'react'

import Context from '../components/Context'

import Header from '../components/Header/Header'
import Table from '../components/Table/Table'
import Button from '../components/Button/Button'
import Modal from '../components/Modal/Modal'
import api from '../api/api'
import Text from '../components/Text/Text'
import translations from '../constants/translations.json'


const Delete  = () => {
    const {users, getUsers, language, setLoading} = useContext(Context)
    const [deleteData, setDeleteData] = useState([])
    const [showModal, setModal] = useState(false)

    let modalTableArr = []
    if (deleteData.length !== 0){
        deleteData.forEach(id => {
            let user = users.filter(element => {return element.id == id})
            modalTableArr = [...modalTableArr, ...user]
        })
    }

    let modalTable = <Table origin='modal' className='baseMarginTop' elementsPerPage={8} data={deleteData.length !== 0 ? modalTableArr: []}/>

    const deleteItems = async () => {
        if (deleteData.length !== 0){
            setLoading(true)
            let intId = deleteData.map(id => {return parseInt(id)})
            let deleteJSON = {
                id: intId
            }
            await api.delete('/users', {data: deleteJSON})
            .then(res => {if (res.status == 200){
                setDeleteData(prevState => {return []})
                getUsers()
            }
            else{
                throw new Error(res.data)
            }})
            .catch(err => {console.log(err)})
        }
    }


    const submitHandler = e => {
        if (deleteData.length !== 0){
            return setModal(true)
        }
    }
    const resetHandler = e => {
        setDeleteData([])
    }
    
    const {submitPlaceholder, resetPlaceholder, disclaimerText} = translations[language]['delete']

    return (
        <div className='menuDelete load'>
            {showModal ? <Modal origin='delete' title={'Confirm Deletion'} show={showModal} children={modalTable} message={modalMessage} confirmFn={() => {deleteItems()}} closeModal={()=>{setModal(false)}}/> : null}
            <Header text='Delete' />
            <Text content={disclaimerText} className='disclaimer baseMarginTop pagePadding'/>
            <Table origin='delete' className='baseMarginTop' deleteData={deleteData} setDeleteData={setDeleteData}/>
            <div className='formRow largeMarginTop'>
                    <Button disabled={deleteData.length == 0 ? true : false} id='submit' className='btnDelete' placeholder={submitPlaceholder} type='submit' clickHandler={submitHandler}/>
                    <Button disabled={deleteData.length == 0 ? true : false} id='reset' className='btnDelete' placeholder={resetPlaceholder} type='reset' clickHandler={resetHandler}/>
            </div>
        </div>
    )
}
export default Delete