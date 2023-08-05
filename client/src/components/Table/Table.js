import './Table.css'

const Table = ( {countries, users} ) => {
    return (
        <table className='pagePadding'>
            <thead>
                <tr>
                    <th>name</th>
                    <th>age</th>
                    <th>country</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    return (
                        <tr key={`table-row-${index}`}>
                            <td className='tableName'>{user.name}</td>
                            <td className='tableAge'>{user.age}</td>
                            <td className='tableCountry'>{countries[user.country].toLowerCase()}</td>
                        </tr>)
                })}
            </tbody>
        </table>
    )

}

export default Table

