import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const handleGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const handleOK = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const handleBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const handleReset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={handleGood}>Good</button> 
      <button onClick={handleOK}>Ok</button> 
      <button onClick={handleBad}>Bad</button>
      <button onClick={handleReset}>Reset stats</button>
      <div>Good: {store.getState().good}</div>
      <div>OK: {store.getState().ok}</div>
      <div>Bad: {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
