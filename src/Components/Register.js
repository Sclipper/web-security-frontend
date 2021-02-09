import * as React from "react"
import { Button, makeStyles, TextField } from "@material-ui/core"
import { useHistory } from "react-router-dom";

import { authRegister } from '../api'

import Cookies from 'universal-cookie';

const cookies = new Cookies()

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

const Register = () => {
  const classes = useStyles()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault()
    authRegister({email, password, name}).then(res => {
      history.push('/')
    }).catch(err => {
      alert('Failed for some reason!')
    })
   }

  return (
    <div>
      <form type="submit" onSubmit={handleSubmit} className={classes.form}>
        <TextField
          value={name}
          className={classes.textField}
          onChange={(e) => setName(e.target.value)}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
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
            width: "50%",
            alignSelf: "center",
          }}
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </form>
    </div>
  )
}

export default Register
