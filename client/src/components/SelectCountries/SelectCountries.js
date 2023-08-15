import Select from 'react-select'
import { useState } from 'react'

const SelectCountries = ({options}) => {
    const [isOpen, setOpen] = useState(false)
    const openMenu = () => {setOpen(true)}
    const closeMenu = () => {setOpen(false)} 

    const styles = {
        control: (defaultStyles) => ({
            ...defaultStyles,
            minHeight: '20px',
            background: 'none',
            border: 'black',
            color: 'white',
            fontWeight: '300',
            borderRadius: '0',
            borderBottom: '1px solid white',
            padding: '0',
            margin: '0',
        }),
    }
    return (
        <Select 
                openMenuOnFocus={true}
                onMenuOpen={openMenu}
                onMenuClose={closeMenu}
                menuIsOpen={isOpen}
                unstyled 
                options={options} 
                styles={styles} />
    )

}

export default SelectCountries
