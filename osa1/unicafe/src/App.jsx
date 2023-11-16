import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const StatisticLine = (props) => {
  return(
  <tbody>
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  </tbody>
  )
}

const Statistics = (props) => {
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  
  const handleGoodClick = () => {
    setAll(allClicks.concat('L'))
    const updatedGood = props.good + 1
    props.setGood(updatedGood )
    const total = updatedGood+props.neutral+props.bad
    setTotal(total)
    setAverage((updatedGood - props.bad) / total)
    setPositive(updatedGood * 100 / total)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('R'))
    const updatedNeutral = props.neutral + 1
    props.setNeutral(updatedNeutral)
    const total = props.good+updatedNeutral+props.bad
    setTotal(total)
    setAverage((props.good - props.bad)/ total)
    setPositive(props.good * 100 / total)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat('R'))
    const updatedBad = props.bad + 1
    props.setBad(updatedBad)
    const total = props.good+props.neutral+updatedBad
    setTotal(total)
    setAverage((props.good - updatedBad) / total)
    setPositive(props.good * 100 / total)
  }

  if(allClicks.length === 0){ 
    return(
      <div>
        <div>
          <h1>give feedback</h1>
            <Button handleClick={handleGoodClick} text='good' />
            <Button handleClick={handleNeutralClick} text='neutral' />
            <Button handleClick={handleBadClick} text='bad' />
            <h2>statistics</h2>
            <p>No feedback given</p>
        </div>
      </div>
  )}
  else 
  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
        <h1>statistics</h1>
        <table>
        <StatisticLine text="good"value ={props.good} />
        <StatisticLine text="neutral"value ={props.neutral} />
        <StatisticLine text="bad"value ={props.bad} />
        <StatisticLine text="total"value ={total} />
        <StatisticLine text="average"value ={average} />
        <StatisticLine text="positive"value ={positive + " %"}/>
        </table>
        </div>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Statistics good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad}/>
    </div>
  )
}

export default App