import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = async (event) => {
        event.preventDefault()
        
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createAnecdote({ content: content, votes: 0})
        dispatch(createAnecdote(newAnecdote))

        dispatch(setNotification(`You Created ${content} Anecdote`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000);
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={createNewAnecdote}>
                <div>
                <input name='anecdote'/>
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm