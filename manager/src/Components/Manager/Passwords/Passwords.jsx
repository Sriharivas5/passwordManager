import React, { useEffect, useState } from 'react'
import Add from "./Add/Add"
import axios from "axios"
import "./Passwords.css"

import { MdContentCopy } from "react-icons/md";
import { Bounce, ToastContainer, Zoom, toast } from 'react-toastify';

const Passwords = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [editId, setEditId] = useState("");
  const [viewPasswordId, setViewPasswordId] = useState("")
  const [PasswordsData, setPasswordSData] = useState([])

  const [isModalActive, setIsModalActive] = useState(false)
  useEffect(() => {
    axios.get("http://localhost:3001/api/getPasswords").then(res => {
      console.log(res.data)
      setPasswordSData(res.data)
    })
  }, [])

  const filteredData = PasswordsData.filter(item => {
    let userId = localStorage.getItem("userId")
    return item.userId == userId
  })

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/deletePassword/${id}`)
    window.location.reload(true);
  }

  const handleUpdate = async (id, title, desc) => {
    setEditId(id);
    setUserName(title);
    setPassword(desc);
  };

  const handleSave = async (requestedId, title, description) => {
    axios
      .put(`http://localhost:3001/api/updatePassword/${requestedId}`, {
        username: title,
        password: description,
      })
      .then(() => setEditId(""));
    window.location.reload()
  };


  const handleToast = (value) => {
    navigator.clipboard.writeText(value)
    toast("Copied to clipboard");
  }

  const handleViewPassword = (id) => {
    if(viewPasswordId==id){
      setViewPasswordId("")
    }else{
      setViewPasswordId(id)
    }
  }
  return (
    <div className='passwordManager'>
      <button id={isModalActive ? "modalActive" : "modalInActive"} onClick={() => setIsModalActive(!isModalActive)}>{isModalActive ? <>&#x2715;</> : "Add Password"}</button>
      {isModalActive && <Add />}
      {
        filteredData ?

          filteredData.map((item) => {
            return editId == item._id ? (
              <div key={item._id} className="passwords">
                <h1 id='passwordTitle'>{item.website}</h1>

                <div className='passwordsInput'>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoFocus
                  />
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='passwordsButtons'>
                  <button
                    onClick={() =>
                      handleSave(item._id, userName, password)
                    }
                  >
                    save
                  </button>
                  {/* below when we calling handleDelete function we are sending job id which need to be deleted */}
                  <button onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div key={item._id} className="passwords">
                <h1 id='passwordTitle'>{item.website}</h1>
                <div className='passwordsInput'>
                  <div className='inputs'>
                    <input type="text" value={item.username} readOnly />
                    <button id="clipboard" onClick={() => {
                      handleToast(item.username)
                    }}><MdContentCopy /></button>
                    <ToastContainer
                      closeOnClick
                      autoClose={2000}
                      draggable={true}
                      transition={Zoom}

                    />
                  </div>
                  <div className='inputs'>
                    <input type={item._id==viewPasswordId?"text":"password"} value={item.password} readOnly />
                    <button id="clipboard" onClick={() => {
                      handleToast(item.password)
                    }}><MdContentCopy /></button>
                    <ToastContainer
                      closeOnClick
                      autoClose={2000}
                      draggable={true}
                      transition={Zoom}

                    />
                  </div>
                </div>
                <div className='passwordsButtons'>
                  <button
                    onClick={() =>
                      handleUpdate(
                        item._id,
                        item.username,
                        item.password
                      )
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                  <button onClick={() => { handleViewPassword(item._id) }}>{item._id==viewPasswordId?"Hide Password":"View Password"}</button>
                </div>
              </div>
            );
          })

          : <h1>loading</h1>
      }


    </div>
  )
}

export default Passwords