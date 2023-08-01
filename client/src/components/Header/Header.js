import './Header.css'

const Header = ({text}) => {
    return (
        <div className ='headerContainer'>
            <h1 className='header'>{text}</h1>
        </div>
    )
}

export default Header