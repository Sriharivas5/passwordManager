import React, { useState } from 'react';
import "./Add.css"
import axios from 'axios';
function App() {
  const [websiteName, setwebsiteName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setpassword] = useState('');





  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = localStorage.getItem("userId")
    let data = await axios.post("https://passwordmanager-d81l.onrender.com/api/postPasswords", {
      userId: userId,
      website: websiteName,
      username: userName,
      password: password
    })
    console.log(data)
    window.location.reload()
  };

  return (
    <div className="Add">

      <form onSubmit={handleSubmit} className='form'>
        <input
          type="text"
          value={websiteName}
          onChange={(e) => setwebsiteName(e.target.value)}
          placeholder="Enter website name"
        />

        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter username"
        />
        <textarea type="text"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter password " ></textarea>



        <input type="submit" id='submit' />
      </form>


    </div>
  );
}

export default App;
