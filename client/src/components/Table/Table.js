import './Table.css'

const Table = ( {countries, users} ) => {
    const getCountryStr = (code) => {
        let countryFilter = countries.filter(countryObj => {return countryObj.numcode == code})[0]
        let countryStr = countryFilter.name
        countryStr = countryStr.toLowerCase()
        console.log(countryStr)
        return countryStr
    }
    return (
        <table className='pagePadding'>
            <thead>
                <tr>
                    <th className='tableName'>name</th>
                    <th className='tableAge'>age</th>
                    <th className='tableCountry'>country</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    return (
                        <tr key={`table-row-${index}`}>
                            <td >{user.name}</td>
                            <td >{user.age}</td>
                            <td >{getCountryStr(user.numcode)}</td>
                        </tr>)
                })}
            </tbody>
        </table>
    )

}

export default Table

