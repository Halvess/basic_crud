import Select from 'react-select'
import { useState, useContext } from 'react'
import Context from '../Context'

const SelectCountries = ({id, changeFormData, value, disabled, hasError}) => {
    const {countries} = useContext(Context)
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
            borderRadius: '.25rem',
            padding: '0 .25rem',
            margin: '0',
            paddingLeft: '',
            border: hasError ? '.15rem solid var(--cerulean)' : '.15rem solid rgba(0,0,0,0)',
            borderBottom: hasError ? '.15rem solid var(--cerulean)' : '0.1rem solid white', 
        }),
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            background: state.isFocused ? "var(--orange-web)" : 'black',
            color: state.isFocused ? "black" : 'white',
            padding: '.25rem',
            fontWeight: '300'

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
            value = {options.filter(option => {return option.value == value})}
            unstyled
            inputId={id}
            isDisabled = {disabled}
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
