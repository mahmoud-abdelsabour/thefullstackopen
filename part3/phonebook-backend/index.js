const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '' )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



// get all
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// info
app.get('/api/info', (request, response, next) => {
  const time = new Date().toString()
  Person.countDocuments({}).then(count => {
    response.send(`Phonebook has info for ${count} people <br> ${time}`)
  })
    .catch(error => {
      next(error)
    })
})

// get person by id
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if(!person) return response.status(404).end

      response.json(person)
    })
    .catch(error => {
      next(error)
    })

})

// delete person
app.delete('/api/persons/:id', (request,response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

// create person
app.post('/api/persons',(request, response, next) => {
  const body = request.body

  if(!body.name || !body.number)
  {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  /*if(persons.find(p=>p.name.toLowerCase() === body.name.toLowerCase()))
    {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }*/

  const person = new Person({
    name: body.name,
    number:body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body

  Person.findById(id)
    .then(person => {
      if(!person) return response.status(404).end()

      person.name = name
      person.number = number

      return person.save().then(updatedPerson => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.port || 3001
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})