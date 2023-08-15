import { useState, useEffect } from 'react'
import './Table.css'

const Table = ( {countries, users} ) => {
    const [page, setPage] = useState(0)
    const elementsPerPage = 8
    const maxPages = Math.floor(users.length / elementsPerPage)

    const nextPage = () => {
        return setPage(prevState => {
            let newState = prevState + 1
            if (newState >= maxPages){
                return maxPages
            }
            return newState
        })}
    const previousPage = () => {
        return setPage(prevState => {
            let newState = prevState - 1
            if (newState <= 0){
                return 0
            }
            return newState
        })}
    const getCountryStr = (code) => {
        let countryFilter = countries.filter(countryObj => {return countryObj.numcode == code})[0]
        let countryStr = countryFilter.name
        return countryStr
    }

    useEffect(() => {
        console.log(page)
    }, [page])

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
            <tbody>
                {users.map((user, index) => {
                    let startIndex, endIndex
                    page !== 0 ? startIndex = (page*elementsPerPage) - 1 : startIndex = 0
                    endIndex = startIndex + (elementsPerPage - 1)
                    if (index >= startIndex && index <= endIndex){
                        return (
                            <tr key={`table-row-${index}`}>
                                <td >{user.name}</td>
                                <td >{user.age}</td>
                                <td >{getCountryStr(user.numcode)}</td>
                            </tr>)
                    }
                    else{
                        return null
                    }
                })}
            </tbody>
        </table>
        <div className='pageSelector baseMarginTop'>
            <button onClick={() => {previousPage()}}> prev </button>
            <p> {`page ${page+1}`} </p>
            <button onClick={() => {nextPage()}}> next </button>
        </div></>
    )

}

export default Table

