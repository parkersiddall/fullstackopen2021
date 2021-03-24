import React, { useState } from 'react'

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Button = (props) => {

  return(
  <button onClick={props.modifyCount}>{props.feedback}</button>
  )
}

const Statistics = (props) => {

  let total = props.good + props.neutral + props.bad
  let average = ((props.good * 1) + (props.bad * -1)) / total
  let percPositive = (props.good / total) * 100

  if (total === 0) {
    return(
      <p>No feeback has been provided yet.</p>
    )
  }

  return(
    <div>
      <table>
        <Statistic text={"Good"} value={props.good} />
        <Statistic text={"Neutral"} value={props.neutral} />
        <Statistic text={"Bad"} value={props.bad} />
        <Statistic text={"Total"} value={total} />
        <Statistic text={"Average"} value={average} />
        <Statistic text={"Positive rate"} value={"%" + percPositive} />
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => {
    setGood(good + 1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const badFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback:</h1>
      <Button modifyCount={goodFeedback} feedback={"Good"}/>
      <Button modifyCount={neutralFeedback} feedback={"Neutral"}/>
      <Button modifyCount={badFeedback} feedback={"Bad"}/>
      <h2>Statistics:</h2>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad}
        />
    </div>
  )
}

export default App