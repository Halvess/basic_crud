import { useRef } from 'react'
import { useNavigate } from "react-router-dom";


import Button from '../components/Button/Button'

const Menu = () => {
    let href = ''
    const menuRef = useRef(null)
    const navigate = useNavigate();
    const clickHandler = (e) => {
        href = e.target.id
        let buttons = [...menuRef.current.children]
        let clickedElement = buttons.filter(btn => {return btn.id == e.target.id})[0]
        let clickedElementPosition = clickedElement.getBoundingClientRect();
        clickedElement.className = clickedElement.className + ' menuClicked'
        console.log(clickedElementPosition)
        let transitionDiv = document.createElement('div');
        transitionDiv.className = 'menuTransition'
        transitionDiv.style.height = clickedElementPosition.height + 'px'
        transitionDiv.style.top = clickedElementPosition.top + 'px'
        clickedElement.style.zIndex = 1
        transitionDiv.style.zIndex = 0;
        menuRef.current.appendChild(transitionDiv)
        setTimeout(() => {transitionDiv.style.transform = 'scaleY(8)'}, 10)
    }
    const transitionHandler = e => {
        if (e.target.className == 'menuTransition'){
            return menuRef.current.className += ' fade'
        }
        if (e.target.id == 'mainMenu'){
            return navigate(href)
        }
    }

    return (
        <div id='mainMenu' className='menu load' ref={menuRef} onAnimationEnd={(e) => {e.target.className = 'menu'}} onTransitionEnd={(e) => {transitionHandler(e)}}>
            <Button className='btnMenu' id='create' type='button' clickHandler={clickHandler} placeholder='Create'/>
            <Button className='btnMenu' id='read' type='button' clickHandler={clickHandler} placeholder='Read'/>
            <Button className='btnMenu' id='update' type='button' clickHandler={clickHandler} placeholder='Update'/>
            <Button className='btnMenu' id='delete' type='button' clickHandler={clickHandler} placeholder='Delete'/>
        </div>
    )
}

export default Menu