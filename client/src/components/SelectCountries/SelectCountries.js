import Select from 'react-select'
import { useState } from 'react'

const SelectCountries = ({id, countries, changeFormData}) => {
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
            color: 'white',
            fontWeight: '300',
            borderRadius: '0',
            padding: '0 .25rem',
            margin: '0',
            paddingLeft: '',
            borderBottom: '0.1rem solid white'
        }),
        option: (defaultStyles) => ({
            ...defaultStyles,
            background: 'black',
            color: 'white',
            padding: '.25rem',
            "&:hover": {
                background: "var(--orange-web)",
                color: 'black',
            }
        }),
        menuList: (defaultStyles) => ({
            ...defaultStyles,
            border: '.165rem solid var(--orange-web)',
            borderTop: 'none',
            "::-webkit-scrollbar": {
                width: ".25rem",
                height: "0px",
              },
              "::-webkit-scrollbar-track": {
                background: "black"
              },
              "::-webkit-scrollbar-thumb": {
                background: "var(--cerulean)",
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: "white"
              }
        }),
        noOptionsMessage: (defaultStyles) => ({
            ...defaultStyles,
            background: 'black',
            color: 'white',
            padding: '.5rem 0'
        }),
    }
    return (
        <Select
                inputId={id}
                onChange={handleChange}
                openMenuOnFocus={true}
                onMenuOpen={openMenu}
                onMenuClose={closeMenu}
                menuIsOpen={isOpen}
                unstyled 
                options={options} 
                styles={styles} 
                noOptionsMessage={() => {return 'No country found.'}} />
    )

}

export default SelectCountries
