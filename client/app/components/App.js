import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {useState, useEffect} from 'react'
import api from '../api/api'
import translations from '../constants/translations.json'

import Menu from '../pages/Menu'
import Create from '../pages/Create'
import Read from '../pages/Read'
import Update from '../pages/Update'
import Delete from '../pages/Delete'
import DataContext from './Context';
import ErrorPage from '../pages/Error';

import './globals.css'
const router = createBrowserRouter([
{
    path: "/",
    element: <Menu />,
    loader: async () => {
        const userRes = await api.get('/users');
        const countriesRes = await api.get('/country');
        if (userRes.status !== 200 || countriesRes.status !== 200){
            throw new Response('', {status: 500})
        }
    return null
    },
    errorElement: <ErrorPage /> 
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
},
])

const App = () => {
    const initialLang = window.navigator.language !== 'pt-BR' ? 'en-US' : 'pt-BR'
    const [language, setLanguage] = useState(initialLang)
    const [countries, setCountries] = useState([])
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const {apiError} = translations[language]

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
                }
            else{
                throw new Error(res.data)
            }})
            .catch(err => {
                console.log(err)
                throw new Response('lala', {status:500})
                alert(apiError)
            })
         }
    
    const getCountries = async () => {
        await api.get('/country')
        .then(res => {
            if (res.status == 200){
                return res.data
            }
            else{
                throw new Error(res.data)
            }
        })
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
        .catch(err => {
            console.log(err)
            //alert(apiError)
        })
    }

    useEffect(() => {
        if (countries.length == 0){
            getCountries()
        }
        getUsers()
    }, [])

    return (
        <React.StrictMode>  
            <DataContext.Provider value={{countries, users, isLoading, language, setLanguage, setLoading, getUsers}}>
                <RouterProvider router={router} />        
            </DataContext.Provider>
        </React.StrictMode>
    )
}

export default App