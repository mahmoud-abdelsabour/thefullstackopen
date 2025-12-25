import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = async () => {
    try{
        const response = await axios.get(`${baseUrl}/api/all`)
        return response
    }catch(err){
        console.error(`error in fetching all countries ${err}`)
    }
}

const getCountry = async (name) => {
    try{
        const response = await axios.get(`${baseUrl}/api/name/${name}`)
        return response
    }catch(err){
        console.error(`error in fetching a single country ${err}`)
    }
}

export default { getAll, getCountry }