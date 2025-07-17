import { useState } from 'react'

const Button = ({onclick, text}) => <button onClick={onclick}> {text} </button>

const Display = props => {
  console.log("display props", props)
  return(
    <div>
     <p>good {props.good}</p>
     <p>neutral {props.neutral}</p>
     <p>bad {props.bad}</p>
    </div>
  )
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