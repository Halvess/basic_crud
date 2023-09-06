import {useState, useEffect, useRef} from 'react'

import './Modal.css'
import Header from '../Header/Header'
import Button from '../Button/Button'
import Text from '../Text/Text'

const Modal = ({show, children, message, deleteData, confirmFn, closeModal}) => {
    const sectionRef = useRef()
    const clickHandler = e => {
        e.preventDefault()
        let id = e.target.id
        if (id == 'confirm'){
            confirmFn()
        }
            return sectionRef.current.style.opacity = '0'
    }
    return (
        show ? 
            <section id='modal-background' ref={sectionRef} onTransitionEnd={(e) => {e.target.id == 'modal-background' ? closeModal() : null}}>
                    <div id='modal'>
                        <div>
                            <Header text='Confirm Deletion' inModal={true}/>
                                <Text content={message} className='pagePadding baseMarginTop'/>
                                {children}
                        </div>
                        <div className='modalBtnWrapper largeMarginTop largeMarginBottom pagePadding'>
                            <Button id='confirm' className='btnSubmit btnModal' placeholder='confirm' type='submit' clickHandler={clickHandler}/>
                            <Button id='return' className='btnReset btnModal' placeholder='return' type='reset' clickHandler={clickHandler}/>
                        </div>
                    </div>
            </section> : null
        )
    }

export default Modal