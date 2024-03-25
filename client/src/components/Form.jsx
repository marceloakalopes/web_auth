import { useState } from "react"

export function Form() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
        fetch("http://localhost:5500/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            key1: username,
            key2: password
          })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
  }

  return (
    <div>
        <form action="">
          <label htmlFor="username">Username: </label>
          <input name="username" id="username" type="text" onChange={ (e) => {
            e.preventDefault()
            setUsername(e.target.value)
            }} />
          <br />

          <label htmlFor="password">Password: </label>
          <input type="text" name="password" id="password" onChange={(e) => {
            e.preventDefault()
            setPassword(e.target.value)
            }} />
          <br />
          <button onClick={handleSubmit}>Register</button>
        </form>
    </div>
  )
}
