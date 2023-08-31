import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'

import './Header.css'

const Header = ({text, inModal=false}) => {
    const navigate = useNavigate()
    return (
        <header className ={!inModal ? 'headerContainer pagePadding' : 'headerContainer justifyCenter'}>
            <div className='menuReturnWrapper'>
                <Button id='menu-return' className='btnBack' type='button' clickHandler={() => {navigate('/')}}/>
            </div>
            <h1 className={'header'}>{text}</h1>
        </header>
    )
}

export default Header