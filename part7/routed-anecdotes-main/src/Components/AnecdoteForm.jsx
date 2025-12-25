import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks/index"

const AnecdoteForm = (props) => {

    const navigate = useNavigate()

    const content = useField('content')
    const author = useField('author')
    const info = useField('info')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/')

        props.setNotification(`a new anecdote ${content.value} created !`)
        setTimeout(() => {
            props.setNotification('')
        }, 5000);
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button type="submit" >create</button>
                <button type="button" onClick={() => 
                        {
                            author.reset()
                            content.reset()
                            info.reset()
                        } 
                    }>
                    reset</button>
            </form>
        </div>
    )

}


export default AnecdoteForm