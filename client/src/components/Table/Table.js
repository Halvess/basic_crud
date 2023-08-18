import { useState, useEffect } from 'react'
import './Table.css'
import Button from '../Button/Button'

const Table = ( {countries, users} ) => {
    const [pageTransition, setPageTransition] = useState(false)
    const [page, setPage] = useState(0)
    const elementsPerPage = 5
    const maxPages = Math.floor(users.length / elementsPerPage)

    const getCountryStr = (code) => {
        let countryFilter = countries.filter(countryObj => {return countryObj.numcode == code})[0]
        let countryStr = countryFilter.name
        return countryStr
    }

    let emptyRows = (amount = elementsPerPage) =>{
        let rowsArr = []
        for (let i=0; i<amount; i++){
            rowsArr.push(
                <tr className='emptyRow' key={`empty-row-${i}`}>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                </tr>)
        }
        return rowsArr
    }

    const getTableData = () => {
        return users.map((user, index) => {
            let row = <tr key={`table-row-${index}`}>
                            <td>{user.name}</td>
                            <td >{user.age}</td>
                            <td >{getCountryStr(user.numcode)}</td>
                      </tr>

            let startIndex, endIndex
            page !== 0 ? startIndex = (page*elementsPerPage) - 1 : startIndex = 0
            endIndex = startIndex + (elementsPerPage - 1)
            if (index >= startIndex && index <= endIndex){
                if (index == (users.length - 1)){
                    let numberOfEmptyRows = endIndex - index;
                    let emptyRowsArr = emptyRows(numberOfEmptyRows)
                    let bodyArr = [row, ...emptyRowsArr] 
                    return [...bodyArr]
                }
                return row
            }})
    }
    const updateTableData = () => {
        setTableData(prevState => {return [...getTableData()]})
        setPageTransition(false)
    }

    const nextPage = () => {
        if (page === maxPages) {return null}
        setPageTransition(true)
        setPage(prevState => {return prevState+1})
    }
    const previousPage = () => {
        if (page === 0) {return null}
        setPageTransition(true)
        setPage(prevState => {return prevState-1})
    }

    const [tableData, setTableData] = useState(() => {
        let teste = getTableData()
        return [...teste]
    })

    return (
        <>
        <table className='pagePadding baseMarginTop'>
            <thead>
                <tr>
                    <th className='tableName'>name</th>
                    <th className='tableAge'>age</th>
                    <th className='tableCountry'>country</th>
                </tr>
            </thead>
            <tbody className={pageTransition ? 'pageTransition' : ''} onTransitionEnd={() => {updateTableData()}}>
                {tableData}
            </tbody>
        </table>
        <div className='pageSelector baseMarginTop'>
            <Button className='btnPage' clickHandler={previousPage} placeholder='previous' />
                <p> {`page ${page+1}`} </p>
            <Button className='btnPage' clickHandler={nextPage} placeholder='next' />
        </div></>
    )

}

export default Table

