import Select from 'react-select'
import { useState } from 'react'

const SelectCountries = ({countries, changeFormData}) => {
    const options = []
    countries.forEach(country => {
        options.push({
            value: country.numcode,
            label: country.name
        })})

    const [isOpen, setOpen] = useState(false)
    const openMenu = () => {setOpen(true)}
    const closeMenu = () => {setOpen(false)} 

    const handleChange = (selected) => {
        changeFormData('select', selected.value)
    }

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
            paddingLeft: '.25rem'
        }),
        option: (defaultStyles) => ({
            ...defaultStyles,
            background: 'black',
            color: 'var(--orange-web)',
            padding: '.25rem'
        })
    }
    return (
        <Select 
                onChange={handleChange}
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
