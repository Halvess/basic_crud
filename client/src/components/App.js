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

let countryArr = []
let countries = async () => {
    await api.get('/country')
    .then(res => {
        if (res.status == 200){
            return res.data    
        }})
    .then(data => {
        for (let index in data){
            countryArr.push(data[index])
        }})
    .finally(() => {return countryArr})
}

const router = createBrowserRouter([
{
    path: "/",
    element: <Create />
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
    const [users, setUsers] = useState([])
    const [countries, setCountries] = useState({})
    const [isLoading, setLoading] = useState(true)
    const getUsers = async () => {
        let returnArr = []
        await api.get('/users')
            .then(res => {
                if (res.status == 200){
                    return res.data    
                }})
            .then(data => {
                for (let index in data){
                    returnArr.push(data[index])
                }
                setUsers([...returnArr])
                return setLoading(false)
            })
         }
    
    const getCountries = async () => {
        await api.get('/country')
        .then(res => {if (res.status == 200){
            return res.data
        }})
        .then(data => {
            let countriesObj = {}
            for (let index in data){
                let numcode = data[index].numcode
                countriesObj[numcode] = data[index].name
            }
                setCountries({...countriesObj})
        })
    }

    let executeOnce = useRef(true)
    useEffect(() => {
        if (executeOnce.current){
            getCountries()
            executeOnce.current = false
        }
        getUsers()
    }, [])

    return (
        <React.StrictMode>
            <DataContext.Provider value={{countries, users, isLoading, setLoading}}>
                <RouterProvider router={router} />                
            </DataContext.Provider>
        </React.StrictMode>
    )
}

export default App