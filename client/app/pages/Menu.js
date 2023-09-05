import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


import Button from '../components/Button/Button'

const Menu = () => {
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    
    const isMobile = width <= 768;
    

    let href = ''
    const navigate = useNavigate();


    const clickHandler = (e) => {
        setTimeout(() => {e.target.className += ' menuClicked'}, 10)
        href = e.target.id
        let clickedElement = e.target
        let clickedElementPosition = clickedElement.getBoundingClientRect();
        let transitionDiv = document.createElement('div');
        transitionDiv.className = 'menuTransition'
        transitionDiv.style.height = clickedElementPosition.height + 'px'
        transitionDiv.style.top = clickedElementPosition.top + 'px'
        clickedElement.style.zIndex = 1
        transitionDiv.style.zIndex = 0;
        e.target.parentNode.appendChild(transitionDiv)
        setTimeout(() => {transitionDiv.style.transform = 'scaleY(8)'}, 10)
    }
    const transitionHandler = e => {
        if (e.target.className == 'menuTransition'){
            return e.currentTarget.className += ' fade'
        }
        if (e.target.id == 'mainMenu'){
            return navigate(href)
        }
    }

    const handleHover = (e) => {
        e.currentTarget.className = e.currentTarget.className + ' menuHover'
    }

    const handleMouseOut = (e) => {
        e.currentTarget.className = 'btnMenu'
    }

    return (
        <div id='mainMenu' className='menu load'  onAnimationEnd={(e) => {e.target.className = 'menu'}} onTransitionEnd={(e) => {transitionHandler(e)}}>
            <Button className='btnMenu' id='create' type='button' onMouseOver={handleHover} onMouseOut={handleMouseOut} clickHandler={clickHandler} placeholder='Create'/>
            <Button className='btnMenu' id='read' type='button' onMouseOver={handleHover} onMouseOut={handleMouseOut} clickHandler={clickHandler} placeholder='Read'/>
            <Button className='btnMenu' id='update' type='button' onMouseOver={handleHover} onMouseOut={handleMouseOut} clickHandler={clickHandler} placeholder='Update'/>
            <Button className='btnMenu' id='delete' type='button' onMouseOver={handleHover} onMouseOut={handleMouseOut} clickHandler={clickHandler} placeholder='Delete'/>
        </div>
    )
}

export default Menu