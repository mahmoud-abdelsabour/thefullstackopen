const AnecdoteList = ({anecdotes}) => {

    const handleVote = (anecdote) => {
        console.log('vote')
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