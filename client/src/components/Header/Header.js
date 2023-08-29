import './Header.css'

const Header = ({text}) => {
    return (
        <header className ='headerContainer pagePadding'>
            <h1 className='header'>{text}</h1>
        </header>
    )
}

export default Header