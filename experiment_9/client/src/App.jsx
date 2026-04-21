import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState([])

  const callPublic = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/public')
      setMessage(response.data)
    } catch (error) {
      setMessage('Error: ' + error.message)
    }
  }

  const callUser = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user', { withCredentials: true })
      setMessage(response.data)
    } catch (error) {
      setMessage('Error: ' + error.message)
    }
  }

  const callAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin', { withCredentials: true })
      setMessage(response.data)
    } catch (error) {
      setMessage('Error: ' + error.message)
    }
  }

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users', { withCredentials: true })
      setUsers(response.data)
      setMessage('Users fetched')
    } catch (error) {
      setMessage('Error: ' + error.message)
    }
  }

  const login = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google'
  }

  return (
    <div className="App">
      <h1>Experiment 9: Secure Full Stack</h1>
      <button onClick={login}>Login with Google</button>
      <button onClick={callPublic}>Call Public API</button>
      <button onClick={callUser}>Call User API</button>
      <button onClick={callAdmin}>Call Admin API</button>
      <button onClick={getUsers}>Get Users</button>
      <p>{message}</p>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email} - {user.role}</li>
        ))}
      </ul>
    </div>
  )
}

export default App

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
