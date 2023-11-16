import { useState } from 'react'
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    {text: 'If it hurts, do it more often.', votes: 0},
    {text: 'Adding manpower to a late software project makes it later!', votes: 0},
    {text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {text: 'Premature optimization is the root of all evil.', votes: 0},
    {text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.', votes: 0},
    {text: 'The only way to go fast, is to go well.', votes: 0}
  ] // making anecdotes an object here is not necessary. I just tried to do the votes as object first but failed.
  const arr = new Array(8).fill(0)
  let randomNumber = 0
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(arr)

  const handleButtonClick = () => {
    randomNumber = Math.floor(Math.random() * 8)
    setSelected(randomNumber)
  }

  const handleVoteClick = () => {
    const updatedVotes = [...votes] 
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected].text}</p>
      <p>has {votes[selected]} votes</p>
      <div>
      <p>
        <Button handleClick={handleVoteClick} text="vote"/>
        <Button handleClick={handleButtonClick} text="next anecdote"/>
      </p>
      </div>
    </div>
  )
}

export default App