import React, { useState, useEffect } from "react";
import useFollowAuthorSubscription from "./useFollowAuthorSubscription";

const ChangeTitle = ({ author }) => {
  let followAuthor = useFollowAuthorSubscription();
  let [name, setName] = useState(author.name);

  // useEffect(() => {
  //   setName(name);
  // }, [setName, author]);

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => followAuthor(name)}>Follow Author!</button>
    </div>
  );
};

export default ChangeTitle;
