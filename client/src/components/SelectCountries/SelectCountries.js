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
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            background: state.isFocused ? "var(--orange-web)" : 'black',
            color: state.isFocused ? "black" : 'white',
            padding: '.25rem',

        }),
        menuList: (defaultStyles) => ({
            ...defaultStyles,
            border: '.165rem solid var(--orange-web)',
            borderTop: 'none',
            "::-webkit-scrollbar": {
                width: ".5rem",
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
            unstyled
            inputId={id}
            on
            isSearchable={true}
            onChange={handleChange}
            onMenuOpen={openMenu}
            onMenuClose={closeMenu}
            menuIsOpen={isOpen}

            options={options} 
            styles={styles}
            noOptionsMessage={() => {return 'No country found.'}} />
    )

}

export default SelectCountries
