import { useDispatch, useSelector } from "react-redux"
import { modifyAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

    //const anecdotes = useSelector(state => [...state].sort((a,b) => b.votes - a.votes))
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return [...anecdotes]
        .filter(n => n.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a,b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()


    const vote = (anecdote) => {
        console.log('vote', anecdote.id)

        dispatch(modifyAnecdote({ ...anecdote, votes: anecdote.votes + 1}))

        dispatch(setNotification(`You voted ${anecdote.content}`, 3))
    }

    return(
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            ))}
      </div>

    )
}

export default AnecdoteList