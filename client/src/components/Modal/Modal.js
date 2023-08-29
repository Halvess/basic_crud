import {useState, useEffect} from 'react'

import './Modal.css'
import Header from '../Header/Header'
import Button from '../Button/Button'

const Modal = (show, confirmDelete, setModal) => {
    const clickHandler = e => {

    }
    return (
        show ? 
            <section>
                <div id='modal'>
                    <Header text='confirm delete' inModal={true}/>
                    <Button id='confirm' className='btnSubmit btnModal' placeholder='confirm' type='submit' clickHandler={clickHandler}/>
                    <Button id='return' className='btnReset btnModal' placeholder='return' type='reset' clickHandler={clickHandler}/>
                </div>
            </section> : null
        )
    }

export default Modal