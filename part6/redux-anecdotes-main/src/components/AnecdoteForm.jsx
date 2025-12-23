import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = async (event) => {
        event.preventDefault()

        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(appendAnecdote({ content: content, votes: 0}))

        dispatch(setNotification(`You Created ${content} Anecdote`, 3))
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