import { useState, useEffect } from 'react'
import './Table.css'

const Table = ( {countries, users} ) => {
    let [teste, setTeste] = useState(users)
    const [page, setPage] = useState(0)
    const elementsPerPage = 5
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
                            let emptyRows = endIndex - index;
                            let emptyArr = []
                            for (let i=0; i<emptyRows; i++){
                                emptyArr.push(
                                    <tr key={`empty-row-${i}`} className='emptyRow'>
                                        <td>null</td>
                                        <td>null</td>
                                        <td>null</td>
                                    </tr>
                                )
                            }
                            return ([row, ...emptyArr])
                        }
                        return (row)
                        
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

