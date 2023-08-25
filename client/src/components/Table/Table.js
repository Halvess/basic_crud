import { useState, useMemo, useEffect, useRef } from 'react'
import './Table.css'
import Button from '../Button/Button'

const Table = ( {crud, countries, users, setUpdate, deleteData, setDeleteData} ) => {
    const [tableSort, setTableSort] = useState({sortBy: '', sortType: ''})

    const updateInitialState = {id: 0, name: '', age: 0, numcode: 0}
    const [updateSelected, setUpdateSelected] = useState({id: 0, name: '', age: 0, numcode: 0})

    const [pageTransition, setPageTransition] = useState(false)
    const [page, setPage] = useState(0)
    const elementsPerPage = 5
    const maxPages = Math.ceil(users.length / elementsPerPage)

    const handleCrud = user => {
        let {id, name, age, numcode} = user
        let newState
        if (crud == 'delete'){
            if (checkSelected(id)){
                newState = deleteData
                let indexOfId = newState.indexOf(id)
                let deletedId = newState.splice(indexOfId, 1)
                return setDeleteData(prevState => {return [...newState]})
            }
            newState = deleteData
            newState.push(id)
            return setDeleteData(prevState=>{return [...newState]})
        }
        if (crud == 'update'){
            if (checkSelected(id)){
                return setUpdateSelected(prevState => {return {...updateInitialState}})
            }
                let newState = {id: id, name: name, age: age, numcode: numcode}
                return setUpdateSelected(prevState=>{return {...newState}})
        }
        return null
    }
    const checkSelected = id => {
        if (deleteData.length == 0){
            return false
        }
        if (crud == 'delete'){
            return deleteData.includes(id)
        }
        if (crud == 'update'){
            return id === updateSelected.id
        }
        return false
    }

    const sortHandler = (source) => {
        let newSort = ''
        if (tableSort.sortBy !== source){
            newSort = 'asc'
            return setTableSort(prevState => {return {...prevState, sortBy: source, sortType: newSort}})
        }
        switch (tableSort.sortType){
            case '': newSort = 'asc'; break;
            case 'asc': newSort = 'desc'; break;
            case 'desc': newSort = ''; break;
            default: newSort = ''; break;
        }
        setTableSort(prevState => {return {...prevState, sortBy: source, sortType: newSort}})
    }

    const getCountryStr = (code) => {
        let countryFilter = countries.filter(countryObj => {return countryObj.numcode == code})[0]
        let countryStr = countryFilter.name
        return countryStr
    }

    const sortCompareFn = (a,b) => {
        let {sortBy, sortType} = tableSort
        let orderFactor = 0
        if (sortType == 'asc') {orderFactor = 1}
        if (sortType == 'desc') {orderFactor = -1}
        if (a == null || b == null){
            return 0   
        }
        if (sortBy == 'name' || sortBy == 'country'){
            return a[sortBy].localeCompare(b[sortBy]) * orderFactor
        }
        else{
            if (a[sortBy] > b[sortBy]){
                return 1 * orderFactor
            }
            if (a[sortBy] < b[sortBy]){
                return -1 * orderFactor
            }
        }
        return 0
    }

    let dataPerPage = useMemo(() => {
        if (users.length == 0){
            let emptyPage = [];
            for (let i=0;i<elementsPerPage;i++){
                emptyPage.push(null)
            }
            return [['noUser', ...emptyPage]]
        }
        let pageArr = []
        for (let i=0; i<maxPages; i++){
            let startIndex = i * elementsPerPage
            let endIndex = startIndex + elementsPerPage
            let userData = users.slice(startIndex, endIndex)
            .map(user => {
                return {
                    ...user,
                    country: getCountryStr(user.numcode)
                }
            })

            if (userData.length < elementsPerPage){
                let difference = elementsPerPage - userData.length
                for (let j=0; j<difference; j++){
                    userData.push(null)
                }
            }
            pageArr.push(userData)
        }
        return pageArr
    }, [users])

    let tableData = []

    const prevPage = useRef(page)
    useEffect(() => {
        prevPage.current = page
    }, [page])

    if (dataPerPage.length !== 0){
        let pageData = [...dataPerPage[page]]
        if (pageTransition){
            pageData = [...dataPerPage[prevPage.current]]
        }
        if (tableSort.sortType !== ''){
            pageData.sort(sortCompareFn)
        }
        tableData = pageData.map((user, index) => {
            if (user === 'noUser'){
                return  <tr key={'userLess'}><td className='userLess'>No users found on the database.</td></tr>
            }
            if (user === null){
                return      <tr className='emptyRow' key={`emptyRow-${index}-page-${page+1}`}>
                                <td>null</td>
                                <td>null</td>
                                <td>null</td>
                            </tr>
            }
            return  <tr onClick={() => {handleCrud(user)}}
                        className={checkSelected(user.id) ? 'rowSelected' : crud == 'delete' || crud == 'update' ? 'rowHover' : ''}
                        key={`row-${index}-page-${page+1}`}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.country}</td>
                    </tr>
        })
    }
              

    const nextPage = () => {
        if (page === maxPages - 1) {return null}
        setPageTransition(true)
        setPage(prevState => {return prevState+1})
    }
    const previousPage = () => {
        if (page === 0) {return null}
        setPageTransition(true)
        setPage(prevState => {return prevState-1})
    }

    let {sortBy, sortType} = tableSort
    let sortArrow = <span className={`sort-${sortType}`}></span>

    return (
        <>
        <table className='pagePadding baseMarginTop'>
            <thead>
                <tr>
                    <th onClick={() => {sortHandler('name')}} className='tableName'><div><span>name</span>{sortBy == 'name' && sortType !== '' ? sortArrow : ''}</div></th>
                    <th onClick={() => {sortHandler('age')}} className='tableAge'><div><span>age</span>{sortBy == 'age' && sortType !== '' ? sortArrow : ''}</div></th>
                    <th onClick={() => {sortHandler('country')}} className='tableCountry'><div><span>country</span>{sortBy == 'country' && sortType !== '' ? sortArrow : ''}</div></th>
                </tr>
            </thead>
            <tbody className={pageTransition ? 'pageTransition' : ''} onTransitionEnd={() => {setPageTransition(false)}}>
                {tableData}
            </tbody>
        </table>
    {users.length > elementsPerPage ?
        <div className='pageSelector baseMarginTop'>
            <Button className='btnPage' clickHandler={previousPage} placeholder='previous' />
                <p> {`page ${page+1}`} </p>
            <Button className='btnPage' clickHandler={nextPage} placeholder='next' />
        </div> : ''
    }        
        </>
    )

}

export default Table

