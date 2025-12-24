const Anecdote = ({anecdote}) => {
    return(
        <div>
            {anecdote.content} <strong>{anecdote.author}</strong> <br/>
            {anecdote.info} <br/>
            <strong>votes</strong> {anecdote.votes}
        </div>
    )
}

export default Anecdote