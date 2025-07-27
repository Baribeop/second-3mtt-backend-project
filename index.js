const express = require('express')
const dotenv = require('dotenv').config()
const client = require('./db')
const cors = require('cors')


// const client = require('pg')

const app = express()


const PORT = process.env.PORT || 7000
app.listen(PORT, ()=>{
    console.log(`Server running on port http://localhost:${PORT} `)
})

app.use(cors())
app.use(express.json())


// test endpoint

app.get("/home", (req, res) => {
    res.send('welcome')
})

// Get all users 
app.get('/users', async (req, res) =>{

    try {

    const result = await client.query('SELECT * from user_profile')
    if(!result.rows){
        return res.status(404).json('User not found')
    }
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
        const user = await client.query('SELECT * from user_profile WHERE email = $1',[email])

      
        if (user.rows.length > 0){
                return res.status(400).json('User already exist')
            }
       
        const result = await client.query('INSERT INTO user_profile (name, email) VALUES ($1, $2) RETURNING *', [name, email])
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
        'DELETE  FROM user_profile WHERE id = $1 RETURNING *',
        [id] 
    )

    if (result.rows.length === 0){
        return res.status(404).json({message : 'User not found'})
    }

    return res.status(200).json({message: 'User deleted succesfully', user: result.rows[0]})
   
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
        const result = await client.query('SELECT * FROM user_profile WHERE id = $1', [id] )
        if (result.rows.length === 0){
            return res.status(404).json('User not found')
        }
        return res.status(200).json(result.rows[0])
    } catch (error) {
        console.error(error.message)
        return res.status(500).json(`Error fetching user`)
    }
})


// Update  a user  
app.put('/users/:id', async (req, res) =>{
    const {name} = req.body 
    const {id} = req.params

    try {
        
        // if (!name || !email){
        //     return res.status(400).json('All credentials must be provided')
        // }
        const result = await client.query('UPDATE user_profile SET name = $1 WHERE id = $2 RETURNING *', [name, id])
          if(result.rows.length ===0){
            return res.status(404).json('User not found')
          }
        return res.status(201).json(result.rows[0])
      
    } catch (error) {
        console.error(error)
        return res.status(500).json('Error updating user')
    }
   
})