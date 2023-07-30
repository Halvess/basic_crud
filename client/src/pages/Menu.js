import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";


import Button from '../components/Button/Button'

const Menu = () => {
    const navigate = useNavigate();
    const clickHandler = (e) => {
        e.preventDefault();
        alert(e.target.id)
    }
    return (
        <div className='menu'>
            <Button isMenu={true} id='menuCreate' type='button' onClick={navigate('create')} placeholder='Create'/>
        </div>
    )
}

export default Menu