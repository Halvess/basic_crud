import './Header.css'

const Header = ({text, inModal=false}) => {
    return (
        <header className ={!inModal ? 'headerContainer pagePadding' : 'headerContainer justifyCenter'}>
            <h1 className={'header'}>{text}</h1>
        </header>
    )
}

export default Header