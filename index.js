const express = require('express')
const dotenv = require('dotenv').config()
const client = require('./db')
// const client = require('pg')

const app = express()

const PORT = process.env.PORT || 7000
app.listen(PORT, ()=>{
    console.log(`Server running on port http//:localhost: ${PORT} `)
})


use.express(json())

// Get all users 
app.get('/users', async (req, res) =>{

    try {

    const result = await client.query('SELECT * from users')

    return res.status(200).json(result.rows)
    
} catch (error) {
    console.error(`Error getting users: ${error.message}`)
    return res.status(500).json('Error fetching all users')
}

} )

// Create a user
app.post('/users', async (req, res) =>{

    try {
        const {name, email} = req.body 
        const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
        return res.status(201).json(result.rows[0])
        
    } catch (error) {
        console.error(error)
        return res.status(500).json('Error creating user')
    }
   
})


// Delete a user
app.delete('/users/:id', async (req, res) =>{

    const {id} = req.params

    try {
         const result = await client.query(
        'DELETE users WHERE id = $1 RETURNING *',
        [id] 
    )

    if (result.length === 0){
        return res.status(404).json({message : 'User not found'})
    }

    return res.status(200).json({message: 'User', user: result.row[0]})
   
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Error deleting user')  
    }
})


// Get a specific user
app.get("/users/:id", async(req, res) =>{
    const {id} = req.params

    try {
        if (!id){
            return res.status(400).json({message: 'User id not provided'})
        }
        const result = await client.query('SELECT * FROM users WHERE id = $1 RETURNING *', [id] )
        if (result.rows.length === 0){
            return res.status(404).json('User not found')
        }
    } catch (error) {
        console.error(error.message)
        return res.status(500).json(`Error fetching user`)
    }
})


// Update  a user  
app.put('/users/:id', async (req, res) =>{
    const {name, email} = req.body 
    const {id} = req.params

    try {
        
        // if (!name || !email){
        //     return res.status(400).json('All credentials must be provided')
        // }
        const result = await client.query('INSERT INTO users SET name = $1, email =$2  WHERE id = $3 RETURNING *', [name, email, id])
          if(result.rows.length ===0){
            return res.status(404).json('User not found')
          }
        return res.status(201).json(result.rows[0])
      
    } catch (error) {
        console.error(error)
        return res.status(500).json('Error updating user')
    }
   
})