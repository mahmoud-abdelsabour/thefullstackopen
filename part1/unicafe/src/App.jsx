import { useState } from 'react'

const Button = ({onclick, text}) => <button onClick={onclick}> {text} </button>

const StatisticLine = ({text, value}) => {
  return(
    <>
      <p>{text} {value}</p>
    </>
  )
}

const Stats = ({good,neutral,bad}) => {
  const total = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const positive = (good / total) * 100
  return (
    <>
      <StatisticLine text="good" value = {good}/>
      <StatisticLine text="neutral" value = {neutral}/>
      <StatisticLine text="bad" value = {bad}/>

      <StatisticLine text="all" value = {total}/>
      <StatisticLine text="average" value = {average}/>
      <StatisticLine text="positive" value = {positive}/>
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