import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = ({newAnecdoteMutation}) => {

  const { notificationDispatch } = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content: content, votes: 0 })

    console.log('new anecdote')

    notificationDispatch({ type: 'SET_NOTF', payload: `You created anecdote ${content}`})
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTF' })
    }, 5000);

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
