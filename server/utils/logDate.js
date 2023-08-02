const logDate = (date = new Date()) => {
    let year = date.getFullYear()
    let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let hour = date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
}

module.exports = logDate