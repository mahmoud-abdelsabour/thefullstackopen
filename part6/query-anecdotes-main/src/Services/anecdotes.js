const baseUrl = 'http://localhost:3001/anecdotes'

//helper functions
const checkResponse = async (res) =>{
    if(!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'request failed')
    }
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
    await checkResponse(response)
    return await response.json()
}

const create = async (anecdote) => {
    const response = await fetch(baseUrl, getOptions('POST', anecdote))
    await checkResponse(response)
    return await response.json()
}

const update = async (anecdote) => {
    const response = await fetch(`${baseUrl}/${anecdote.id}`, getOptions('PUT', anecdote))
    await checkResponse(response)
    return await response.json()
}

export default { get, create, update }