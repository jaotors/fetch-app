import React, { useEffect, useState } from "react";
import Form from "./Form";
import "./App.css";
import UpdateForm from "./UpdateForm";
import DeleteForm from "./DeleteForm";

function App() {
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        setIsLoading(false);
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Random Users</h1>
      <Form userId={1} />
      <UpdateForm userId={1} id={1} />
      <DeleteForm />
      <br />
      <br />
      {hasError ? <p>{errorMessage}</p> : null}
      {!isLoading ? (
        <ul>
          {users.map(({ id, title, body }) => (
            <>
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
              </li>
              <hr />
            </>
          ))}
        </ul>
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  );
}

export default App;
