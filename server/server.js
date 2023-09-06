const express = require('express');
const apiRouter = require('./api/api');
const dotenv = require('dotenv');
const logDate = require('./utils/logDate')
const cors = require('cors');
const compression = require('compression')
dotenv.config();



const server = express()
server.use(compression())
server.use(cors({
    origin: '*'
}))
server.use(express.json())
const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

server.use((req, res, next) => {
    console.log(`${req.ip} ${req.method} ${req.originalUrl} [STARTED] ${logDate()}`)
    const start = process.hrtime()

    res.on('finish', () => {            
        const durationInMilliseconds = getDurationInMilliseconds (start)
        console.log(`${req.ip} ${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`)
    })

    res.on('close', () => {
        const durationInMilliseconds = getDurationInMilliseconds (start)
        console.log(`${req.ip} ${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`)
    })

    next()
})
server.use('/api', apiRouter)

server.listen(PORT = process.env.PORT, () => {
    console.log('Server working on port', PORT)
})