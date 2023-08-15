const express = require('express');
const router = express.Router();
const db = require('../../db/db')

let baseQuery = 'SELECT nicename as name, numcode FROM country ORDER BY name ASC'

router.get('/', async (req, res) => {
    let users = await db.query(baseQuery);
    if (users.rows.length){
        return res.status(200).send({...users.rows})
    }
        return res.status(500).send({message: 'Error finding country data'})

})

module.exports = router