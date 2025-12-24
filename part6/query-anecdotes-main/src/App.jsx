import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './Services/anecdotes'

const App = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) }
  })

  const updatedAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) }
  })

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
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />
      <AnecdoteList anecdotes={anecdotes} updatedAnecdoteMutation={updatedAnecdoteMutation} />

    </div>
  )
}

export default App
