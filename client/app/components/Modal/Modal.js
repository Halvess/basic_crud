import {useState, useEffect, useRef} from 'react'

import './Modal.css'
import Header from '../Header/Header'
import Button from '../Button/Button'
import Text from '../Text/Text'

const Modal = ({origin, show, children, message, deleteData, confirmFn, closeModal}) => {
    const sectionRef = useRef()
    const clickHandler = e => {
        e.preventDefault()
        let id = e.target.id
        if (id == 'confirm'){
            confirmFn()
        }
            return sectionRef.current.style.opacity = '0'
    }

    const headerMessage = () => {
        if (origin == 'delete'){
            return 'Confirm Deletion'
        }
        if (origin == 'error'){
            return 'Error'
        }
        return 'Warning'
    }

    const modalID = () => {
        if (origin == 'error'){
            return 'modal-error'
        }
        return 'modal'
    }

    return (
        show ? 
            <section id='modal-background' ref={sectionRef} onTransitionEnd={(e) => {e.target.id == 'modal-background' ? closeModal() : null}}>
                    <div id={modalID()}>
                        <div>
                            <Header text={headerMessage()} inModal={true}/>
                                <Text content={message} className={origin !== 'error' ? 'pagePadding baseMarginTop' : 'pagePadding baseMarginTop textCenter'}/>
                                {children}
                        </div>
                        {origin !== 'error' ? 
                            <div className='modalBtnWrapper largeMarginTop largeMarginBottom pagePadding'>
                                <Button id='confirm' className='btnSubmit btnModal' placeholder='confirm' type='submit' clickHandler={clickHandler}/>
                                <Button id='return' className='btnReset btnModal' placeholder='return' type='reset' clickHandler={clickHandler}/>
                            </div>
                            : null}
                    </div>
            </section> : null
        )
    }

export default Modal