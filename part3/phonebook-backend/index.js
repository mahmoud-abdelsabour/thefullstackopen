const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req)=> req.method === 'POST' ? JSON.stringify(req.body) : '' )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
}


let persons = 
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// get all
app.get('/api/persons', (request, response) =>{
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// info
app.get('/api/info', (request,response)=>{
    const time = new Date().toString()
    const personsCount = persons.length
    response.send(`Phonebook has info for ${personsCount} people <br> ${time}`)
})

// get person by id
app.get('/api/persons/:id', (request,response)=> {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

// delete person
app.delete('/api/persons/:id', (request,response)=>{
    const id = request.params.id
    persons = persons.filter(p=>p.id !== id)

    response.status(204).end()
})

// create person
app.post('/api/persons',(request,response)=>{
    const body = request.body

    if(!body.name || !body.number)
    {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if(persons.find(p=>p.name.toLowerCase() === body.name.toLowerCase()))
    {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person ={
        id: Math.floor(Math.random() * 1000000).toString(),
        name: body.name,
        number:body.number
    }

    persons = persons.concat(person)
    response.json(person)
})


app.use(unknownEndpoint);


const PORT = process.env.port || 3001
app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`)
})