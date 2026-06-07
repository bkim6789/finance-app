import { useState, type ChangeEvent } from 'react'

type TitleInputProps = {
  onChange: (value: string) => void
}

function TitleInput({ onChange }: TitleInputProps) {
  const [title, setTitle] = useState('')

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
