import React, { useState, useEffect } from 'react'

const Form = ({ userId, ifEditData, onEditData, ifUpdate }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    setTitle(ifUpdate.title)
    setBody(ifUpdate.body)
  }, [ifUpdate])
  
  function handleEdit(e) {
    e.preventDefault()

    const editedData = {
      id: ifUpdate.id,
      userId: ifUpdate.userId,
      title,
      body
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${ifUpdate.userId}`, {
      method: "PUT",
      body: JSON.stringify(editedData),
      headers: {
        'Content-type': 'application/json'
      },
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      alert('Edit submitted')
    })

    e.target.reset()
    reset()
  }

  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const data = { userId, title, body }
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)
      alert('Form Submitted')
      return response.json()
    })

    e.target.reset()
    reset()
  }
  
  function reset() {
    onEditData(false)
    setTitle('')
    setBody('')
  }

  return (
    <div>
      <form onSubmit={ifEditData ? handleEdit : handleSubmit}>
        {ifEditData ? <h3>Edit Post</h3> : <h3>Create Post</h3>}
        <div>userId {userId}</div>
        <div>
          <input
            type='text'
            name='title'
            placeholder='Input Title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        <div>
          <input
            type='text'
            name='body'
            onChange={(e) => setBody(e.target.value)}
            placeholder='Input Body'
            value={body}
            required
          />
        </div>
        <div>
          <button type='submit'>{ifEditData ? 'Submit edit' : 'Submit'}</button>
          <button type='reset' onClick={reset}>Reset</button>
        </div>
      </form>
    </div>
  )
}

export default Form
