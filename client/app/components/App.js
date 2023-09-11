import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {useState, useEffect} from 'react'
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
    element: <Menu />
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
    useEffect(() => {console.log(window.navigator.language), []})

    const [countries, setCountries] = useState([])
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const getUsers = async () => {
        await api.get('/users')
            .then(res => {
                if (res.status == 200){
                    let userArr = []
                    let users = res.data
                    if (users.hasOwnProperty('message')){
                        setLoading(false) 
                        return setUsers(prevState => {return []})
                    }
                    for (let index in users){
                        userArr.push(users[index])
                    }
                    setUsers(prevState => {return [...userArr]})
                    setLoading(false)  
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
        if (countries.length == 0){
            getCountries()
        }
        getUsers()
    }, [])

    useEffect(() => {
        if (isLoading){
            getUsers()
        }
    }, [isLoading])

    return (
        <React.StrictMode>  
            <DataContext.Provider value={{countries, users, isLoading, setLoading}}>
                <RouterProvider router={router} />        
            </DataContext.Provider>
        </React.StrictMode>
    )
}

export default App