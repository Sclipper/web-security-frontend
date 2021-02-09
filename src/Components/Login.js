import * as React from "react"
import { Button, makeStyles, TextField } from "@material-ui/core"
import { authLogin} from '../api'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    margin: "0 auto",
  },
  textField: {
    margin: "0.3rem",
  },
}))

const Login = ({setUser, user}) => {
  const classes = useStyles()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault()
    authLogin({email, password}).then(res => {
      setUser(res)
      history.push('/')
    })
   }

   if(user){
     history.push('/')
   }
 

  return (
    <div>
      <form type="submit" onSubmit={handleSubmit} className={classes.form}>
        <TextField
          value={email}
          className={classes.textField}
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          value={password}
          className={classes.textField}
          onChange={(e) => setPassword(e.target.value)}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type='password'
        />
        <Button
          type="submit"
          style={{
            color: "black",
            width: "50%",
            alignSelf: "center",
            backgroundColor: "orange",
          }}
          variant="contained"
          color="inherit"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login
