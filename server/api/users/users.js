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
    let values = [req.body.name]
    let data =  await db.query("SELECT name FROM users WHERE name LIKE '%' || $1 || '%' ", values);
    res.status(200).send({...data.rows})
})

module.exports = router  