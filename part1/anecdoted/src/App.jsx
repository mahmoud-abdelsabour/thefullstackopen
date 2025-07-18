import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const vote = props => {
  const copy = [...props.votes]
  copy[props.selected]+=1
  props.setVotes(copy)
}

const DispMax = ({ votes, anecdotes }) => {
  const maxVotes = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVotes)

  if(maxVotes > 0 ){
    return(
      <div>
        <h1>Anecdotes with the most votes</h1>
        <p>{anecdotes[maxIndex]}</p>
        <p>has {maxVotes} votes</p>
      </div>
    )
  }
  else{
    return(
      <div>
        <h1>Anecdotes with the most votes</h1>
        <p>no info</p>
      </div>
    )
  }
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))

  return (
    <div>
      <h1>Anecdote of the day</h1>

      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" onClick={() => vote({selected,votes,setVotes})}/>
      <Button text="next anecdote" onClick={() => setSelected(Math.floor(Math.random() * 8))}/>

      <DispMax votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App