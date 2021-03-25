import React, { useState } from 'react'

const Winner = (props) => {
  let maxPoints = 0
  let winner = null
  for(var key in props.votes){
    if (props.votes[key] >= maxPoints){
      maxPoints = props.votes[key]
      winner = key
    }
  }
  return(
    <div>
      <h1>Anecdote with most votes:</h1>
      {props.anecdotes[winner]}
      <p>has {maxPoints} points</p>
    </div>
  )
}

const Button = (props) => {
  return(
    <div>
      <button onClick={props.clicked}>{props.text}</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0})

  const setRandom = () => {
    let randomInt = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomInt)
  }

  const updateVotes = () => {
    const newVotes = {
      ...votes
    }
    newVotes[selected] = votes[selected] + 1
    setVotes(newVotes)
  }

  return (
    <div>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button clicked={setRandom} text={'Next anecdote'}/>
      <Button clicked={()=>updateVotes()} text={'Vote'} />
      <Winner anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App