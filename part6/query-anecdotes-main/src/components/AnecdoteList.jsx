import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteList = ({anecdotes, updatedAnecdoteMutation}) => {
    const { notificationDispatch } = useContext(NotificationContext)

    const handleVote = (anecdote) => {
        console.log('vote')
        updatedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        notificationDispatch({ type: 'SET_NOTF', payload: `You voted for ${anecdote.content}`})
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_NOTF' })
        }, 5000);

    }

    return(
        <div>
            {anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
        </div>
    )
}

export default AnecdoteList