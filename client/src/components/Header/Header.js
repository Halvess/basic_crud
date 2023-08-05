import './Header.css'

const Header = ({text}) => {
    return (
        <div className ='headerContainer pagePadding'>
            <h1 className='header'>{text}</h1>
        </div>
    )
}

export default Header