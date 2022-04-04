import React, { useState } from "react";

const UpdateForm = ({ id, userId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { id, userId, title, body };

    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Update Resource</h3>
        <div>id{id}</div>
        <div>userId {userId}</div>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Input Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <input
            type="text"
            name="body"
            onChange={(e) => setBody(e.target.value)}
            placeholder="Input Body"
            value={body}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
