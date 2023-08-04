const express = require('express');
const router = express.Router();
const db = require('../../db/db')

let searchBaseQuery = 'SELECT name, age, country_code FROM users'
router.get('/', async (req, res) => {
    let users = await db.query(searchBaseQuery);
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

    let query = `${searchBaseQuery} WHERE ${nameLike}${ageLike}${countryLike}`
    try{
        let data =  await db.query(query, values);
        res.status(200).send({...data.rows})
    }
    catch(err){
        res.status(500).send({message: 'Internal server error.'})
    }
})

router.post('/add', async (req,res) => {
    const {name, age, country_code} = req.body;
    if (!name || !age || !country_code){
        return res.status(400).send({message: 'All fields must be specified'})
    }
    let insertQuery = 'INSERT INTO users (name, age, country_code) VALUES ($1,$2,$3) RETURNING *'
    const values = [name, age, country_code];
    try{
        let data =  await db.query(insertQuery, values);
        res.status(200).send({...data.rows})
    }
    catch(err){
        res.status(500).send({message: 'Internal server error.'})
        console.log(err)        
    }
})

router.post('/delete', async (req,res) => {
    let idValues = [...req.body.id]
    let deleteQuery = 'DELETE FROM users WHERE id IN '
    idValues.forEach((id, index) => {
        if (index == 0){
            deleteQuery += '('
        }
        deleteQuery += `$${index+1}`
        if ((index + 1) !== idValues.length){
            deleteQuery += ','
        }
        else{
            deleteQuery += ')'
        }
    })
    try{
        let data =  await db.query(deleteQuery, idValues);
        res.status(200).send({sucess: true, message: 'Rows sucessfuly deleted.'})
    }
    catch(err){
        res.status(500).send({message: 'Internal server error.'})
        console.log(err)        
    }
})

router.post('/update', async (req,res) => {
    const {id, name, age, country_code} = req.body
    if (!id){
        return res.status(400).send({message: 'id must be specified'})
    }
    let valuesCounter = 0
    let updateQuery = 'UPDATE users SET'
    let values = []
    if (name){
        valuesCounter += 1
        updateQuery += ` name=$${valuesCounter}`
        values.push(name)
    }
    if (age){
        valuesCounter += 1
        if (name){
            updateQuery += ','
        }
        updateQuery += ` age=$${valuesCounter}`
        values.push(age)
    }
    if (country_code){
        valuesCounter += 1
        if (name || age){
            updateQuery += ','
        }
        updateQuery += ` age=$${valuesCounter}`
        values.push(age)
    }
    valuesCounter += 1 
    updateQuery += `, last_modify = to_timestamp($${valuesCounter})`
    values.push((Date.now() / 1000.0))
    valuesCounter += 1
    updateQuery += ` WHERE id=$${valuesCounter} RETURNING *`
    values.push(id)
    try{
        let data = db.query(updateQuery, values)
        res.status(200).send({...data.rows})
    }
    catch(err){
        res.status(500).send({message:'Internal server error'})
        console.log(err)
    }
})

module.exports = router  