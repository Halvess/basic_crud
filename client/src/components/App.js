import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {useMemo, useState, useEffect, useRef} from 'react'
import api from '../api/api'

import Menu from '../pages/Menu'
import Create from '../pages/Create'
import Read from '../pages/Read'
import Update from '../pages/Update'
import Delete from '../pages/Delete'
import DataContext from './Context';

import './globals.css'
const router = createBrowserRouter([
{
    path: "/",
    element: <Delete />
},
{
    path: "create",
    element: <Create/>
},
{
    path: "read",
    element: <Read/>
},    {
    path: "update",
    element: <Update/>
},    
{
    path: "delete",
    element: <Delete/>
}
])

const App = () => {
    const [countries, setCountries] = useState([])
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const getUsers = async () => {
        await api.get('/users')
            .then(res => {
                if (res.status == 200){
                    let userArr = []
                    if (res.data.hasOwnProperty('message')){
                        return null
                    }
                    let users = res.data
                    for (let index in users){
                        userArr.push(users[index])
                    }
                    setUsers(prevState => {return [...userArr]})    
                }})
         }
    
    const getCountries = async () => {
        await api.get('/country')
        .then(res => {if (res.status == 200){
            return res.data
        }})
        .then(data => {
            let countriesArr = []
            for (let index in data){
                let numcode = data[index].numcode
                countriesArr.push({
                    name: data[index].name,
                    numcode: numcode
                })
            }
            setCountries([...countriesArr])
        })
    }

    useEffect(() => {
        getCountries()
    }, [])
    useEffect(() => {
        if (isLoading){
            getUsers()
        }
    }, [isLoading])
    useEffect(() => {setLoading(false)}, [users])

    return (
        <React.StrictMode>  
            <DataContext.Provider value={{countries, users, isLoading, setLoading}}>
                <RouterProvider router={router} />                
            </DataContext.Provider>
        </React.StrictMode>

    )
}

export default App