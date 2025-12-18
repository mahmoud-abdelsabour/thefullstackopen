import { useState } from 'react'

const LoginForm = ({ loginRequest }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    loginRequest(username, password)

    setUsername('')
    setPassword('')
  }
  return(
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <div>
        <label>
                username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
                password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

}

export default LoginForm