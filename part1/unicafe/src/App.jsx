import { useState } from "react"

const StatisticLine = ({text, value}) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const Statistics = ({good, neutral, bad}) => {
  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good + neutral + bad}/>
          <StatisticLine text="average" value={(good + neutral + bad) / 3}/>
          <StatisticLine text="positive" value={good > 0 ? good / (neutral + bad + good) * 100 + "%" : "0%"}/>
        </tbody>
      </table>
    </>
  )
}

const Button = ({value, onClick}) => {
  return <button onClick={onClick}>{value}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button value="good" onClick={() => setGood(good => good + 1)}/>
        <Button value="neutral" onClick={() => setNeutral(neutral => neutral + 1)}/>
        <Button value="bad" onClick={() => setBad(bad => bad + 1)}/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
