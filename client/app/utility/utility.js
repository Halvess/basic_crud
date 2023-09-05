export const iterateObjToArray = (obj) => {
    let arr = []
    for (let index in obj){
        arr.push(obj[index])
    }
    return arr
}
