import { useState } from 'react'
import CounterInput from './Basics/CounterInput'
import TitleInput from './TitleInput'
import FullName from './FullName'
import {InputTest} from './Basics/InputTest';
import { Welcome } from './Basics/Welcome';
import { TodoApp } from './Todo/TodoApp';

function App() {
  const [title, setTitle] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [count, setCount] = useState(0)

  return (
    <div>
      <TodoApp />
      {/* <h1>Finance App</h1>
      <InputTest count={count} onUpdate={setCount} />
      <Welcome /> */}
      {/* <TitleInput onChange={setTitle} />
      <p>{title} - {title}</p>
      <FullName onChange={(first, last) => { setFirstName(first); setLastName(last) }} />
      <p>{firstName} {lastName}</p>
      <CounterInput count={count} onUpdate={setCount} /> */}
    </div>
  )
}

export default App
