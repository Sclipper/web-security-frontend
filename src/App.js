import * as React from "react"

import { makeStyles } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import Register from "./Components/Register"
import Login from "./Components/Login"
import Home from "./Components/Home"
import Uppload from "./Components/Uppload"

import { getMe, authLogout } from "./api"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
}))

function App() {
  const classes = useStyles()
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    if (!user) {
      getMe().then((res) => {
        setUser(res)
      })
    }
  }, [setUser, user])

  const handleLogout = () => {
    authLogout().then(() => {
      setUser(null)
    })
  }

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <Link className={classes.title} to="/">
                  Home
                </Link>
              </Typography>
              {!user ? (
                <>
                  <Button
                    style={{ color: "black", marginRight: "1rem" }}
                    variant="contained"
                    color="inherit"
                  >
                    <Link to="/register">Register</Link>
                  </Button>
                  <Button
                    style={{ color: "black" }}
                    variant="contained"
                    color="inherit"
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    style={{ color: "black", marginRight: "1rem" }}
                    variant="contained"
                    color="inherit"
                  >
                    <Link to="/uppload">Uppload</Link>
                  </Button>
                  <Button
                    style={{ color: "black" }}
                    variant="contained"
                    color="inherit"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </header>
        <body>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login user={user} setUser={setUser} />
            </Route>
            <Route path="/uppload">
              <Uppload />
            </Route>
            <Route path="/">
              <Home user={user} setUser={setUser} />
            </Route>
          </Switch>
        </body>
      </Router>
    </div>
  )
}

export default App
