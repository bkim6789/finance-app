import { useState } from 'react'
import Counter from './Basics/Counter'
import TitleInput from './TitleInput'
import FullName from './FullName'

function App() {
  const [title, setTitle] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <div>
      <h1>Finance App</h1>
      <TitleInput onChange={setTitle} />
      <p>{title} - {title}</p>
      <FullName onChange={(first, last) => { setFirstName(first); setLastName(last) }} />
      <p>{firstName} {lastName}</p>
      <Counter />
    </div>
  )
}

export default App
