import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header id="navbar">
      <div id="logo_cont">
      <Link id="logo" to="/">
          <h1>tasker.</h1>
      </Link>
      </div>
        <nav id="navbar_links">
          {user && (
            <div>
              <span id="user_email">{user.email}</span>
              <button id="logout_btn" onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div id="link_btns">
              <Link className="link_btn" to="/login">Login</Link>
              <Link className="link_btn" to="/signup">Signup</Link>
            </div>
          )}
        </nav>
    </header>
  )
}

export default Navbar
