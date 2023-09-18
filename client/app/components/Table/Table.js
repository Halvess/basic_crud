import { useState, useMemo, useEffect, useRef, useContext } from 'react'
import Context from '../Context'
import './Table.css'
import Button from '../Button/Button'
import Text from '../Text/Text'
import translations from '../../constants/translations.json'

const Table = ({origin='', className, data, deleteData=[], updateSelected, setDeleteData, setUpdateData, clearUpdateData, elementsPerPage=10} ) => {
    const {users, countries, isLoading, language} = useContext(Context)
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
        if (users.length == 0 || countries.length == 0 || isLoading){
            let emptyPage = [];
            for (let i=0;i<elementsPerPage;i++){
                emptyPage.push(null)
            }
            return [[...emptyPage]]
        }
        let pageArr = []
        for (let i=0; i<maxPages; i++){
            let startIndex = i * elementsPerPage
            let endIndex = startIndex + elementsPerPage
            let dataArr = data ? data : users
            let userData = dataArr.slice(startIndex, endIndex)
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
    }, [users, data])

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
            if (isLoading){
                return  <tr className='emptyRow' key={`loading-${index}`}>
                            <td><p className='tableLoading'>null</p></td>
                            <td><p className='tableLoading'>null</p></td>
                            <td><p className='tableLoading'>null</p></td>
                        </tr>
            }
            if (user === null && index == 0){
                return  <tr key={'userLess'}><td className='userLess'>No users found in the database.</td></tr>
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

    const needPages = () => {
        if (data){
            return data.length > elementsPerPage
        }
        return users.length > elementsPerPage
    }

    const {name: labelName, age: labelAge, country: labelCountry} = translations[language]['labels']

    return (
        <>
        <table className={'pagePadding ' + className}>
            <thead>
                <tr>
                    <th onClick={() => {sortHandler('name')}} className='tableName'><div><span>{labelName}</span>{sortBy == 'name' && sortType !== '' ? sortArrow : ''}</div></th>
                    <th onClick={() => {sortHandler('age')}} className='tableAge'><div><span>{labelAge}</span>{sortBy == 'age' && sortType !== '' ? sortArrow : ''}</div></th>
                    <th onClick={() => {sortHandler('country')}} className='tableCountry'><div><span>{labelCountry}</span>{sortBy == 'country' && sortType !== '' ? sortArrow : ''}</div></th>
                </tr>
            </thead>
            <tbody className={pageTransition ? 'pageTransition' : null} onTransitionEnd={() => {setPageTransition(false)}}>
                 {tableData}
            </tbody>
        </table>
    {needPages() ?
        <div className='pageSelector pagePadding baseMarginTop'>
            <Button className={page == 0 ? 'btnPage hidden' : 'btnPage'}  clickHandler={previousPage} placeholder='previous' />
                <Text content={`page ${page+1}`} /> 
            <Button className={page+1 >= maxPages ? 'btnPage hidden' : 'btnPage'} clickHandler={nextPage} placeholder='next' />
        </div> : ''
    }        
        </>
    )

}
export default Table

