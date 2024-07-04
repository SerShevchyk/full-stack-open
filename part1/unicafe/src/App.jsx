import { useState } from 'react'
import Header from "./components/Header"
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  const [results, setResults] = useState({
    good:  0,
    neutral: 0,
    bad: 0,
  })

  return (
    <div>
      <Header header="Unicafe. Give feedback" />
      <div className="feedback">
        <Button handleClick={() => setResults({ ...results, good: results.good + 1 })} text="Good" />
        <Button handleClick={() => setResults({ ...results, neutral: results.neutral + 1})} text="Neutral" />
        <Button handleClick={() => setResults({ ...results, bad: results.bad + 1})} text="Bad" />
      </div>
      <Statistics results={results} />
    </div>
  )
}

export default App