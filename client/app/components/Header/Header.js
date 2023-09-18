import {useContext} from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import Context from '../Context'

import './Header.css'

const Header = ({text, inModal=false}) => {
    const {language, setLanguage} = useContext(Context)

    const languageHandler = e => {
        return setLanguage(e.target.id)
    }
    
    return (
        <header className ={!inModal ? 'headerContainer pagePadding' : 'headerContainer justifyCenter'}>
            <h1 className={'header'}>{text}</h1>
            {!inModal ? 
            <div>
                <span className='pagePadding'>
                    <Button id='pt-BR' type='button' className={language == 'pt-BR' ? 'btnLang active' : 'btnLang'} placeholder='pt' clickHandler={languageHandler} />
                    /
                    <Button id='en-US' type='button' className={language == 'en-US' ? 'btnLang active' : 'btnLang'} placeholder='en' clickHandler={languageHandler} />
                </span>
                <Link className='linkMenu' to={'/'}> {'< main menu'}</Link>     
            </div>
            : null}
        </header>
    )
}

export default Header