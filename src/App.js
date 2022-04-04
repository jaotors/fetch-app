import React, { useEffect, useState } from 'react'
import Form from './Form'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [editData, setEditData] = useState(false)  
  const [update, setUpdate] = useState({ id: '', userId: '', title: '', body: '' })

  const fetchUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((result) => {
        setUsers(result)
        setIsLoading(false)
      })
      .catch((error) => {
        setHasError(true)
        setIsLoading(false)
        setErrorMessage(error.message)
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  function handleEdit(passedInfo) {
    setEditData(true)
    setUpdate(passedInfo)
  }

  function handleDelete(passedId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${passedId}`, {
      method: 'Delete'
    }).then(res => {
      console.log(res)
      alert('Delete successful')
      return res.json()
    })
  }

  return (
    <div className='App'>
      <h1>Random Users</h1>
      <Form 
        userId={1} 
        ifEditData={editData}
        onEditData={setEditData}
        ifUpdate={update}
      />
      <br />
      <br />
      {hasError ? <p>{errorMessage}</p> : null}
      {!isLoading ? (
        <ul>
          {users.map(({ id, userId, title, body }) =>(
            <>
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => handleEdit({ id, userId, title, body })}>Edit</button>
                <button onClick={() => handleDelete(id)}>Delete</button>
              </li>
              <hr />
            </>
          ))}
        </ul>
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  )
}

export default App
