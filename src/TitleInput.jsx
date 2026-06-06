import { useState } from 'react'

function TitleInput({ onChange }) {
  const [title, setTitle] = useState('')

  function handleChange(e) {
    setTitle(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div>
      <label>
        Title: <input type="text" value={title} onChange={handleChange} />
      </label>
    </div>
  )
}

export default TitleInput
