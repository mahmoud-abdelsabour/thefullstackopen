import { useState } from 'react'

const Button = ({onclick, text}) => <button onClick={onclick}> {text} </button>

const Stats = props => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good * 1 + props.neutral * 0 + props.bad * -1) / total
  const positive = (props.good / total) * 100
  return (
    <>
    <p>all {total}</p>
    <p>average {average} </p>
    <p>positive {positive} %</p>
    </>
  )
}

const Display = ({good,neutral,bad}) => {
  console.log(good,neutral,bad)
  if (good === 0 && neutral === 0 && bad === 0) {
  return(
    <div>
      <p>No feedback given</p>
    </div>
  )
  } else {
    return(
      <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Stats good={good} bad={bad} neutral={neutral} />
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button onclick={()=> setGood(good + 1)} text="good"/>
      <Button onclick={()=> setNeutral(neutral + 1)} text="neutral"/>
      <Button onclick={()=> setBad(bad + 1)} text="bad"/>

      <h1>statistics</h1>
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App