const express = require('express');
const router = express.Router();
const db = require('../../db/db')

let baseQuery = 'SELECT name, age, country_code FROM users'

router.get('/', async (req, res) => {
    let users = await db.query(baseQuery);
    if (users.rows.length){
        return res.status(200).send({...users.rows})
    }
        return res.status(200).send({message: 'No users found'})

})

router.post('/search', async (req, res) => {
    let {name, age, country_code} = req.body;
    let searchCount = 0
    let nameLike = ''
    let ageLike = ''
    let countryLike = ''
    let values = []

    if (name){
        searchCount += 1
        nameLike = `name LIKE '%' || $${searchCount} || '%'`
        values.push(name)
    }
    if (age){
        searchCount += 1
        ageLike = name ? ' AND ' + `age = $${searchCount}` : `age = $${searchCount}`
        values.push(age)
    }
    if (country_code){
        searchCount += 1
        countryLike = name || age ? ' AND ' + `country_code = $${searchCount}` : `country_code = $${searchCount}` 
        values.push(country_code)
    }

    let query = `${baseQuery} WHERE ${nameLike}${ageLike}${countryLike}`
    try{
        let data =  await db.query(query, values);
        res.status(200).send({...data.rows})
    }
    catch(err){
        res.status(500).send({message: 'Internal server error.'})
    }
})

module.exports = router  