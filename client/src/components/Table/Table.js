import { useState, useMemo, useEffect, useRef } from 'react'
import './Table.css'
import Button from '../Button/Button'

const Table = ({origin='', className, countries=[], users=[], deleteData=[], updateSelected, setDeleteData, setUpdateData, clearUpdateData, elementsPerPage=10} ) => {
    const [tableSort, setTableSort] = useState({sortBy: '', sortType: ''})

    const [pageTransition, setPageTransition] = useState(false)
    const [page, setPage] = useState(0)
    const maxPages = Math.ceil(users.length / elementsPerPage)

    const handleTableMouseOver = e => {
        if (origin !== 'update' || origin !== 'delete'){
            return null
        }
        if (e.currentTarget.className == 'rowSelected'){
            return null
        }
        return e.currentTarget.className = 'tableHover'
    }
    const handleTableMouseOut = e => {
        if (origin == 'modal'){
            return null
        }
        return e.currentTarget.className = (e.currentTarget.className).replace('tableHover', '')
    }

    const handleOrigin = user => {
        let {id, name, age, numcode} = user
        let newState
        if (origin == 'delete'){
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
        if (origin == 'update'){
            if (checkSelected(id)){
                return clearUpdateData()
            }
                let newState = {id: id, name: name, age: age, numcode: numcode}
                return setUpdateData(prevState => {return {...newState}})
        }
        return null
    }

    useEffect(() => {console.log(updateSelected), [updateSelected]})

    const checkSelected = id => {
        if (origin == 'delete'){
            if (deleteData.length == 0){
                return false
            }
            return deleteData.includes(id)
        }
        if (origin == 'update'){
            return id === updateSelected
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
        if (users.length == 0 || countries.length == 0){
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
            return  <tr onClick={() => {handleOrigin(user)}}
                        className={checkSelected(user.id) ? 'rowSelected' : null}
                        onMouseOver={handleTableMouseOver}
                        onMouseOut={handleTableMouseOut}
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
        <table className={'pagePadding ' + className}>
            <thead>
                <tr>
                    <th onClick={() => {sortHandler('name')}} className='tableName'><div><span>name</span>{sortBy == 'name' && sortType !== '' ? sortArrow : ''}</div></th>
                    <th onClick={() => {sortHandler('age')}} className='tableAge'><div><span>age</span>{sortBy == 'age' && sortType !== '' ? sortArrow : ''}</div></th>
                    <th onClick={() => {sortHandler('country')}} className='tableCountry'><div><span>country</span>{sortBy == 'country' && sortType !== '' ? sortArrow : ''}</div></th>
                </tr>
            </thead>
            <tbody className={pageTransition ? 'pageTransition' : null} onTransitionEnd={() => {setPageTransition(false)}}>
                {tableData}
            </tbody>
        </table>
    {users.length > elementsPerPage ?
        <div className='pageSelector pagePadding baseMarginTop'>
            <Button className={page == 0 ? 'btnPage hidden' : 'btnPage'}  clickHandler={previousPage} placeholder='previous' />
                <p> {`page ${page+1}`} </p>
            <Button className={page+1 >= maxPages ? 'btnPage hidden' : 'btnPage'} clickHandler={nextPage} placeholder='next' />
        </div> : ''
    }        
        </>
    )

}

export default Table

