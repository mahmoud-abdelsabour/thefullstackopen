const baseUrl = 'http://localhost:3001/anecdotes'

//helper functions
const checkResponse = res =>{
    if(!res.ok) throw new Error('failed to get anecdotes')
}

const getOptions = (method, data) => (
    {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
)

//requests
const get = async () => {
    const response = await fetch(baseUrl)
    checkResponse(response)
    return await response.json()
}

const create = async (anecdote) => {
    const response = await fetch(baseUrl, getOptions('POST', anecdote))
    checkResponse(response)
    return await response.json()
}

const update = async (anecdote) => {
    const response = await fetch(baseUrl, getOptions('PUT', anecdote))
    checkResponse(response)
    return await response.json()
}

export default { get, create, update }