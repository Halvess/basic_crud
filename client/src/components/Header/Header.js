import { Link } from 'react-router-dom'

import './Header.css'

const Header = ({text, inModal=false}) => {
    return (
        <header className ={!inModal ? 'headerContainer pagePadding' : 'headerContainer justifyCenter'}>
            <h1 className={'header'}>{text}</h1>
            {!inModal ? <Link className='linkMenu' to={'/'}> {'< main menu'}</Link> : null}
        </header>
    )
}

export default Header