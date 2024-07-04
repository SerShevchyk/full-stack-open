import { useState } from 'react'
import Button from './components/Button'
import Header from './components/Header'

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
  const [votes, setVotes] = useState(anecdotes.map(Number.prototype.valueOf, 0))
  const [bestAnecdote, setBestAnecdote] = useState(0)

  const voteAnecdoteHandler = () => {
    let updatedVotes = [...votes];
    updatedVotes[selected] += 1
    setVotes(updatedVotes)

    getBestAnecdote()
  }

  const nextAnecdoteHandler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))

    getBestAnecdote()
  }

  const getBestAnecdote = () => {
    let best = Math.max(...votes);

    votes.map((v, i) => {
      if (v == best && v > 0) {
        setBestAnecdote(i)
      }
    })
  }

  console.log(votes)

  return (
    <div>
      <Header header = "Anecdote of the day" />
      {anecdotes[selected]}
      <div className="actions">
        <Button handleClick={voteAnecdoteHandler} text="Vote" />
        <Button handleClick={nextAnecdoteHandler} text="Next anecdote" />
      </div>
      {Number.isInteger(bestAnecdote) && 
        <div>
          <Header header = "Anecdote with the most votes" />
          {anecdotes[bestAnecdote]}
        </div>
      }
    </div>
  )
}

export default App