import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Menu from '../pages/Menu'
import Create from '../pages/Create'
import Read from '../pages/Read'
import Update from '../pages/Update'
import Delete from '../pages/Delete'

import './globals.css'

const router = createBrowserRouter([
{
    path: "/",
    element: <Menu />
},
{
    path: "create",
    element: <Create />
},
{
    path: "read",
    element: <Read />
},    {
    path: "update",
    element: <Update />
},    
{
    path: "delete",
    element: <Delete />
}
])

const App = () => {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

export default App