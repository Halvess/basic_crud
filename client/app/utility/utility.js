export const iterateObjToArray = (obj) => {
    let arr = []
    for (let index in obj){
        arr.push(obj[index])
    }
    return arr
}

export const capitalizeName = (name) => {
    let nameStr = name
    let nameArr = nameStr.split(' ')
    nameArr = nameArr.map(str => {
        if (str == 'de' || str == 'dos' || str == 'e' || str == 'da'){
            return str
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
    })
    nameStr = nameArr.join(' ')
    return nameStr
}
