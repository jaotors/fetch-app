import React, { useState } from "react";

const DeleteForm = () => {
  const [deletee, setDeletee] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/posts/${deletee}`, {
      method: "DELETE",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Delete Data</h3>
        <div>
          <input
            type="number"
            name="deletee"
            placeholder="userId"
            onChange={(e) => setDeletee(e.target.value)}
            value={deletee}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default DeleteForm;
