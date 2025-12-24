import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import anecdoteService from './Services/anecdotes'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const createAnecdote = (event) => {
    event.preventDefault()
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.get,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if(result.isLoading){
    return <div>loading data...</div>
  }

  if(result.isError){
    return <div>anecdote service not available due to problems in server. {result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

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

export default App
