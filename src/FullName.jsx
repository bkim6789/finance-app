import { useState } from 'react'

function FullName({ onChange }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  function handleFirstChange(e) {
    setFirstName(e.target.value)
    onChange(e.target.value, lastName)
  }

  function handleLastChange(e) {
    setLastName(e.target.value)
    onChange(firstName, e.target.value)
  }

  return (
    <div>
      <label>
        First: <input type="text" value={firstName} onChange={handleFirstChange} />
      </label>
      <label>
        Last: <input type="text" value={lastName} onChange={handleLastChange} />
      </label>
    </div>
  )
}

export default FullName
