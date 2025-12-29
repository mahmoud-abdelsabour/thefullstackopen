import { useState, useEffect } from "react"
import axios from "axios"

export const useResource = (baseUrl) => {
    
    const [resources, setResources] = useState([])

    useEffect(() => {
        const fetchResources = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
        }
        fetchResources()
    }, [baseUrl])

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource)
        setResources(prev => prev.concat(response.data))
    }

    const update = async (id, resource) => {
        const response = await axios.put(`${baseUrl}/${id}`, resource)
        setResources(prev => prev.map(r => r.id === response.data.id ? response.data : r))
    }
    
    const deleteOne = async (id) => {
        await axios.delete(`${baseUrl}/${id}`)
        setResources(prev => prev.filter(r => r.id !== id))
    }

    const Services = {
        create,
        update,
        deleteOne,
    }

    return [resources, Services]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
